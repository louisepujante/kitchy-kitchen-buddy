import express, { Request, Response } from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import multer from 'multer'

import recipeRoutes from './modules/recipes/recipe.routes'
import ingredientBagRoutes from './modules/ingredient-bag/ingredient-bag.routes'
import { addRecipe } from './modules/recipes/recipes.controller'

export const prisma = new PrismaClient()

const app = express()
const port = 8080

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  },
})
export const upload = multer({ storage })

async function main() {
  app.use(cors())
  app.use(express.json())

  app.use('/api/recipes', recipeRoutes)
  app.use('/api/ingredientBag', ingredientBagRoutes)
  // app.post('/api/recipes/create', upload.single('image'), addRecipe)  

  // Catch unregistered routes
  app.all('*', (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` })
  })

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })
}

main()
  .then(async () => {
    await prisma.$connect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
