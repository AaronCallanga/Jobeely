import express from 'express'
import userRoutes from './routes/user.routes.js'
import jobRoutes from './routes/jobs.routes.js'
import chatRoutes from './routes/chatsession.routes.js'
import resumeRoutes from './routes/resume.routes.js'
import authRoutes from './routes/auth.routes.js'
import {errorMiddleware} from "./middlewares/error.middleware.js";
import authorize from "./middlewares/auth.middleware.js";

const app = express();

// Built-in Middlewares
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', authorize, userRoutes)
app.use('/api/v1/jobs', authorize, jobRoutes)
app.use('/api/v1/resumes', authorize, resumeRoutes)
app.use('/api/v1/chats', authorize, chatRoutes)


//Error Middleware
app.use(errorMiddleware)
export default app;
