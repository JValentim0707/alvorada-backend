import express, { Router, Request, Response } from "express";
import api from "../config/api"

const router: Router = express.Router()

interface IBreeds {
  message: Record<string, string[]>
  status: string
}

interface IBreeedParams {
  breed: string
}

interface IBreedImages {
  message: string[],
  status: string
}

router.get('/', async(req: Request, res: Response<string[]> ) => {
  try {

    const { data } = await api.get<IBreeds>("/breeds/list/all")
    const allBreeds: string[] = Object.keys(data.message)

    res.json(allBreeds)
  } catch (error: any) {
    console.log(error)
    res.status(500).json(error);
  }
})

router.get('/:breed/images', async(req: Request<IBreeedParams>, res: Response<string[]>) => {
  try {
    const breedName: string = req.params.breed
    
    const { data } = await api.get<IBreedImages>(`/breed/${breedName}/images/random/3`)
    const allBreedImages: string[] = data.message

    res.json(allBreedImages)
  } catch (error: any) {
    console.log(error)
    res.status(500).json(error);
  }
})

export default router