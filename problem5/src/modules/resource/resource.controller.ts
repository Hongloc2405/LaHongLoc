import {Request, Response} from 'express';
import {MessageResponse} from "../../global/messageResponse";
import {ResourceService} from "./resource.service";
import {ResourceRequest} from "./dtos/resourceRequest.dto";
import {ResourceResponse} from "./dtos/resourceResponse.dto";
import {ApiResponse} from "../../global/apiResponse.dto";
import {ResourceFilter} from "./dtos/resourceFilter.dto";
import {ResourceUpdateRequest} from "./dtos/resourceUpdateRequest.dto";

const resourceService = new ResourceService()

export class ResourceController {
    // [POST] create a resource
    async createResource(req: Request, res: Response): Promise<void> {
        try {
            const user = req.user
            const request: ResourceRequest = ResourceRequest.plainToClass({...req.body, createdBy: user?.id})
            const resource: ResourceResponse = await resourceService.createResource(request)

            res.status(201).json(new ApiResponse(resource, 201, MessageResponse.CREATE_RESOURCE_SUCCESS))
        } catch (error) {
            res.status(400).json({
                success: false,
                message: MessageResponse.CREATE_RESOURCE_FAILED,
                error: error instanceof Error ? error.message : error,
            });
        }
    }

    // [POST] filter the resources
    async filterResources(req: Request, res: Response): Promise<void> {
        try {
            const request: ResourceFilter = ResourceFilter.plainToClass({...req.body, createdBy: req.user?.id})
            const resources: ResourceResponse[] = await resourceService.filterResources(request)
            res.status(200).json(new ApiResponse<ResourceResponse[]>(resources, 200, MessageResponse.FILTER_RESOURCE_SUCCESS))
        } catch (error) {
            res.status(400).json({
                success: false,
                message: MessageResponse.FILTER_RESOURCE_FAILED,
                error: error instanceof Error ? error.message : error,
            });
        }
    }

    // [GET] get a resource details
    async getResourceDetails(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user?.id; // Use optional chaining to safely access user id
            if (!userId) {
                throw new Error(MessageResponse.UNAUTHORIZED);
            }
            const resourceDetails: ResourceResponse = await resourceService.getResourceDetails(req.params.id, userId)
            res.status(200).json(new ApiResponse<ResourceResponse>(resourceDetails, 200, MessageResponse.GET_RESOURCE_DETAILS_SUCCESS))
        } catch (err) {
            res.status(400).json({
                success: false,
                message: MessageResponse.GET_RESOURCE_DETAILS_FAILED
            })
        }
    }

    // [PUT] update resource details
    async updateResourceDetails(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user?.id; // Use optional chaining to safely access user id
            if (!userId) {
                throw new Error(MessageResponse.UNAUTHORIZED);
            }
            const request: ResourceUpdateRequest = ResourceUpdateRequest.plainToClass(req.body)
            const updatedResource: ResourceResponse = await resourceService.updateResourceDetails(req.params.id, userId, request)
            res.status(200).json(new ApiResponse<ResourceResponse>(updatedResource, 200, MessageResponse.UPDATE_RESOURCE_SUCCESS))
        } catch (err) {
            res.status(400).json({
                success: false,
                message: MessageResponse.UPDATE_RESOURCE_FAILED
            })
        }
    }

    async deleteResource(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user?.id; // Use optional chaining to safely access user id
            if (!userId) {
                throw new Error(MessageResponse.UNAUTHORIZED);
            }
            await resourceService.deleteResource(req.params.id, userId)
            res.status(200).json(new ApiResponse({}, 200, MessageResponse.DELETE_RESOURCE_SUCCESS))
        } catch (err) {
            res.status(400).json({
                success: false,
                message: MessageResponse.DELETE_RESOURCE_FAILED
            })
        }
    }

}