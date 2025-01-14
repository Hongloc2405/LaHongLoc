import {Expose, plainToInstance} from "class-transformer";

export class ResourceFilter {
    @Expose()
    resourceName: string;
    @Expose()
    type: string;
    @Expose()
    from: Date
    @Expose()
    to: Date
    @Expose()
    createdBy: string
    @Expose()
    pageNumber: number

    static plainToClass<T>(this: new () => T, obj: any): T {
        return plainToInstance(this, obj, {excludeExtraneousValues: true});
    }
}