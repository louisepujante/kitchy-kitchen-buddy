import * as yup from 'yup'

export const stepsSchema = yup.object().shape({
  description: yup.string().required(),
  duration: yup
    .number()
    .positive()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
    .optional(),
})