import '../styles/globals.css'
import type { AppInitialProps, AppProps } from 'next/app'
import { AppStore, wrapper } from '../redux/store'
import NextNProgress from "nextjs-progressbar"
import { getMeThunk } from '../redux/thunks/auth'
import { parseCookies } from 'nookies'
import App from 'next/app'



class MyApp extends App<AppInitialProps> {

  public static getInitialProps = wrapper.getInitialAppProps((store: AppStore) => async context => {


    const dispatch = store.dispatch;
    const { musicToken } = parseCookies(context.ctx)
    await dispatch(getMeThunk(musicToken)) 

    return {
      pageProps: {
        ...(await App.getInitialProps(context)).pageProps,
      },
    };

  });

  public render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <NextNProgress
          color="rgb(30, 215, 96)"
          startPosition={0.3}
          stopDelayMs={200}
          height={4}
          showOnShallow={true}
        />
        <Component {...pageProps} />
      </>
    );
  }
}

export default wrapper.withRedux(MyApp);
