import express from 'express';
import userRoutes from "./modules/user/user.routes";
import authRoutes from "./modules/auth/auth.routes";
import typeRoutes from "./modules/type/type.routes";
import resourceRoutes from "./modules/resource/resource.routes";

const app = express();


app.use(express.json());
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/types', typeRoutes)
app.use('/api/resources', resourceRoutes)

export default app;
