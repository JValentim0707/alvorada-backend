import express, { Express, Request, Response } from "express";
// import cors from 'cors'

// Import app from routes
import app from "./routes/index"

const PORT: number = 8080
const version: string = "1.0.0"

app.get("/api/version", (req: Request, res: Response) => {
  res.send(`Backend Running on Version ${version}`);
});

app.listen(PORT, () => {console.log(`Server Running on: http://localhost:${PORT}`);});

export default app
