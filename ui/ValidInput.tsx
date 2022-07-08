import React, { forwardRef } from 'react'
import TextField from '@mui/material/TextField'
import { TextFieldProps } from '@mui/material/TextField/TextField'

interface InputProps {
  showError?: boolean
  valid?: (val?: string) => boolean
  invalidText?: string
  value?: string
  bindChange: React.Dispatch<React.SetStateAction<string>>
  [key: string]: any
}

const ValidInput = ({ showError, valid, invalidText, value, bindChange, ...rest }: InputProps & TextFieldProps,
  ref: React.Ref<HTMLInputElement>) =>
  (
    <TextField
      {...rest}
      ref={ref}
      variant="standard"
      value={value}
      onChange={ev => bindChange(ev.target.value)}
      error={valid ? (showError && !valid(value)) : undefined}
      helperText={valid ? (showError && !valid(value) && invalidText) : undefined}
    />
  )

export default forwardRef(ValidInput)
