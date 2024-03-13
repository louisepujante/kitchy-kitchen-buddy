import { useFieldArray, useFormContext } from 'react-hook-form'
import {
  MenuItem,
  Stack,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import InputField from '@/components/parts/InputField'
import CustomIconButton from '@/components/parts/IconButton'

const StepsForm = () => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'steps',
  })

  return (
    <Stack width='100%' padding={2} rowGap={2}>
      <h3>Steps</h3>
      <Stack gap={2}>
        {fields.map((field, index) => (
          <Stack direction='row' key={field.id} gap={2}>
            <InputField
              control={control}
              name={`steps.${index}.description`}
              label='Description'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>{index + 1}</InputAdornment>
                ),
              }}
              sx={{ flexGrow: 1 }}
              multiline
            />
            <InputField
              control={control}
              name={`steps.${index}.duration`}
              label='Duration'
              type='number'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>hr</InputAdornment>
                ),
              }}
              sx={{ width: '25%' }}
              optional
            />
            <CustomIconButton onClick={() => append({})} icon={<AddIcon />} />
            {fields.length > 1 && (
              <CustomIconButton
                onClick={() => remove(index)}
                icon={<DeleteIcon />}
              />
            )}
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

export default StepsForm
