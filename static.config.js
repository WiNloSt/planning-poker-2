import React from 'react'
import axios from 'axios'

export default {
  getSiteData: () => ({
    title: 'React Static'
  }),
  getRoutes: async () => {
    const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return [
      {
        path: '/',
        component: 'src/containers/Home'
      },
      {
        path: '/about',
        component: 'src/containers/About'
      },
      {
        path: '/blog',
        component: 'src/containers/Blog',
        getData: () => ({
          posts
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          component: 'src/containers/Post',
          getData: () => ({
            post
          })
        }))
      },
      {
        path: '/dashboard',
        component: 'src/containers/Dashboard'
      },
      {
        path: '/account',
        component: 'src/containers/Account'
      },
      {
        path: '/signin',
        component: 'src/containers/SignIn'
      },
      {
        path: '/signup',
        component: 'src/containers/SignUp'
      },
      {
        path: '/signout',
        component: 'src/containers/SignOut'
      },
      {
        path: '/forgotpw',
        component: 'src/containers/ForgotPassword'
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
