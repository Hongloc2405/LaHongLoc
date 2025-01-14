import { Request, Response } from 'express';
import { UserService } from './user.service';
import {ApiResponse} from "../../global/apiResponse.dto";
import {UserResponseDto} from "./dtos/userReponse.dto";
import {MessageResponse} from "../../global/messageResponse";
import {UserRequestDto} from "./dtos/userRequest.dto";

const userService = new UserService();

export class UserController {
    // [POST] Create user
    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const userRequest:UserRequestDto = UserRequestDto.plainToClass(req.body)
            const userResponse:UserResponseDto = await userService.createUser(userRequest);
            res.status(201).json(new ApiResponse<UserResponseDto>(userResponse, 201, MessageResponse.CREATE_USER_SUCCESS));
        } catch (error) {
            res.status(400).json({
                success: false,
                message: MessageResponse.CREATE_USER_FAILED,
                error: error instanceof Error ? error.message : error,
            });
        }
    }

    // [GET] get user's permission(s)
    async getUserPermissions(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json({success: true, data: {name: 'role1'}})
            // const permissions:Permission[] = await userService.getUserPermissions();

        } catch(error) {
            res.status(400).json({
                success: false,
                message: MessageResponse.REQUEST_FAILED,
                error: error instanceof Error ? error.message : error,
            });
        }
    }
}
