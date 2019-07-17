import { lazy } from 'react'
import { RouteProps } from 'react-router'

export interface IBaseRoutes extends RouteProps {
  path: string
}

export interface IRoutes extends IBaseRoutes {
  title: string
}

const routes: IRoutes[] = [
  {
    path: '/',
    title: '首页',
    name: 'Home/index',
  },
  {
    path: '*',
    title: '404',
    name: 'NotFound',
  },
].map(({ name, ...rest }) => ({ ...rest, component: lazy(() => import(`../pages/${name}`)) }))

export default routes
