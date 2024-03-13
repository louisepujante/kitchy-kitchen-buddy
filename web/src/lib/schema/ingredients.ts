import * as yup from 'yup'
import { QuantityUnit } from '@/api/Recipe'

export const ingredientsSchema = yup.object().shape({
  name: yup.string().required(),
  quantity: yup
    .number()
    .required()
    .positive()
    .transform((value) => (isNaN(value) ? undefined : value)),
  unit: yup
    .string()
    .oneOf(Object.keys(QuantityUnit))
    .default(QuantityUnit.Gram)
    .required(),
  description: yup.string().nullable(),
})