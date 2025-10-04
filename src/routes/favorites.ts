import express, { Router, Request, Response } from "express";

// Import Models
import { addFavoriteBreed, getAllFavoriteBreeds } from "../model/favorites";

const router: Router = express.Router()

interface IFavoriteBody {
  breed: string,
}

router.post('/', async(req: Request<{}, {}, IFavoriteBody>, res: Response<string>) => {
  try {
    const body = req.body

    await addFavoriteBreed(body.breed)

    res.status(200).send('Success')
  } catch (error: any) {
    console.log(error)
    res.status(500).json(error);
  }
})

router.get('/', async(req: Request, res: Response<string[]> ) => {
  try {

    const allFavoriteBreeds: string[] = await getAllFavoriteBreeds()

    res.json(allFavoriteBreeds)
  } catch (error: any) {
    console.log(error)
    res.status(500).json(error);
  }
})

export default router