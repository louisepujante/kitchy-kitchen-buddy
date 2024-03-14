import { Divider, Stack, Typography } from '@mui/material'

type RecipeDetailHeaderProps = {
  value?: string
  label: string
}

export const RecipeDetailHeader = ({ value, label }: RecipeDetailHeaderProps) => {
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

export const RecipeDetail = ({
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
