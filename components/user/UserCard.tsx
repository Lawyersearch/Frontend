import React from 'react'
import { Box, Card, Chip, Divider, Rating, Stack, SxProps, Typography, Button } from '@mui/material'
import MessageIcon from '@mui/icons-material/Message'
import { feedBacksString } from '../../utils/wordsEndings'
import RoundedImage from '../../ui/RoundedImage'
import Link from 'next/link'
import {Category} from "../../types/category";

interface UserProfileProps {
  id: string
  avatar: string
  userName: string
  tasks: Category[]
  rating: number
  feedBacks: number
  description: string
  experience: string
}

function UserCard ({ id, avatar, userName, tasks, rating, feedBacks, description, experience, ...rest }: UserProfileProps & SxProps) {
  return (
    <Card sx={{ borderRadius: 4, ...rest}}>
      <Box sx={{ p: 2, display: 'flex' }}>
        <Box mr={2}>
          <Link href={`/userProfile/${id}`}>
            <a>
              <RoundedImage src={avatar} height={250} width={250} sx={{ mr: 2, mb: 2 }}/>
            </a>
          </Link>
        </Box>
        <Stack spacing={1} width='100%'>
          <Link href={`/userProfile/${id}`}>
            <a>
              <Typography fontWeight={700} sx={{
                cursor: 'pointer',
                textAlign: {xs: 'center', md: 'inherit'},
                ':hover': {textDecoration: 'underline'}
              }}
              >
                {userName}
              </Typography>
            </a>
          </Link>
          <Stack direction='row' spacing={1} alignItems='center' justifyContent={{xs: 'center', md: 'flex-start'}} flexWrap='wrap'>
            <Rating value={rating} precision={0.5} readOnly sx={{ color: 'primary.main' }}/>
            <Typography variant="body1" fontWeight={300}>
              ({Math.round(rating * 100) / 100} / 5.0)
            </Typography>
            <Link href={`/userProfile/${id}#reviews`}>
              <a>
                <Typography
                  variant='body1'
                  fontWeight={300}
                  color={theme => theme.palette.primary.main}
                >
                  {feedBacksString(feedBacks)}
                </Typography>
              </a>
            </Link>
          </Stack>
          <Typography variant="body1" fontWeight={300} textAlign={{xs: 'center', md: 'inherit'}}>
            Опыт: {experience}
          </Typography>
          <Divider />
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Button
            variant="contained"
            endIcon={<MessageIcon />}
            sx={{ml: {md: 'auto !important'}, mr: {md: '20px !important'} }}
          >
            Написать
          </Button>
        </Stack>
      </Box>
      <Divider />
      <Stack
        direction='row'
        flexWrap='wrap'
        alignItems='center'
        justifyContent='space-evenly'
        sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
      >
        {tasks.map(task => (
          <Link href={`/search?q=${task.id}`} key={task.id} shallow>
            <a>
              <Chip label={task.name} sx={{ m: 0.5, ':hover': { cursor: 'pointer' } }} />
            </a>
          </Link>
        ))}
      </Stack>
    </Card>
  )
}

export default UserCard
