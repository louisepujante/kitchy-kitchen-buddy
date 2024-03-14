'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Divider, Link, Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import RecipeForm from '@/components/templates/Form/RecipeForm'
import IngredientsForm from '@/components/templates/Form/IngredientsForm'
import StepsForm from '@/components/templates/Form/StepsForm'
import { FormValues, recipeSchema } from '@/lib/schema/recipe'
import { RecipeAPI } from '@/api/Recipe'
import { useSnackbarContext } from '@/contexts/Snackbar'

const EditRecipePage = () => {  
  const router = useRouter()
  const { setSnackbarInfo } = useSnackbarContext()
  const { id } = useParams<{ id: string }>()
  const methods = useForm<FormValues>({
    resolver: yupResolver(recipeSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })
  const { handleSubmit, reset } = methods

  const onSubmit = async (data: FormValues) => {
    const { steps, ingredients, ...rest } = data

    const orderedSteps =
      steps?.map(({ description, duration }, index) => ({
        order: index + 1,
        description,
        duration,
      })) || []
    
    try {
      await RecipeAPI.update({
        ...rest,
        id,
        steps: orderedSteps,
        ingredients
      })
      setSnackbarInfo({
        message: 'Successfully updated recipe',
        open: true,
        severity: "success",
      })
      router.push(`/recipes/${id}`)
    } catch (error) {
      setSnackbarInfo({
        severity: "error",
        message: (error as any).message,
        open: true,
      })
    }
  }

  useEffect(() => {
    RecipeAPI.findOne(id).then(({ data }) => {
      reset(data.data || {})
    })
  }, [])

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
              href={`/recipes/${id}`}
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'flex-start',
                gap: 2
              }}
              className='customLinkStyle'
            >
              <ArrowBackIcon />
              <Typography>Back to Recipe</Typography>
            </Link>
            <h1 style={{ flexGrow: 1 }}>Edit recipe</h1>
          </Stack>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack
                direction='row'
                gap={3}
                divider={<Divider orientation='vertical' flexItem />}
              >
                <RecipeForm buttonText='Edit recipe' />
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

export default EditRecipePage
