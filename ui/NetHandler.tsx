import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import {RTKError} from "../types/RTKResponse";

interface NetHandlerProps {
  isLoading: boolean
  isSuccess: boolean
  children: JSX.Element
  error?: RTKError | any
  h?: string
  w?: string
}

const NetHandler = ({ isLoading, isSuccess, children, error, h, w }: NetHandlerProps) => {
  if (isLoading) {
    return <CircularProgress sx={
      (h && w && { mt: `calc(${h} / 2 - 20px)`, ml: `calc(${w} / 2 - 20px)` }) || undefined
    }/>
  }
  if (isSuccess || error === undefined) { return children }
  return (
    <Box width={w} height={h} display='flex' justifyContent='center' alignItems='center'>
      <Typography variant='h6' color='text.primary'> {error.data.error} </Typography>
    </Box>
  )
}

export default NetHandler
