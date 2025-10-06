import express, { Router, Request, Response } from "express";

import NodeCache from "node-cache";

// Import Models
import { addFavoriteBreed, getAllFavoriteBreeds, removeFavoriteBreed } from "../model/favorites";

const router: Router = express.Router()
const cache = new NodeCache({ stdTTL: 3600 });

interface IFavoriteBody {
  breed: string,
}

interface IFavoriteParamsRemove {
  breed: string
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
    
    const cacheFavoriteBreeds = cache.get<string[]>("favoriteBreeds");
    if (cacheFavoriteBreeds) {
      return res.status(200).json(cacheFavoriteBreeds);
    }

    const allFavoriteBreeds: string[] = await getAllFavoriteBreeds()
    cache.set("favoriteBreeds", cacheFavoriteBreeds);

    res.json(allFavoriteBreeds)
  } catch (error: any) {
    console.log(error)
    res.status(500).json(error);
  }
})

router.delete('/:breed', async(req: Request<IFavoriteParamsRemove>, res: Response<string> ) => {
  try {
    const breedName: string = req.params.breed

    await removeFavoriteBreed(breedName)
    
    res.status(200).send('Success')
  } catch (error: any) {
    console.log(error)
    res.status(500).json(error);
  }
})

export default router