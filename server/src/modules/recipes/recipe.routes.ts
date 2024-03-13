import express from 'express'
import {
  getAllRecipes,
  addRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} from './recipes.controller'
import IngredientController from '../ingredients/ingredients.controller'

const router = express.Router()

router.get('/', getAllRecipes)
router.post('/create', addRecipe)
router.get('/:id', getRecipe)
router.put('/:id', updateRecipe)
router.delete('/:id', deleteRecipe)

router.get('/:recipeId/ingredients', IngredientController.getIngredients)

export default router
