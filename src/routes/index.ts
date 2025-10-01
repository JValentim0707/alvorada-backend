import express, { Express, Request, Response } from "express";

// Import Routes
import breeds from '../routes/breeds'

// Node Server with Express
const app: Express = express();

app.use("/api/breeds", breeds)

export default app
