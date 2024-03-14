'use client'

import { useForm, FormProvider } from 'react-hook-form'
import Link from 'next/link'
import {
  Box,
  Divider,
  Stack,
} from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { RecipeAPI } from '@/api/Recipe'
import IngredientsForm from '@/components/templates/Form/IngredientsForm'
import RecipeForm from '@/components/templates/Form/RecipeForm'
import StepsForm from '@/components/templates/Form/StepsForm'
import { FormValues, recipeSchema } from '@/lib/schema/recipe'
import { defaultSnackbarInfo, useSnackbarContext } from '@/contexts/Snackbar'


const CreatePage = () => {  
  const { setSnackbarInfo } = useSnackbarContext()
  const methods = useForm<FormValues>({
    resolver: yupResolver(recipeSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      ingredients: [{}],
      steps: [{}],
    },
  })
  const { handleSubmit, reset, clearErrors } = methods

  const handleResetAndClose = () => {
    reset({})
    clearErrors()
    setTimeout(() => {
      setSnackbarInfo(defaultSnackbarInfo)
    }, 2000)
  }

  const onSubmit = async (data: FormValues) => {
    const { steps, ...rest } = data

    const orderedSteps =
      steps?.map((step, index) => ({
        ...step,
        order: index + 1,
      })) || []

    try {
      const {
        data: { message },
      } = await RecipeAPI.create({
        ...rest,
        steps: orderedSteps,
      })
      setSnackbarInfo({
        message,
        open: true,
        severity: "success",
      })
      handleResetAndClose()
    } catch (error) {
      setSnackbarInfo({
        severity: "error",
        message: (error as any).message,
        open: true,
      })
    } 
  }

  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        marginTop={2}
        padding={4}
      >
        <Stack width={2 / 3}>
          <Stack direction='row' sx={{ alignItems: 'center' }}>
            <Link
              href='/'
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'flex-start',
              }}
              className='customLinkStyle'
            >
              <ArrowBackIcon sx={{ fontSize: '30px' }} />
            </Link>
            <h1 style={{ flexGrow: 1 }}>Add a new recipe</h1>
          </Stack>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack
                direction='row'
                gap={3}
                divider={<Divider orientation='vertical' flexItem />}
              >
                <RecipeForm />
                <Stack gap={2} sx={{ flexGrow: 1 }}>
                  <IngredientsForm />
                  <StepsForm />
                </Stack>
              </Stack>
            </form>
          </FormProvider>
        </Stack>
      </Box>
    </>
  )
}

export default CreatePage
