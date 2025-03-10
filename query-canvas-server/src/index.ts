import 'reflect-metadata'
import http from 'http'
import express from 'express'
import cookieSession from 'cookie-session'
import cors from 'cors';
import { envConfig } from './configurations/env.config';
import { queryCanvasDataSource } from './database/config';

async function bootstrap() {
    const app: express.Express = express()
    const server: http.Server = new http.Server(app)
    app.set('trust proxy', 1) // Cookie server
    app.use(cookieSession({ 
        name: 'cookie-session', 
        keys: [envConfig.SECRET_KEY_ONE, envConfig.SECRET_KEY_TWO], 
        maxAge: 24 * 7 * 3600000 
    }))
    const corsOptions = { 
        origin: [envConfig.ANGULAR_URL], 
        credentials: true, 
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] 
    }
    app.use(cors(corsOptions))
    try {
        server.listen(envConfig.PORT, () => console.log(`http://localhost:${envConfig.PORT}`))        
    } catch (error) {
        console.log(error)
    }
}

queryCanvasDataSource.initialize().then(() => {
    console.log('Connected to PostgreSQL');
    bootstrap().catch(console.error)
}).catch(e => console.log('Failed to connect to PostgreSQL', e))
