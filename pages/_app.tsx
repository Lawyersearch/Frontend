import "../scss/index.scss";
import "../MuiClassNameSetup";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import SnackbarController from "../ui/SnackbarController";
import NavBar from "../components/NavBar";
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CircularProgress, CssBaseline } from "@mui/material";
import ColorModeProvider from "../ui/themes/ColorModeProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ruLocale from "date-fns/locale/ru";
import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <SnackbarController>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ruLocale}
          >
            {isMounted ? (
              <ColorModeProvider>
                <NavBar />
                <CssBaseline />
                <Component {...pageProps} />
              </ColorModeProvider>
            ) : (
              <CircularProgress
                size={100}
                sx={{
                  mt: "calc(50vh - 90px)",
                  ml: "calc(50vw - 50px)",
                  color: "#ff9100",
                }}
              />
            )}
          </LocalizationProvider>
        </SnackbarController>
      </Provider>
    </CacheProvider>
  );
}

export default MyApp;
