import "../scss/index.scss";
import "../MuiClassNameSetup";
import App, { AppProps } from "next/app";
import { Provider } from "react-redux";
import Cookie from "js-cookie";
import { wrapper } from "../store";
import SnackbarController from "../ui/SnackbarController";
import NavBar from "../components/NavBar";
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, PaletteMode } from "@mui/material";
import ColorModeProvider from "../ui/themes/ColorModeProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ruLocale from "date-fns/locale/ru";
import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { runInBrowser } from "../utils/ssr";
import { useRouter } from "next/router";
import FullpageLoader from "../ui/FullpageLoader";
import { IncomingMessage } from "http";
import { fetchSelf } from "../store/actions";
import { setMode } from "../store/reducers/uiSlice";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const MyApp = ({ Component, emotionCache = clientSideEmotionCache, ...rest }: MyAppProps) => {
    const { store, props } = wrapper.useWrappedStore(rest);
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);

    runInBrowser(() => {
        document.body.style.backgroundColor = store.getState().ui.mode === "dark" ? "#1e1e1e" : "#f0f0f0";
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
                            <Component {...props.pageProps} />
                        </ColorModeProvider>
                    </LocalizationProvider>
                </SnackbarController>
            </Provider>
        </CacheProvider>
    );
};

MyApp.getInitialProps = wrapper.getInitialAppProps(store => async context => {
    const request = context.ctx.req as IncomingMessage & {
        cookies: Partial<{
            [key: string]: string;
        }>;
    };
    const token = request.cookies?.token || Cookie.get("token");
    const mode: PaletteMode = (request.cookies?.mode as PaletteMode | undefined) || "dark";

    store.dispatch(setMode(mode));
    await store.dispatch(fetchSelf(token));

    return {
        pageProps: {
            ...(await App.getInitialProps(context)).pageProps,
            pathname: context.ctx.pathname,
        },
    };
});

export default MyApp;
