import express, { Express, Request, Response } from "express";
import cors from 'cors'

// Import Routes
import breeds from '../routes/breeds'

// Node Server with Express
const app: Express = express();

app.use(cors( {
  origin: ' http://localhost:3000'
}))

app.use("/api/breeds", breeds)

export default app
