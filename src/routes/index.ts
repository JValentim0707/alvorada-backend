import express, { Express, Request, Response } from "express";
import cors from 'cors'

// Import Routes
import breeds from '../routes/breeds'
import favorites from '../routes/favorites'

const FRONTEND_URL = process.env.FRONTEND_URL; 

// Node Server with Express
const app: Express = express();

app.use(express.json())

app.use(cors( {
  origin:'*'
}))

app.use("/api/breeds", breeds)
app.use("/api/favorites", favorites)

export default app
