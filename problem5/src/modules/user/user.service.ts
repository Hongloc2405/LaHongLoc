import {AppDataSource} from "../../config/typeorm";
import {User} from "../../entities/user.entity";
import {UserResponseDto} from "./dtos/userReponse.dto";
import {UserRequestDto} from "./dtos/userRequest.dto";
import bcrypt from "bcrypt";
import {Role} from "../../entities/role.entity";
import {MessageResponse} from "../../global/messageResponse";
import {Permission} from "../../entities/permission.entity";

export class UserService {
    private userRepository = AppDataSource.getRepository(User);
    private roleRepository = AppDataSource.getRepository(Role)
    private saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10)

    async createUser(request: UserRequestDto): Promise<UserResponseDto> {
        try {
            const hashPassword = await bcrypt.hash(request.password, this.saltRounds)
            const userRole: Role | null = await this.roleRepository.findOne({where: {roleName: 'ROLE_USER'}})
            if (!userRole) {
                throw new Error(MessageResponse.INTERNAL_SERVER_ERROR);
            }

            const newUser = this.userRepository.create({...request, password: hashPassword, roles: [userRole]});

            const savedUser = await this.userRepository.save(newUser);
            return UserResponseDto.plainToClass(savedUser)
        } catch (error) {
            console.error(error);
            throw new Error(MessageResponse.CREATE_USER_FAILED);
        }
    }

    async getUserPermissions(userId: string): Promise<Permission[]> {
        const user = await this.userRepository.findOne({where: {id: userId}, relations: ['roles', 'roles.permissions']})
        if (!user) {
            throw new Error(MessageResponse.USER_NOT_FOUND)
        }

        const permissions = new Set<Permission>()
        user.roles.forEach(role => {
            role.permissions.forEach(permission => {
                permissions.add(permission)
            })
        })

        return Array.from(permissions)
    }

}
