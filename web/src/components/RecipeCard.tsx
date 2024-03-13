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
            image='https://images.unsplash.com/photo-1566555318858-6a1368a2619e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
