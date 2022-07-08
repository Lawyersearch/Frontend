import React from 'react'
import { Card, Rating, Stack, SxProps, Typography } from '@mui/material'
import Gallery from '../../../ui/Gallery'
import { Review } from '../../../types/user'
import RoundedImage from "../../../ui/RoundedImage";

interface UserReviewsProps {
  reviews: Review[]
}

const UserReviews = ({ reviews, ...rest }: UserReviewsProps & SxProps) => {
  return (
    <Card id='reviews' sx={{ ...rest, p: 1 }}>
      <Typography gutterBottom variant='h4' component='h3'>
        Отзывы
      </Typography>
      <Gallery height={250} spacing={2} pxPerClick={366}>
        {reviews.map(review => (
          <Stack key={review.id} bgcolor='background.paper' borderRadius='10px' p={1} width={350} spacing={1}>
            <Stack direction='row' spacing={1} alignItems='center'>
              <RoundedImage src={review.avatar} height={40} width={40}/>
              <Typography variant='h5' color='text.primary'>{review.name}</Typography>
            </Stack>
            <Stack direction='row' alignItems='center' spacing={1}>
              <Rating value={review.rating} precision={0.25} sx={{ color: 'primary.main' }} readOnly/>
              <Typography variant='body2' color='text.secondary'>{review.date}</Typography>
            </Stack>
            <Typography variant='body1' color='text.secondary'>{review.comment}</Typography>
          </Stack>
        ))}
      </Gallery>
    </Card>
  )
}

export default UserReviews
