import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document{
  render(): JSX.Element{
    return (
      <Html lang="es">
      <Head>
        <meta  charSet='utf-8'/>
        <meta name="description" content='GrowStyle'/>
      </Head>
      <body>
        <Main />
          <div id='menu'></div>
          <div id='login'></div>
          <div id='register'></div>
          <div id='favoritos'></div>
          <div id='cart'></div>
          <div id='popup'></div>
        <NextScript />
      </body>
      </Html>
    )
  }
}
  

