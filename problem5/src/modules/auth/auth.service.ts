import {AppDataSource} from "../../config/typeorm";
import {Permission} from "../../entities/permission.entity";
import {Role} from "../../entities/role.entity";
import {User} from "../../entities/user.entity";
import bcrypt from 'bcrypt';
import {UserLoginRequest} from "./dtos/userLoginRequest.dto";
import {UserLoginResponse} from "./dtos/userLoginReponse.dto";
import {MessageResponse} from "../../global/messageResponse";
import * as jwt from 'jsonwebtoken';
import {UserService} from "../user/user.service";


const userService = new UserService()

export class AuthService {
    private permissionRepository = AppDataSource.getRepository(Permission)
    private roleRepository = AppDataSource.getRepository(Role)
    private userRepository = AppDataSource.getRepository(User)
    private saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10)

    async init() {
        const permissionCount = await this.permissionRepository.count();
        if (permissionCount === 0) {
            const permissions: string[] = [
                'CREATE_RESOURCE',
                'GET_RESOURCES',
                'GET_RESOURCE_DETAILS',
                'UPDATE_RESOURCE',
                'DELETE_RESOURCE',
                'DELETE_USER'
            ]

            for (const permission of permissions) {
                await this.permissionRepository.save({
                    permissionName: permission,
                    description: `User has the right to ${permission.substring(0, permission.lastIndexOf('_')).toLocaleLowerCase() + ' ' + permission.substring(permission.lastIndexOf('_') + 1).toLocaleLowerCase()}`,
                });
            }
        }

        const permissionsArr: Permission[] = await this.permissionRepository.find();

        const roleCount = await this.roleRepository.count();
        if (roleCount === 0) {
            const roles: string[] = ['ROLE_ADMIN', 'ROLE_USER'];
            for (const role of roles) {
                await this.roleRepository.save({
                    roleName: role,
                    description: `Role for ${role.substring(role.lastIndexOf('_') + 1).toLocaleLowerCase()}`,
                    permissions: role === 'ROLE_ADMIN' ? permissionsArr : permissionsArr.filter(permission => permission.permissionName !== 'DELETE_USER'),
                });
            }
        }

        const user = await this.userRepository.findOne({where: {username: 'admin'}})
        if (!user) {
            const admin = this.userRepository.create({
                username: 'admin',
                password: await bcrypt.hash('123456', this.saltRounds),
                email: 'admin@gmail.com',
                fullname: 'Quan tri vien'
            });
            await this.userRepository.save(admin)
        }
    }

    async login(request: UserLoginRequest): Promise<UserLoginResponse> {
        try {
            console.log(request)
            const user = await this.userRepository.findOne({
                where: {username: request.username},
                relations: ['roles'],
            });
            if (!user) {
                throw new Error(MessageResponse.WRONG_USERNAME_OR_PASSWORD)
            }

            const isPasswordValid = await bcrypt.compare(
                request.password,
                user.password,
            );
            if (!isPasswordValid) {
                throw new Error(MessageResponse.WRONG_USERNAME_OR_PASSWORD)
            }
            const jwtToken = await this.generateToken(user);

            return UserLoginResponse.plainToClass({...user, token: jwtToken});
        } catch (error) {
            console.error(error);
            throw new Error(MessageResponse.LOGIN_FAILED);
        }

    }

    private secretKey: string = process.env.JWT_SECRET || '';
    private expirationTime =
        Number(process.env.JWT_EXPIRATION_TIME) || 1;

    async generateToken(user: User): Promise<string> {
        const permissions = await userService.getUserPermissions(user.id)
        const scopeRole = user.roles.map((role) => role.roleName).join(' ');
        const scopePermission = permissions.map((permission) => permission.permissionName).join(' ')

        const payload = {
            sub: user.id,
            username: user.username,
            iss: process.env.SYSTEM_NAME,
            scope: scopeRole + ' ' + scopePermission,
            exp: Math.floor(Date.now() / 1000) + this.expirationTime * 60 * 60,
        };
        return jwt.sign(payload, this.secretKey, {algorithm: 'HS256'});
    }
}