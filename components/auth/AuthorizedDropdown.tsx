import React from 'react'
import RoundedImage from '../../ui/RoundedImage'
import { Button, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import {useGetSelfQuery} from "../../services/user";

interface AuthorizedDropdownProps {
  onClick?: () => void
}

const AuthorizedDropdown = ({onClick}: AuthorizedDropdownProps) => {
  const {data: user, refetch} = useGetSelfQuery(undefined)

  const onClickAction = () => onClick && onClick()

  const logout = () => {
    localStorage.removeItem('token')
    refetch()
    onClickAction()
  }

  return (
    <Stack alignItems='center' width='max-content'>
      <RoundedImage src={user!.avatar} height={70} width={70}/>
      <Typography fontWeight='medium' fontSize={20} color='text.primary'>
        {user?.lastName}
      </Typography>
      <Typography fontSize={16} color='text.secondary' gutterBottom>
        {user?.email}
      </Typography>
      <Link href={`/userProfile/${user?.id}`}>
        <a>
          <Button component='div' variant='outlined' sx={{ my: 2 }} onClick={onClickAction}>
            Моя страница
          </Button>
        </a>
      </Link>
      <Button variant='outlined' onClick={logout}>Выйти</Button>
    </Stack>
  )
}

export default AuthorizedDropdown
