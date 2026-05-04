import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        service: 'helphub-backend',
    });
});



export default app;