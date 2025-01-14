import {AppDataSource} from "../../config/typeorm";
import {Resource} from "../../entities/resource.entity";
import {ResourceRequest} from "./dtos/resourceRequest.dto";
import {ResourceResponse} from "./dtos/resourceResponse.dto";
import {ResourceType} from "../../entities/resourceType.entity";
import {User} from "../../entities/user.entity";
import {MessageResponse} from "../../global/messageResponse";
import {ResourceFilter} from "./dtos/resourceFilter.dto";
import {ResourceUpdateRequest} from "./dtos/resourceUpdateRequest.dto";

export class ResourceService {
    private resourceRepository = AppDataSource.getRepository(Resource)
    private typeRepository = AppDataSource.getRepository(ResourceType)
    private userRepository = AppDataSource.getRepository(User)

    async createResource(request: ResourceRequest): Promise<ResourceResponse> {
        const type = await this.typeRepository.findOne({where: {typeName: request.type}})
        if (!type) {
            throw new Error(MessageResponse.RESOURCE_TYPE_NOT_FOUND)
        }
        const createdBy = await this.userRepository.findOne({where: {id: request.createdBy}})
        if (!createdBy) {
            throw new Error(MessageResponse.USER_NOT_FOUND)
        }

        const resource = this.resourceRepository.create({...request, type, createdBy})
        const savedResource = await this.resourceRepository.save(resource)
        return ResourceResponse.plainToClass(savedResource)
    }

    async filterResources(filterConditions: ResourceFilter): Promise<ResourceResponse[]> {
        let {
            resourceName,
            type,
            from,
            to,
            createdBy,
            pageNumber = 1,
        } = filterConditions;
        if(!pageNumber) pageNumber = 1

        const queryBuilder = this.resourceRepository.createQueryBuilder("resource")
            .leftJoinAndSelect("resource.type", "type")
            .leftJoinAndSelect("resource.createdBy", "user");


        if (resourceName) {
            queryBuilder.andWhere("LOWER(resource.resourceName) LIKE :resourceName", {
                resourceName: `%${resourceName.toLowerCase()}%`,
            });
        }

        if (type) {
            queryBuilder.andWhere("type.typeName = :type", {type});
        }

        if (from) {
            queryBuilder.andWhere("resource.createdAt >= :from", {from});
        }

        if (to) {
            queryBuilder.andWhere("resource.createdAt <= :to", {to});
        }

        if (createdBy) {
            queryBuilder.andWhere("user.id = :createdBy", { createdBy });
        }

        const pageSize = Number(process.env.RESOURCE_PAGE_SIZE) || 5
        const skip = (pageNumber - 1) * pageSize;
        queryBuilder.skip(skip).take(pageSize);
        const resources = await queryBuilder.getMany();

        return resources.map(resource => ResourceResponse.plainToClass(resource))
    }

    async getResourceDetails(resourceId: string, ownerId: string): Promise<ResourceResponse> {
        const resource = await this.resourceRepository.findOne({where: {id: resourceId}, relations: ['createdBy', 'type']})
        if(!resource) {
            throw new Error(MessageResponse.RESOURCE_NOT_FOUND)
        }
        if (resource.createdBy.id !== ownerId) {
            throw new Error(MessageResponse.FORBIDDEN);
        }

        return ResourceResponse.plainToClass(resource)
    }

    async updateResourceDetails(resourceId: string, ownerId: string, request: ResourceUpdateRequest): Promise<ResourceResponse> {
        const resource = await this.resourceRepository.findOne({ where: { id: resourceId } });

        if (!resource) {
            throw new Error(MessageResponse.RESOURCE_NOT_FOUND);
        }
        if (resource.createdBy.id !== ownerId) {
            throw new Error(MessageResponse.FORBIDDEN);
        }

        const updateData: Partial<Resource> = {
            resourceName: request?.resourceName || resource.resourceName,
            description: request?.description || resource.description,
        };


        if (request.type) {
            updateData.type = { typeName: request.type } as any;
        }

        this.resourceRepository.merge(resource, updateData);
        const updatedResource = await this.resourceRepository.save(resource);
        return ResourceResponse.plainToClass(updatedResource);
    }

    async deleteResource(resourceId: string, ownerId: string): Promise<void> {
        const resource = await this.resourceRepository.findOne({where: {id: resourceId}, relations: ['createdBy', 'type']})
        if(!resource) {
            throw new Error(MessageResponse.RESOURCE_NOT_FOUND)
        }
        if (resource.createdBy.id !== ownerId) {
            throw new Error(MessageResponse.FORBIDDEN);
        }
        await this.resourceRepository.remove(resource)
    }
}