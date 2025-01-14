import {IsEmail, IsString, Length} from "class-validator";
import {Expose, plainToInstance} from "class-transformer";
import {Column} from "typeorm";

export class UserRequestDto {
    @IsString()
    @Length(3, 50)
    @Expose()
    username: string;

    @IsString()
    @Length(6, 20)
    @Expose()
    password: string;

    @IsEmail()
    @Expose()
    email: string;
    @IsString()
    @Expose()
    fullname: string;

    static plainToClass<T>(this: new () => T, obj: any): T {
        return plainToInstance(this, obj, { excludeExtraneousValues: true });
    }
}