import fs from "fs"
import path from "path"

interface IFavorites {
  favorites: string[]
}

const favoriteDataJsonPath: string = "C:/Users/jvale/Projects/alvorada-technical/alvorada-backend/src/data/favorites.json"

const addFavoriteBreed = async (breedName: string):Promise<undefined> => {
  try {
    const fileData = fs.readFileSync(favoriteDataJsonPath, 'utf8');
    const { favorites } = JSON.parse(fileData) as IFavorites;

    favorites.push(breedName)

    fs.writeFileSync(favoriteDataJsonPath, JSON.stringify({ favorites }))
  } catch (error) {
    console.log(error)
    throw new Error("Internal Error") 
  }
}

const getAllFavoriteBreeds = async ():Promise<string[]> => {
  try {    
    const fileData = fs.readFileSync(favoriteDataJsonPath, 'utf8');
    const { favorites } = JSON.parse(fileData) as IFavorites;

    return favorites
  } catch (error) {
    console.log(error)
    throw new Error("Internal Error") 
  }
}

const removeFavoriteBreed = async (breedName: string):Promise<undefined> => {
  try {
    const fileData = fs.readFileSync(favoriteDataJsonPath, 'utf8');
    const { favorites } = JSON.parse(fileData) as IFavorites;
  
    const updatedFavorites: string[] = favorites.filter((x: string) => x !== breedName)
  
    fs.writeFileSync(favoriteDataJsonPath, JSON.stringify({ favorites: updatedFavorites }))
    return
  } catch (error) {
    console.log(error)
    throw new Error("Internal Error") 
  }
}

export {
  addFavoriteBreed,
  getAllFavoriteBreeds,
  removeFavoriteBreed
}