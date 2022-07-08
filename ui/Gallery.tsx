import React, { useRef, useState } from 'react'
import { Box, IconButton, Stack, SxProps } from '@mui/material'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import useElementSize from '../hooks/useElementSize'
import {useBoolean} from "../hooks/useBoolean";

interface CarouselProps {
  children: JSX.Element | JSX.Element[]
  height?: number
  pxPerClick?: number
  scrollOnHover?: number
  spacing?: number
  sx?: SxProps
}

const Gallery = ({
  children,
  height = 500,
  pxPerClick = 300,
  scrollOnHover = 20,
  spacing = 0,
  sx
}: CarouselProps) => {
  const [scroll, setScroll] = useState(0)
  const [leftHover, leftEnter, leftLeave] = useBoolean(false)
  const [rightHover, rightEnter, rightLeave] = useBoolean(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [boxRef, { width }] = useElementSize()

  const scrollLeft = () => {
    const ceil = 0
    setScroll(scroll => Math.min(scroll + pxPerClick, ceil))
  }

  const scrollRight = () => {
    const floor = width - contentRef.current!.scrollWidth
    setScroll(scroll => Math.max(scroll - pxPerClick, floor))
  }

  const leftDisabled = scroll >= 0
  const rightDisabled = !!contentRef.current && contentRef.current.scrollWidth + scroll <= width

  return (
    <>
      <Box height={height} ref={boxRef} sx={sx} overflow='hidden'>
        <IconButton
          disabled={leftDisabled}
          onClick={scrollLeft}
          onMouseEnter={leftEnter}
          onMouseLeave={leftLeave}
          sx={{
            opacity: +(!leftDisabled || !rightDisabled),
            height: 1,
            borderRadius: 0,
            pl: 2,
            pr: 5,
            transition: '.25s background ease-in-out',
            ':hover': {
              background: 'linear-gradient(90deg, rgba(100, 100, 100, 0.5), rgba(100, 100, 100, 0.01))'
            }
          }}
        >
          <KeyboardArrowLeftIcon sx={{ height: 40, width: 40 }}/>
        </IconButton>
        <Stack
          spacing={spacing}
          ref={contentRef}
          direction='row'
          mt={`-${height}px`}
          height='inherit'
          ml={(scroll + (+leftHover - +rightHover) * scrollOnHover) + 'px'}
          sx={{ transition: '.25s margin-left ease-in-out', '& > *': { flexShrink: 0 } }}
        >
          {children}
        </Stack>
        <IconButton
          disabled={rightDisabled}
          onClick={scrollRight}
          onMouseEnter={rightEnter}
          onMouseLeave={rightLeave}
          sx={{
            opacity: +(!leftDisabled || !rightDisabled),
            height: 1,
            borderRadius: 0,
            pr: 2,
            pl: 5,
            ml: 'calc(100% - 80px)',
            mt: `calc(-${height}px - 21.5px)`,
            ':hover': {
              background: 'linear-gradient(270deg, rgba(100, 100, 100, 0.5), rgba(100, 100, 100, 0.01))'
            }
          }}>
          <KeyboardArrowRightIcon sx={{ height: 40, width: 40 }}/>
        </IconButton>
      </Box>
    </>
  )
}

export default Gallery
