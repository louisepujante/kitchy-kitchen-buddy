import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { selectIngredient } from '../../lib/queries/ingredients'

const prisma = new PrismaClient()

const getIngredientsOfRecipe = async (request: Request, response: Response) => {
  try {
    const { recipeId } = request.params
    const ingredients = await prisma.ingredients.findMany({
      where: { recipeId: recipeId },
      select: selectIngredient,
    })
    response.status(200).json({ data: ingredients })
  } catch (error) {
    response.status(500).json({ error: error })
  }
}

export default {
  getIngredients: getIngredientsOfRecipe,
}
