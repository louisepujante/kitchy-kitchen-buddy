'use client'

import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { Recipe, RecipeAPI } from '@/api/Recipe'
import RecipeCard from '@/components/RecipeCard'
import Link from 'next/link'
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
          <Stack direction='row' gap={2} alignSelf='end' justifyItems='stretch'>
            <Link href='/recipes/create' className='customLinkStyle'>
              <Button
                size='large'
                startIcon={<AddIcon />}
                sx={{ alignSelf: 'end' }}
              >
                <Typography>Add recipe</Typography>
              </Button>
            </Link>
            <BagPopover />
          </Stack>
          <Grid
            container
            gap={2}
            justifyContent='center'
            sx={{ height: '450px' }}
          >
            {recipes.map((recipe) => (
              <Grid key={recipe.id} item sx={{ width: '20%' }}>
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
