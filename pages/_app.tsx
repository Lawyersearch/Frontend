import '../scss/index.scss'
import '../MuiClassNameSetup'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from "../store";
import SnackbarController from "../ui/SnackbarController";
import NavBar from "../components/NavBar";
import createEmotionCache from "../utils/createEmotionCache";
import {CacheProvider, EmotionCache} from "@emotion/react";
import {CircularProgress, CssBaseline} from "@mui/material";
import ColorModeProvider from "../ui/themes/ColorModeProvider";
import {useEffect, useState} from "react";

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(()=>{
    setIsMounted(true)
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <SnackbarController>
        {isMounted
          ? (<ColorModeProvider>
              <NavBar />
              <CssBaseline />
                <Component {...pageProps} />
          </ColorModeProvider>)
          : <CircularProgress
            size={100}
            sx={{
              mt: 'calc(50vh - 90px)',
              ml: 'calc(50vw - 50px)',
              color: '#ff9100'
            }}
          /> }
        </SnackbarController>
      </Provider>
    </CacheProvider>
  )
}

export default MyApp
