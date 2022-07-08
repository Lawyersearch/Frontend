import { useId, useRef } from 'react'
import { Button, Typography } from '@mui/material'

export const TestingComponent = () => {
  const fileRef = useRef<HTMLInputElement>(null)

  const id = useId()

  return (
    <>
      <label htmlFor={id}>
        <Button variant='outlined' sx={{ textTransform: 'none' }} component='div'>
          <Typography>
            Тут какой то текст
          </Typography>
        </Button>
        <input id={id} type='file' accept='.png,.jpg,.jpeg' hidden ref={fileRef}/>
      </label>
    </>
  )
}

export default TestingComponent
