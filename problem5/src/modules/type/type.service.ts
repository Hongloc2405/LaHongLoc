import {AppDataSource} from "../../config/typeorm";
import {ResourceType} from "../../entities/resourceType.entity";
import {ResourceTypeResponse} from "./dtos/resourceTypeResponse.dto";

export class TypeService {
    private typeRepository = AppDataSource.getRepository(ResourceType)

    async init(): Promise<void> {
        const typeCount = await this.typeRepository.count();
        if(typeCount === 0) {
            const types = [{
                typeName: 'Media',
                description: 'This is the media resource'
            }, {
                typeName: 'Document',
                description: 'This is the document resource'
            }]

            for (const type of types) {
                await this.typeRepository.save(type)
            }
        }
    }

    async getAllTypes(): Promise<ResourceTypeResponse[]> {
        const types = await this.typeRepository.find();
        return types.map((type) => ResourceTypeResponse.plainToClass(type));

    }
}