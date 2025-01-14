import {NextFunction, Request, Response} from "express";
import {User} from "../custom";
import jwt from "jsonwebtoken";
import {MessageResponse} from "../global/messageResponse";

const authorize = (requiredPermission: string) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                res.status(403).json({message: MessageResponse.UNAUTHORIZED});
                return;
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
                sub: string;
                scope: string[];
            };

            req.user = {
                id: decoded.sub,
                rolesOrPermissions: decoded.scope,
            };

            if(!decoded.scope.includes(requiredPermission)) {
                res.status(403).json({message: MessageResponse.FORBIDDEN});
                return;
            }
            next();
        } catch (error) {
            res.status(401).json({message: "Unauthorized"});
            return;
        }
    };
};

export default authorize