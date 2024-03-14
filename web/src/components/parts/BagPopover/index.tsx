import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  // Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Popover,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

import { IngredientBag, IngredientBagAPI } from '@/api/IngredientBag'
import CustomIconButton from '../IconButton'
import { defaultSnackbarInfo, useSnackbarContext } from '@/contexts/Snackbar'
import InputField from '../InputField'
import Dialog from '../Dialog'

const schema = yup.object({
  ingredientsInBag: yup.array().of(
    yup.object().shape({
      quantity: yup
        .number()
        .required()
        .positive()
        .transform((value) => (isNaN(value) ? undefined : value)),
      ingredient: yup.string().required(),
    })
  ),
})

type FormValues = yup.InferType<typeof schema>

const BagPopover = () => {
  const { setSnackbarInfo } = useSnackbarContext()
  const [openDialog, setOpenDialog] = useState(false)
  const [refetch, setRefetch] = useState(false)
  const [openPopover, setOpenPopover] = useState(false)
  const [ingredientsInBag, setIngredientsInBag] = useState<IngredientBag[]>()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      ingredientsInBag: [{}],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredientsInBag',
  })

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    setOpenPopover(true)
  }

  const handleClosePopover = () => {
    setAnchorEl(null)
    setOpenPopover(false)
  }

  const onSubmit = async (data: FormValues) => {
    try {
      const {
        data: { message },
      } = await IngredientBagAPI.create({ data: data.ingredientsInBag || [] })
      setSnackbarInfo({
        severity: 'success',
        message,
        open: true,
      })
    } catch (error) {
      setSnackbarInfo({
        severity: 'error',
        message: (error as any).message,
        open: true,
      })
    } finally {
      setTimeout(() => {
        setSnackbarInfo(defaultSnackbarInfo)
      }, 2000)
      handleClosePopover()
      setOpenDialog(false)
      reset({})
      setRefetch(true)
    }
  }

  useEffect(() => {
    IngredientBagAPI.findAll().then((data) => {
      setIngredientsInBag(data.data.data || [])
    })
  }, [refetch])

  return (
    <>
      <Button
        onClick={handleClick}
        startIcon={<LocalMallIcon />}
        size='large'
      >
        Open bag
      </Button>
      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            padding: 2,
          },
          marginTop: 1,
        }}
      >
        <Typography fontWeight='bold'>You currently have:</Typography>
        {ingredientsInBag?.map((ingredient) => (
          <Typography key={ingredient.id}>
            {ingredient.quantity} {ingredient.ingredient}
          </Typography>
        ))}
        <Button onClick={() => setOpenDialog(true)}>Add ingredient</Button>
      </Popover>
      <Dialog
        open={openDialog}
        title='Add ingredient to bag'
        closeButtonText='Cancel'
        submitButtonText='Add ingredient'
        handleClose={() => setOpenDialog(!openDialog)}
        handleSubmit={() => handleSubmit(onSubmit)()}
      >
        <Stack paddingY={1} gap={2}>
          {fields.map((field, index) => (
            <Stack key={field.id} direction='row' gap={2}>
              <InputField
                control={control}
                name={`ingredientsInBag.${index}.quantity`}
                label='Qty'
                sx={{ width: '20%' }}
              />
              <InputField
                control={control}
                name={`ingredientsInBag.${index}.ingredient`}
                label='Ingredient'
                sx={{ flex: 1 }}
              />
              <CustomIconButton
                onClick={() =>
                  append({
                    quantity: 0,
                    ingredient: '',
                  })
                }
                icon={<AddIcon />}
              />
              {fields.length > 1 && (
                <CustomIconButton
                  onClick={() => remove(index)}
                  icon={<DeleteIcon />}
                />
              )}
            </Stack>
          ))}
        </Stack>
      </Dialog>
    </>
  )
}

export default BagPopover
