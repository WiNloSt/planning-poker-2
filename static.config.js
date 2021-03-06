import React from 'react'
import { ServerStyleSheet } from 'styled-components'

export default {
  getRoutes: () => {
    return [
      {
        path: '/',
        component: 'src/pages/Home'
      },
      {
        path: '/result',
        component: 'src/pages/Result'
      },
      {
        path: '/signin',
        component: 'src/pages/SignIn'
      },
      {
        is404: true,
        component: 'src/pages/404'
      }
    ]
  },
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  // eslint-disable-next-line react/prop-types
  Document: ({ Html, Head, Body, children, renderMeta }) => (
    <Html>
      <Head>
        <title>Planning Poker</title>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"
        />
        {renderMeta.styleTags}
      </Head>
      <Body>
        {children}
        <link rel="stylesheet" href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css" />
      </Body>
    </Html>
  )
}
