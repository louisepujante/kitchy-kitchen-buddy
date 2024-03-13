import { ChangeEvent } from 'react'
import {
  Button,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material'
import { useFormContext } from 'react-hook-form'

import { Difficulty } from '@/api/Recipe'
import InputField from '@/components/parts/InputField'

const RecipeForm = ({ buttonText }: { buttonText?: string }) => {
  const { control, setValue } = useFormContext()

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (uploadedFile) setValue('image', uploadedFile)
  }

  return (
    <Stack gap={2} width={1 / 4}>
      <h3 style={{ textAlign: 'center' }}>Recipe details</h3>
      <InputField control={control} name='title' label='Recipe name' />
      <InputField
        control={control}
        name='duration'
        label='Duration'
        type='number'
        InputProps={{
          endAdornment: <InputAdornment position='end'>hr</InputAdornment>,
        }}
      />
      <InputField
        select
        control={control}
        name='difficulty'
        label='Difficulty'
        defaultValue={Difficulty.Novice}
      >
        {Object.keys(Difficulty).map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </InputField>
      <InputField
        control={control}
        name='description'
        label='Description'
        rows={4}
        multiline
        optional
      />
      <TextField type='file' onChange={handleFileUpload} />
      {/*       
        <Button
          type='button'
          startIcon={<FileUpload />}
          sx={{
            border: '1px solid gray',
            borderStyle: 'dotted',
            borderRadius: 2,
            minHeight: '200px',
          }}
        >
          Upload an image
        </Button> */}
      <Button type='submit' variant='contained' fullWidth>
        {buttonText ?? 'Add a recipe'}
      </Button>
    </Stack>
  )
}

export default RecipeForm
