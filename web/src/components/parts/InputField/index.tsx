'use client'
import {
  FormControl,
  FormHelperText,
  TextField,
  TextFieldProps,
} from '@mui/material'
import { Control, useController } from 'react-hook-form'

type InputFieldProps = TextFieldProps & {
  name: string
  control: Control<any>
  defaultValue?: string
  children?: React.ReactNode
  optional?: boolean
}

const InputField = ({
  name,
  control,
  defaultValue = '',
  label,
  type = 'text',
  InputProps,
  sx,
  multiline,
  rows,
  inputProps,
  select,
  children,
  optional,
}: InputFieldProps) => {
  const {
    field: { ref, ...rest },
    fieldState: { error },
  } = useController({ name, control, defaultValue })

  return (
    <TextField
      {...rest}
      name={name}
      label={`${label} ${optional ? '(optional)' : ''}`}
      type={type}
      sx={sx}
      multiline={multiline}
      rows={rows}
      inputProps={inputProps}
      inputRef={ref}
      error={!!error}
      InputProps={InputProps}
      select={select}
    >
      {select && children}
    </TextField>
  )
}

export default InputField
