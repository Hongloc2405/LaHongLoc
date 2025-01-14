import { Request, Response } from 'express';
import {ApiResponse} from "../../global/apiResponse.dto";
import {MessageResponse} from "../../global/messageResponse";
import {TypeService} from "./type.service";
import {ResourceTypeResponse} from "./dtos/resourceTypeResponse.dto";

const typeService = new TypeService()

export class TypeController {
    // [GET] get the resource types
    async getAllTypes(req: Request, res: Response): Promise<void> {
        try {
            const types:ResourceTypeResponse[] = await typeService.getAllTypes()
            res.status(200).json(new ApiResponse<ResourceTypeResponse[]>(types, 200, MessageResponse.GET_TYPE_SUCCESS))
        } catch(error) {
            res.status(400).json({
                success: false,
                message: MessageResponse.GET_TYPES_ERROR,
                error: error instanceof Error ? error.message : error,
            });
        }
    }
}