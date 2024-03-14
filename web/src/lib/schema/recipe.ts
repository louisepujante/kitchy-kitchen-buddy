import * as yup from 'yup'

import { Difficulty } from '@/api/Recipe'
import { ingredientsSchema } from './ingredients'
import { stepsSchema } from './steps'

export const recipeSchema = yup.object({
  title: yup.string().required(),
  duration: yup
    .number()
    .required()
    .positive()
    .transform((value) => (isNaN(value) ? undefined : value)),
  difficulty: yup
    .string()
    .oneOf(Object.keys(Difficulty))
    .default(Difficulty.Novice)
    .required(),
  description: yup.string().nullable(),
  image: yup.string().default('sample-image-here'),
  // TODO: Fix image saving
  // image: yup.mixed().test('fileType', 'Invalid file type', (value) => {
  //   if (!(value instanceof File)) return false
  //   const file = value as File
  //   return ['image/jpeg', 'image/png'].includes(file.type)
  // }),
  ingredients: yup.array().of(ingredientsSchema).required(),
  steps: yup.array().of(stepsSchema).required(),
})

export type FormValues = yup.InferType<typeof recipeSchema>