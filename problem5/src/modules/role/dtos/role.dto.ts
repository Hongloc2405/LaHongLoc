import { Expose, plainToInstance } from 'class-transformer';

export class RoleDTO {
    @Expose()
    roleName: string;
    @Expose()
    description: string;

    static plainToClass<T>(this: new () => T, obj: any): T {
        return plainToInstance(this, obj, { excludeExtraneousValues: true });
    }
}
