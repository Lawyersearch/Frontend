import React from 'react'
import { Button, Card, Chip, Divider, Rating, Stack, SxProps, Typography, Box } from '@mui/material'
import MessageIcon from '@mui/icons-material/Message'
import InstagramIcon from '@mui/icons-material/Instagram'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import { feedBacksString } from '../../../utils/wordsEndings'
import RoundedImage from '../../../ui/RoundedImage'
import {Category} from "../../../types/category";
import Link from "next/link";

interface UserProfileProps {
  avatar: string
  userName: string
  tasks?: Category[]
  rating: number
  feedBacks?: number
  description?: string
  experience: string
  instagram?: string
  phone?: string
  email?: string
}

const UserDescription = ({
  avatar, userName,
  tasks, rating,
  feedBacks, description,
  experience, instagram,
  phone, email, ...rest
}: UserProfileProps & SxProps) => {
  return (
    <Card sx={rest}>
      <Stack flexDirection={{xs: 'column', md: 'row'}} p={2}>
        <Stack>
          <Box alignSelf='center'>
            <RoundedImage src={avatar} height={250} width={250} />
          </Box>
          <Stack alignItems='center' spacing={1}>
            <Stack direction={{xs: 'column', md: 'row'}} alignItems='center' width='max-content' mt={2}>
              <Rating value={rating} precision={0.5} readOnly sx={{ color: 'primary.main' }} size='large'/>
              <Typography variant="body1" fontWeight={300}>
                ({Math.round(rating * 100) / 100} / 5.0)
              </Typography>
            </Stack>
            <Typography
              variant='body1'
              component='a'
              fontWeight={300}
              color={theme => theme.palette.primary.main}
              href='#reviews'
            >
              {feedBacksString(feedBacks)}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={1} justifyContent='space-between' ml={2} width='100%'>
          <Stack spacing={1}>
            <Typography variant='h4'>
              {userName}
            </Typography>
            <Typography variant="body1" fontWeight={300}>
              Опыт: {experience}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Stack>
          <Stack alignItems='flex-end' spacing={2} mr={{xs: '16px !important', md: 0}}>
            { instagram && <Stack direction='row'>
              <InstagramIcon sx={{ mr: 1 }} />
              <Typography variant='body1' component='p'>
                {instagram}
              </Typography>
            </Stack>}
            { phone && <Stack direction='row'>
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography variant='body1' component='p'>
                {phone}
              </Typography>
            </Stack>}
            { email && <Stack direction='row'>
                <EmailIcon sx={{ mr: 1 }} />
                <a href={`mailto:${email}`}>
                  <Typography variant='body1' component='p'>
                    {email}
                  </Typography>
                </a>
            </Stack>}
            <Button variant="contained" endIcon={<MessageIcon />} >
              Написать
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {(tasks?.length ?? 0) > 0 &&
      <>
        <Divider />
        <Stack
          direction='row'
          flexWrap='wrap'
          alignItems='center'
          justifyContent='space-evenly'
          sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
        >
          {tasks?.map(task => (
            <Link href={`/search?q=${task.id}`} key={task.id} shallow>
              <a>
                <Chip label={task.name} sx={{ m: 0.5, ':hover': { cursor: 'pointer' } }} />
              </a>
            </Link>
          ))}
        </Stack>
      </>}
    </Card>
  )
}

export default UserDescription
