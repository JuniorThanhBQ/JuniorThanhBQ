import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './layout'
import { Home } from './features/home'
import { Blog, BlogPost } from './features/blog'
import { Contact } from './features/contact'
import { Developer } from './features/developer'
import { Project } from './features/project'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'blog',
        element: <Blog />,
      },
      {
        path: 'blog/:slug',
        element: <BlogPost />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'developer',
        element: <Developer />,
      },
      {
        path: 'project',
        element: <Project />,
      },
    ],
  },
])
