import { FormControl, FormHelperText, FormLabel, MenuItem, Select, SelectProps } from '@mui/material'
import { SelectChangeEvent, SelectInputProps } from '@mui/material/Select/SelectInput'
import { Control, useController } from 'react-hook-form'

type InputFieldProps = SelectProps & {
  name: string
  control: Control<any>
  defaultValue?: string,
  options: string[],
}

const SelectField = ({
  name,
  control,
  defaultValue = '',
  options,
  label,
}: InputFieldProps) => {
  const {
    field: { ref, onChange, value, ...rest },
    fieldState: { error },
  } = useController({ name, control, defaultValue })

  return (
    <FormControl error={!!error}>
      {/* <FormLabel>{label}</FormLabel> */}
      <Select
        {...rest}
        value={value}
        onChange={(event: SelectChangeEvent) => {
          onChange(event.target.value)
        }}
        inputRef={ref}
        label={label}
        name={name}
        error={!!error}
        className="bg-white w-96"
      >
        {options.map((option) => (
          <MenuItem value={option}>{option}</MenuItem>
        ))}
      </Select>
      {error && (
        <FormHelperText error={!!error.message} className="mx-0 w-[384px]">
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default SelectField