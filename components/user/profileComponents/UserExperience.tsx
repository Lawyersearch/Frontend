import React from 'react'
import { Card, SxProps, Typography, Stack } from '@mui/material'
import { WorkExpirience } from '../../../types/user'
import Gallery from '../../../ui/Gallery'
import {experienceString} from "../../../utils/wordsEndings";

interface UserExperienceProps {
  workExpiriences: WorkExpirience[]
}

const UserExperience = ({ workExpiriences, ...rest }: UserExperienceProps & SxProps) => {
  return (
    <Card sx={{ ...rest, p: 1 }}>
      <Typography gutterBottom variant='h4' component='h3'>
        Опыт работы
      </Typography>
      <Gallery height={250} spacing={2} pxPerClick={366}>
        {workExpiriences.map(exp => (
          <Stack
            width={350}
            key={exp.id}
            justifyContent='space-evenly'
            bgcolor='background.paper'
            borderRadius='10px'
            p={1}
          >
            <Typography variant='h5' color='text.primary'>{exp.position}</Typography>
            <Typography variant='body1' color='text.primary'>{exp.workPlace}</Typography>
            <Stack direction='row' spacing={1}>
              <Typography variant='body2' color='text.secondary'>{exp.startYear} — {exp.endYear}</Typography>
              <Typography variant='body2' color='text.secondary'>({experienceString(exp.duration)})</Typography>
            </Stack>
          </Stack>
        ))}
      </Gallery>
    </Card>
  )
}

export default UserExperience
