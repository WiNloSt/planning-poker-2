import React from 'react'

export default {
  plugins: ['react-static-plugin-styled-components'],
  getRoutes: () => {
    return [
      {
        path: '/',
        component: 'src/containers/Home'
      },
      {
        path: '/result',
        component: 'src/containers/Result'
      },
      {
        path: '/signin',
        component: 'src/containers/SignIn'
      },
      {
        is404: true,
        component: 'src/containers/404'
      }
    ]
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
