import express from 'express'
import {
  getAllRecipes,
  addRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} from './recipes.controller'

const router = express.Router()

router.get('/', getAllRecipes)
router.post('/create', addRecipe)
router.get('/:id', getRecipe)
router.put('/:id', updateRecipe)
router.delete('/:id', deleteRecipe)

export default router
