import axios from 'axios'
import API from '..'

export interface Recipe {
  id: string
  title: string
  description: string
  image: string
  duration: number
  difficulty: Difficulty
  ingredients: Ingredients[]
  steps: Steps[]
}

export enum Difficulty {
  Novice = 'Novice',
  Beginner= 'Beginner',
  Intermediate= 'Intermediate',
  Experienced='Experienced'
}

interface Ingredients {
  id: string
  name: string
  description?: string | null
  quantity: number
  unit: QuantityUnit
}

export enum QuantityUnit {
  Gram = 'Gram',
  Milligram = 'Milligram',
  Kilogram = 'Kilogram',
  Pound = 'Pound',
  Tablespoon = 'Tablespoon',
  Teaspoon = 'Teaspoon',
  Cup = 'Cup',
  Pinch = 'Pinch',
  Piece = 'Piece',
  Ounce = 'Ounce'
}

interface Steps {
  id: string
  order: number
  description: string
  duration?: number | null
}

export type FindAllRecipeResponse = {
  data: Recipe[]
}

export type FindOneRecipeResponse = {
  data: Recipe
}

type CreateRecipeData = {
  title: string
  description?: string | null
  image?: string
  duration: number
  difficulty: string
  ingredients: CreateIngredientData[]
  steps: CreateStepData[]
}

type CreateIngredientData = {
  name: string
  quantity: number
  unit: string  
  description?: string | null
}

type CreateStepData = {
  order: number
  description: string
  duration?: number | null
}

export type UpdateRecipeData = {
  id: string
  title: string
  description?: string | null
  image?: string
  duration: number
  difficulty: string
  ingredients: UpdateIngredientData[]
  steps: UpdateStepData[]
}

type UpdateIngredientData = {
  id: string
  name: string
  quantity: number
  unit: string  
  description?: string | null
}

type UpdateStepData = {
  id: string
  order: number
  description: string
  duration?: number | null
}

export const RecipeAPI = {
  create: (data: CreateRecipeData) => {
    const options = {
      method: 'POST',
      url: '/recipes/create',
      header: {
        'Content-Type': 'multipart/form-data'
      },
      data: data
    }

    return API.request(options)
  },
  update: (data: CreateRecipeData & {id: string}) => {
    const options = {
      method: 'PUT',
      url: `/recipes/${data.id}`,
      header: {
        'Content-Type': 'multipart/form-data'
      },
      data: data
    }

    return API.request(options)
  },
  delete: (id: string) => {
    const options = {
      method: "DELETE",
      url: `/recipes/${id}`,
    }
    
    return API.request(options)
  },
  findAll: () => {
    const options = {
      method: 'GET',
      url: '/recipes'
    }  
    return API.request<FindAllRecipeResponse>(options)
  },
  findOne: (id: string) => {
    const options = {
      method: 'GET',
      url: `/recipes/${id}`
    }  
    return API.request<FindOneRecipeResponse>(options)
  }
}
