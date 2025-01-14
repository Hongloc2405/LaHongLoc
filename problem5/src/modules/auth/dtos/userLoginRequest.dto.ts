import {Expose, plainToInstance} from 'class-transformer';

export class UserLoginRequest {
    @Expose()
    username: string;
    @Expose()
    password: string;

    static plainToClass<T>(this: new () => T, obj: any): T {
        return plainToInstance(this, obj, {excludeExtraneousValues: true});
    }
}
