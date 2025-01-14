import { Request, Response } from 'express';
import { MessageResponse } from "../../global/messageResponse";
import { UserLoginRequest } from "./dtos/userLoginRequest.dto";
import { UserLoginResponse } from "./dtos/userLoginReponse.dto";
import { AuthService } from "./auth.service";
import { ApiResponse } from "../../global/apiResponse.dto";

const authService = new AuthService();

export class AuthController {
    // [POST] user login
    async login(req: Request, res: Response): Promise<void> {
        try {
            const userLoginRequest: UserLoginRequest = UserLoginRequest.plainToClass(req.body);
            const userLoginResponse: UserLoginResponse = await authService.login(userLoginRequest);
            res.status(200).json(new ApiResponse<UserLoginResponse>(userLoginResponse, 200, MessageResponse.LOGIN_SUCCESS));
        } catch (error) {
            res.status(400).json({
                success: false,
                message: MessageResponse.LOGIN_FAILED,
                error: error instanceof Error ? error.message : error,
            });
        }
    }
}


