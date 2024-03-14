import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const getAllIngredientsInBag = async (
  request: Request,
  response: Response
) => {
  try {
    const ingredientsInBag = await prisma.ingredientBag.findMany()
    response.status(200).json({ data: ingredientsInBag })
  } catch (error) {
    response.status(500).json({ error: error })
  }
}

export const addIngredientToBag = async (
  request: Request,
  response: Response
) => {
  try {
    const { data } = request.body

    await prisma.ingredientBag.createMany({
      data,
    })

    response
      .status(201)
      .json({ message: 'Successfully added ingredients to bag' })
  } catch (error) {
    response.status(500).json({ error: error })
  }
}
