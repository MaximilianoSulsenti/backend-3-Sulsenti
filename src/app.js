import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUIExpress from 'swagger-ui-express'
import dotenv from 'dotenv'

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';




dotenv.config()
const app = express();
const PORT = process.env.PORT || 8080;

// Detectar si estamos en entorno de test
const isTest = process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID !== undefined;

// Solo iniciar el servidor si no estamos en test
if (!isTest) {
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}

// Documentacion
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'AdopMe API',
            description: 'API para la gestion de adopciones de mascotas',
            version: '1.0.0'
        }
    },
    apis: ['./src/docs/**/*.yaml']
}
const specs = swaggerJSDoc(swaggerOptions);
app.use('/api/docs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs))


app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);


const mongoInstance = async () => {
    try {
        mongoose.set('strictQuery', false);
        // Usar la URI de test si estamos en entorno de test
        const mongoUri = isTest ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI;
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Database connection success!`);
    } catch (error) {
        console.error(error);
        process.exit();
    }
};
mongoInstance();

export default app;


