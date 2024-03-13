import { useFieldArray, useFormContext } from 'react-hook-form'
import { MenuItem, Stack, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

import { QuantityUnit } from '@/api/Recipe'
import InputField from '@/components/parts/InputField'
import CustomIconButton from '@/components/parts/IconButton'

const IngredientsForm = () => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  })

  return (
    <Stack width='100%' padding={2} gap={2}>
      <h3>Ingredients</h3>
      {fields.map((field, index) => (
        <Stack direction='row' gap={1} key={field.id}>
          <InputField
            control={control}
            name={`ingredients.${index}.quantity`}
            type='number'
            label='Qty'
            sx={{ width: '80px' }}
          />
          <InputField
            select
            control={control}
            name={`ingredients.${index}.unit`}
            defaultValue={QuantityUnit.Gram}
            sx={{ width: '15%' }}
            label='Unit'
          >
            {Object.keys(QuantityUnit).map((unit) => (
              <MenuItem key={unit} value={unit}>
                {unit}
              </MenuItem>
            ))}
          </InputField>
          <InputField
            control={control}
            name={`ingredients.${index}.name`}
            label='Ingredient name'
            sx={{ flexGrow: 1 }}
          />
          <InputField
            control={control}
            name={`ingredients.${index}.description`}
            label='Description'
            sx={{ flexGrow: 1 }}
            optional
          />
          <CustomIconButton onClick={() => append({})} icon={<AddIcon />} />
          {fields.length > 1 && (
            <CustomIconButton onClick={() => remove(index)} icon={<DeleteIcon />} />
          )}
        </Stack>
      ))}
    </Stack>
  )
}


export default IngredientsForm
