import express from 'express'
import {
  addIngredientToBag,
  getAllIngredientsInBag,
} from './ingredient-bag.controller'

const router = express.Router()

router.get('/', getAllIngredientsInBag)
router.post('/create', addIngredientToBag)

export default router
