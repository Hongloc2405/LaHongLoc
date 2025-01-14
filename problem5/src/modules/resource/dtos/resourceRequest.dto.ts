import {Expose, plainToInstance} from "class-transformer";

export class ResourceRequest {
    @Expose()
    resourceName: string;
    @Expose()
    description: string;
    @Expose()
    type: string;
    @Expose()
    createdBy: string

    static plainToClass<T>(this: new () => T, obj: any): T {
        return plainToInstance(this, obj, {excludeExtraneousValues: true});
    }
}
