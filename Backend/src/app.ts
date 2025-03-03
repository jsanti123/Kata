import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/dbconnection';
import routesEvent from './routers/eventRoute';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', routesEvent);

export default app;
