import API from '..'

interface FindAllIngredientBagResponse {
  data: IngredientBag[]
}

export type IngredientBag = {
  id: string
  quantity: number
  ingredient: string
}

type AddIngredientToBagData = {
  data: Omit<IngredientBag, 'id'>[]
}


export const IngredientBagAPI = {
  findAll: () => {
    const options = {
      method: 'GET',
      url: '/ingredientBag'
    }  
    return API.request<FindAllIngredientBagResponse>(options)
  },
  create: (data: AddIngredientToBagData) => {
    const options = {
      method: 'POST',
      url: '/ingredientBag/create',
      header: {
        'Content-Type': 'multipart/form-data'
      },
      data: data
    }

    return API.request(options) 
  }
}