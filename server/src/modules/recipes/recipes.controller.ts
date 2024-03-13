import { Ingredients, PrismaClient, Steps } from '@prisma/client'
import { Request, Response } from 'express'
import { selectRecipe } from '../../lib/queries/recipes'

const prisma = new PrismaClient()

const getAllRecipes = async (request: Request, response: Response) => {
  try {
    const recipes = await prisma.recipe.findMany({
      select: selectRecipe,
    })
    response.status(200).json({ data: recipes })
  } catch (error) {
    response.status(500).json({ error: error })
  }
}

const getRecipe = async (request: Request, response: Response) => {
  try {
    const { id } = request.params
    const recipe = await prisma.recipe.findFirstOrThrow({
      where: { id: id },
      select: selectRecipe,
    })
    response.status(200).json({ data: recipe })
  } catch (error) {
    response.status(500).json({ error: error })
  }
}

const addRecipe = async (request: Request, response: Response) => {
  try {
    const {
      title,
      description,
      image,
      duration,
      difficulty,
      ingredients,
      steps,
    } = request.body

    const newRecipe = await prisma.recipe.create({
      data: {
        title,
        description,
        image,
        duration,
        difficulty,
      },
    })

    await prisma.ingredients.createMany({
      data: ingredients.map((ingredient: Ingredients) => ({
        ...ingredient,
        recipeId: newRecipe.id,
      })),
    })

    await prisma.steps.createMany({
      data: steps.map((step: Steps) => ({
        ...step,
        recipeId: newRecipe.id,
      })),
    })

    response.status(201).json({ message: 'Successfully added a new recipe' })
  } catch (error) {
    response.status(500).json({ error: error })
  }
}

const deleteRecipe = async (request: Request, response: Response) => {
  try {
    const { id } = request.params
    await prisma.recipe.findFirstOrThrow({
      where: { id },
    })

    await prisma.recipe.delete({
      where: { id },
    })

    response.status(200).json({ message: 'Successfully deleted recipe' })
  } catch (error) {
    response.status(500).json({ error: error })
  }
}

const updateRecipe = async (request: Request, response: Response) => {
  try {
    const { id } = request.params
    const {
      title,
      description,
      image,
      duration,
      difficulty,
      ingredients,
      steps,
    } = request.body
    await prisma.recipe.findFirstOrThrow({
      where: { id },
    })

    await prisma.ingredients.deleteMany({
      where: { recipeId: id },
    })

    await prisma.steps.deleteMany({
      where: { recipeId: id },
    })

    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: {
        title,
        description,
        image,
        duration,
        difficulty,
      },
    })

    await prisma.ingredients.createMany({
      data: ingredients.map((ingredient: Ingredients) => ({
        ...ingredient,
        recipeId: id,
      })),
    })

    await prisma.steps.createMany({
      data: steps?.map((step: Steps) => ({
        ...step,
        recipeId: id,
      })),
    })

    response.status(200).json({ data: updatedRecipe })
  } catch (error) {
    response.status(500).json({ error: error })
  }
}

export { getAllRecipes, getRecipe, addRecipe, updateRecipe, deleteRecipe }
