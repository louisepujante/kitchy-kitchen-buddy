'use client'

import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { Recipe, RecipeAPI } from '@/api/Recipe'
import RecipeCard from '@/components/RecipeCard'
import Link from 'next/link'
import Image from 'next/image'
import BagPopover from '@/components/parts/BagPopover'

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    RecipeAPI.findAll().then(({ data }) => {
      setRecipes(data.data || [])
    })
  }, [])

  return (
    <>
      <Box display='flex' flexDirection='column' alignItems='center' margin={0}>
        <Box
          component='img'
          sx={{
            height: '200px',
            width: '100%',
            objectFit: 'cover',
          }}
          alt='The house from the offer.'
          src='/cover-photo.jpg'
        />
        <Stack
          direction='column'
          justifyContent='center'
          alignItems='center'
          gap={4}
          width='80%'
        >
          <Stack alignItems='center'>
            <h1 style={{ fontSize: '90px', margin: 0 }}>Kitchy</h1>
            <h2 style={{ margin: 0, fontStyle: 'italic' }}>Kitchen Buddy</h2>
            <Typography marginTop={2}>
              A micro-recipe sharing site and kitchen assistant
            </Typography>
          </Stack>
          <Button
            size='large'
            variant='contained'
            startIcon={<AddIcon />}
            sx={{ alignSelf: 'end' }}
          >
            <Link href='/recipes/create' className='customLinkStyle'>
              <Typography>Add recipe</Typography>
            </Link>
          </Button>
          
          <BagPopover />
          <Grid
            container
            gap={2}
            justifyContent='center'
            sx={{ height: '450px' }}
          >
            {recipes.map((recipe) => (
              <Grid item sx={{ width: '20%' }}>
                <RecipeCard key={recipe.id} recipe={recipe} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Box>
    </>
  )
}

export default RecipeListPage
