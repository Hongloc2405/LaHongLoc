import app from './app';
import { AppDataSource } from './config/typeorm';
import { AuthService } from './modules/auth/auth.service';
import {TypeService} from "./modules/type/type.service";

const PORT = 3000;

const startServer = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Database connected');

        const authService = new AuthService();
        await authService.init();

        const typeService = new TypeService()
        await typeService.init()

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error starting application:', error);
    }
};

startServer().catch((error) => {
    console.error('Unhandled error:', error);
});
