import React from 'react'
import { Card, Stack, SxProps, Typography } from '@mui/material'
import { Education } from '../../../types/user'
import Gallery from '../../../ui/Gallery'
import {experienceString} from "../../../utils/wordsEndings";

interface UserQualificationProps {
  educations: Education[]
}

const UserQualification = ({ educations, ...rest }: UserQualificationProps & SxProps) => {
  return (
    <Card sx={{ ...rest, p: 1 }}>
      <Typography gutterBottom variant='h4' component='h3'>
        Квалификация
      </Typography>
      <Gallery height={250} spacing={2} pxPerClick={366}>
        {educations.map(ed => (
          <Stack
            width={350}
            key={ed.id}
            justifyContent='space-evenly'
            bgcolor='background.paper'
            borderRadius='10px'
            p={1}
          >
            <Typography variant='h5' color='text.primary'>{ed.direction}</Typography>
            <Typography variant='body1' color='text.primary'>{ed.studyPlace}</Typography>
            <Stack direction='row' spacing={1}>
              <Typography variant='body2' color='text.secondary'>{ed.startYear} — {ed.endYear}</Typography>
              <Typography variant='body2' color='text.secondary'>({experienceString(ed.duration)})</Typography>
            </Stack>
          </Stack>
        ))}
      </Gallery>
    </Card>
  )
}

export default UserQualification
