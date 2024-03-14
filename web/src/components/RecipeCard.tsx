import { Recipe } from '@/api/Recipe'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from '@mui/material'

interface Props {
  recipe: Recipe
}

const RecipeCard = ({ recipe }: Props) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardActionArea
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Link
          href={`/recipes/${recipe.id}`}
          sx={{ flexGrow: 1 }}
          className='customLinkStyle'
        >
          <CardMedia
            component='img'
            src='/placeholder-image.png'
            sx={{ height: '200px' }}
          />
          <CardContent sx={{ padding: 2, flexGrow: 1 }}>
            <Typography gutterBottom variant='h5' component='div'>
              {recipe.title}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {recipe.description || 'No description'}
            </Typography>
          </CardContent>
        </Link>
        <Typography
          textAlign='end'
          color='gray'
          marginBottom={2}
          fontStyle='italic'
        >
          Click to view more details
        </Typography>
      </CardActionArea>
    </Card>
  )
}

export default RecipeCard
