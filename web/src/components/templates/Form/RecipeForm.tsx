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

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]

    if (!uploadedFile) {
      console.error('No file selected')
      return
    }

    try {
      const base64String = await toBase64(uploadedFile)
      setValue('image', base64String)
      console.log('Base64 encoded file:', base64String)
      // Further process the base64String (e.g., send to server)
    } catch (error) {
      console.error('Error reading file:', error)
    }
  }

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
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
      <Button type='submit' variant='contained' fullWidth>
        {buttonText ?? 'Add a recipe'}
      </Button>
    </Stack>
  )
}

export default RecipeForm
