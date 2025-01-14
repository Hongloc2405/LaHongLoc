// src/custom.d.ts
import { Request } from "express";

interface User {
    id: string;
    rolesOrPermissions: string[];
}

declare global {
    namespace Express {
        interface Request {
            user?: User; // Khai báo thêm thuộc tính `user` vào Request
        }
    }
}
