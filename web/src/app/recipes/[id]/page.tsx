'use client'

import { QuantityUnit, Recipe, RecipeAPI } from '@/api/Recipe'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Popover,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Dialog from '@/components/parts/Dialog'
import { ArrowBack } from '@mui/icons-material'
import Link from 'next/link'
import { defaultSnackbarInfo, useSnackbarContext } from '@/contexts/Snackbar'

type RecipeDetailHeaderProps = {
  value?: string
  label: string
}

const RecipeDetailHeader = ({ value, label }: RecipeDetailHeaderProps) => {
  return (
    <Stack alignItems='center'>
      <Typography fontSize='25px' fontWeight='bold'>
        {value}
      </Typography>
      <Typography fontSize='15px'>{label}</Typography>
    </Stack>
  )
}

type RecipeDetailProps = {
  title?: string
  description?: string
  duration?: number
  ingredientsLength?: number
  difficulty?: string
}

const RecipeDetail = ({
  title,
  description,
  duration,
  ingredientsLength,
  difficulty,
}: RecipeDetailProps) => {
  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      gap={5}
    >
      <Stack width='50%'>
        <h1>{title}</h1>
        <Typography>{description}</Typography>
      </Stack>
      <Stack
        direction='row'
        gap={3}
        sx={{ justifySelf: 'end' }}
        divider={<Divider orientation='vertical' flexItem />}
      >
        <RecipeDetailHeader value={duration?.toString()} label='hours' />
        <RecipeDetailHeader
          value={ingredientsLength?.toString()}
          label='ingredients'
        />
        <RecipeDetailHeader value={difficulty} label='difficulty' />
      </Stack>
    </Stack>
  )
}

const RecipeDetailPage = () => {
  const router = useRouter()
  const { setSnackbarInfo } = useSnackbarContext()
  const { id } = useParams<{ id: string }>()
  const [recipe, setRecipe] = useState<Recipe>()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    RecipeAPI.findOne(id).then(({ data }) => {
      setRecipe(data.data || [])
    })
  }, [])

  const handleDeleteRecipe = async () => {
    try {
      const {
        data: { message },
      } = await RecipeAPI.delete(id)
      setSnackbarInfo({
        severity: 'success',
        message,
        open: true,
      })
      router.push('/')
    } catch (error) {
      setSnackbarInfo({
        severity: 'success',
        message: (error as any).message,
        open: true,
      })
    } finally {
      setOpen(false)
      setTimeout(() => {
        setSnackbarInfo(defaultSnackbarInfo)
      }, 2000)
    }
  }

  return (
    <Stack direction='row' justifyContent='center' marginY={5}>
      <Stack width='80%'>
        <Link
          href='/'
          className='customLinkStyle'
          style={{ display: 'flex', gap: 2, alignSelf: 'start' }}
        >
          <ArrowBack />
          <Typography>Back to Recipes list</Typography>
        </Link>
        <Card
          sx={{
            display: 'flex',
            marginTop: 4,
            gap: 3,
            border: 1,
            borderColor: 'gray',
          }}
        >
          <CardMedia
            component='img'
            image='https://www.allrecipes.com/thmb/jD-nOpMRkm8ynBBYEG7I2iy1274=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/11887_pesto-pasta_Rita-4x3-82d239b2ced84722975543e3ca95cbc3.jpg'
            sx={{ width: '30%' }}
          />
          <CardContent
            sx={{
              padding: 5,
              width: '100%',
            }}
          >
            <Stack direction='row' justifyContent='end' gap={3}>
              <Link href={`/recipes/${id}/edit`} className='customLinkStyle'>
                <Button startIcon={<EditIcon />}>Edit recipe</Button>
              </Link>
              <Button startIcon={<DeleteIcon />} onClick={() => setOpen(true)}>
                Delete recipe
              </Button>
            </Stack>
            <Stack gap={3}>
              <RecipeDetail
                title={recipe?.title}
                description={recipe?.description}
                duration={recipe?.duration}
                ingredientsLength={recipe?.ingredients.length}
                difficulty={recipe?.difficulty}
              />
              <Stack direction='row' gap={5}>
                <Stack gap={2} width={1 / 3}>
                  <h3>Ingredients</h3>
                  {recipe?.ingredients.map((ingredient) => (
                    <Typography>
                      {ingredient.quantity} {ingredient.unit} {ingredient.name}{' '}
                      {ingredient.description && (
                        <>({ingredient.description})</>
                      )}
                    </Typography>
                  ))}
                </Stack>
                <Divider />
                <Stack gap={2} sx={{ flexGrow: 1 }}>
                  <h3>Steps</h3>
                  {recipe?.steps.map((step) => (
                    <Stack direction='row' gap={2} alignItems='center'>
                      <Typography fontSize='20px' sx={{ color: '#1976D2' }}>
                        {step.order}
                      </Typography>
                      <Typography>{step.description}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
      <Dialog
        open={open}
        title='Confirmation'
        closeButtonText='Cancel'
        submitButtonText='Yes, delete'
        handleClose={() => setOpen(!open)}
        handleSubmit={handleDeleteRecipe}
      >
        <Typography>Are you sure you want to delete this recipe?</Typography>
      </Dialog>
    </Stack>
  )
}

export default RecipeDetailPage
