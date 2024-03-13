import { IngredientBag, IngredientBagAPI } from '@/api/IngredientBag'
import { Button, Popover, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const BagPopover = () => {
  const [open, setOpen] = useState(false)
  const [ingredientsInBag, setIngredientsInBag] = useState<IngredientBag[]>()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen(true)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {}, [
    IngredientBagAPI.findAll().then((data) => {
      setIngredientsInBag(data.data.data || [])
    }),
  ])

  return (
    <>
      <Button variant='contained' onClick={handleClick}>
        Open bag
      </Button>
      <Popover
        open={true}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{ '& .MuiPopover-paper': {
          padding: 2,
          gap: 2
        } }}
      >        
        <Typography>You currently have:</Typography>
        {/* <Stack border={1} justifyContent='center'> */}
          {ingredientsInBag?.map((ingredient) => (
            <Typography key={ingredient.id}>
              {ingredient.quantity} {ingredient.ingredient}
            </Typography>
          ))}
        {/* </Stack> */}
      </Popover>
    </>
  )
}

export default BagPopover
