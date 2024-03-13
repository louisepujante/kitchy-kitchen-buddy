import API from '..'

interface FindAllIngredientBagResponse {
  data: IngredientBag[]
}

export type IngredientBag = {
  id: string
  quantity: number
  ingredient: string
}


export const IngredientBagAPI = {
  findAll: () => {
    const options = {
      method: 'GET',
      url: '/ingredientBag'
    }  
    return API.request<FindAllIngredientBagResponse>(options)
  },
  create: (data: Omit<IngredientBag, 'id'>[]) => {
    const options = {
      method: 'POST',
      url: '/recipes/create',
      header: {
        'Content-Type': 'multipart/form-data'
      },
      data: data
    }

    return API.request(options) 
  }
}