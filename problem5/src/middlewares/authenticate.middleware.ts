import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticate = (req: Request, res: Response, next: NextFunction): any => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            sub: string;
            scope: string[];
        };

        req.user = {
            id: decoded.sub,
            rolesOrPermissions: decoded.scope,
        };

        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" }); // Trả về lỗi 401 nếu token không hợp lệ
    }
};
export default authenticate

