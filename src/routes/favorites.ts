import express, { Router, Request, Response } from "express";
import api from "../config/api"

const router: Router = express.Router()

interface IFavoriteBody {
  breed: string,
}

router.post('/favorites', async(req: Request<{}, string[], IFavoriteBody>, res: Response<string[]>) => {
  try {

  } catch (error: any) {
    console.log(error)
    res.status(500).json(error);
  }
})

export default router