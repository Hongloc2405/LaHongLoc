import { Expose, plainToInstance } from 'class-transformer';

export class UserLoginResponse {
    @Expose()
    username: string;
    @Expose()
    email: string;
    @Expose()
    fullname: string;
    @Expose()
    createdAt: Date;
    @Expose()
    token: string;

    static plainToClass<T>(this: new () => T, obj: any): T {
        return plainToInstance(this, obj, { excludeExtraneousValues: true });
    }
}
