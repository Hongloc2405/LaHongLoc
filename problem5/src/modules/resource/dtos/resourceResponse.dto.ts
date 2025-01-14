import {User} from "../../../entities/user.entity";
import {ResourceType} from "../../../entities/resourceType.entity";
import {Expose, plainToInstance, Type} from "class-transformer";
import {UserResponseDto} from "../../user/dtos/userReponse.dto";
import {ResourceTypeResponse} from "../../type/dtos/resourceTypeResponse.dto";

export class ResourceResponse {
    @Expose()
    id: string;
    @Expose()
    resourceName: string;
    @Expose()
    description: string;
    @Expose()
    @Type(() => UserResponseDto)
    createdBy: User;
    @Expose()
    @Type(() => ResourceTypeResponse)
    type: ResourceType;
    @Expose()
    createdAt: Date;
    @Expose()
    updatedAt: Date;

    static plainToClass<T>(this: new () => T, obj: any): T {
        return plainToInstance(this, obj, {excludeExtraneousValues: true});
    }
}