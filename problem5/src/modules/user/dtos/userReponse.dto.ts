import {Expose, plainToInstance, Type} from "class-transformer";
import {IsEmail, IsString} from "class-validator";
import {RoleDTO} from "../../role/dtos/role.dto";

export class UserResponseDto {
    @Expose()
    id: string
    @Expose()
    username: string;
    @IsEmail()
    @Expose()
    email: string;
    @IsString()
    @Expose()
    fullname: string;
    @Expose()
    @Type(() => RoleDTO)
    roles: RoleDTO[];

    static plainToClass<T>(this: new () => T, obj: any): T {
        return plainToInstance(this, obj, {excludeExtraneousValues: true});
    }
}