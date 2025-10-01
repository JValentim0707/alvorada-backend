import express, { Express, Request, Response } from "express";

// Import app from routes
import app from "./routes/index"

const PORT: number = 3000
const version: string = "1.0.0"

app.use(express.json())

app.get("/api/version", (req: Request, res: Response) => {
  res.send(`Backend Running on Version ${version}`);
});

app.listen(PORT, () => {console.log(`Server Running on: http://localhost:${PORT}`);});

export default app
