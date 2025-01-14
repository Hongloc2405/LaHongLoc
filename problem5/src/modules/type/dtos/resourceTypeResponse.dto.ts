import {Expose, plainToInstance} from "class-transformer";

export class ResourceTypeResponse {
    @Expose()
    typeName: string;
    @Expose()
    description: string;

    static plainToClass<T>(this: new () => T, obj: any): T {
        return plainToInstance(this, obj, {excludeExtraneousValues: true});
    }
}