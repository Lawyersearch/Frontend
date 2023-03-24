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
import { runInBrowser } from "../utils/ssr";
import { useRouter } from "next/router";
import FullpageLoader from "../ui/FullpageLoader";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const MyApp = ({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) => {
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);

    runInBrowser(() => {
        document.body.style.backgroundColor = localStorage.getItem("mode") === "dark" ? "#1e1e1e" : "#f0f0f0";
    });

    useEffect(() => {
        router.events.on("routeChangeStart", () => setIsLoaded(false));
        router.events.on("routeChangeComplete", () => setIsLoaded(true));
        setIsLoaded(true);
    }, []);

    return (
        <CacheProvider value={emotionCache}>
            <Provider store={store}>
                <SnackbarController>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
                        {!isLoaded && <FullpageLoader />}
                        <ColorModeProvider>
                            <NavBar />
                            <CssBaseline />
                            <Component {...pageProps} />
                        </ColorModeProvider>
                    </LocalizationProvider>
                </SnackbarController>
            </Provider>
        </CacheProvider>
    );
};

export default MyApp;
