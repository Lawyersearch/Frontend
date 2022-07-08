import {Box, Container, Stack, Typography} from "@mui/material";
import Link from "next/link";

const NotFound = () => {
  return (
    <Container>
      <Stack
        alignItems='center'
        height='calc(100vh - 64px - 16px)'
        borderRadius={4}
        p={2}
        sx={{
          backgroundColor: '#d32f2f'
        }}
      >
        <Typography variant='h1' mt='auto' color='#fff'>
          404
        </Typography>
        <Box mt='auto'>
          <Link href='/'>
            <a>
              <Typography
                mt='auto'
                variant='body1'
                sx={{textDecoration: 'underline'}}
                color='#fff'
              >
                Перейти на главную страницу
              </Typography>
            </a>
          </Link>
        </Box>
      </Stack>
    </Container>
  )
}

export default NotFound