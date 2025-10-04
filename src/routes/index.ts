import express, { Express, Request, Response } from "express";
import cors from 'cors'

// Import Routes
import breeds from '../routes/breeds'
import favorites from '../routes/favorites'

// Node Server with Express
const app: Express = express();

app.use(express.json())

app.use(cors( {
  origin: ' http://localhost:3000'
}))

app.use("/api/breeds", breeds)
app.use("/api/favorites", favorites)

export default app
