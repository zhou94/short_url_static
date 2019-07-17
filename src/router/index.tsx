import React, { Suspense, Component } from 'react'
import { Switch, BrowserRouter, Route, Redirect, RouteComponentProps, withRouter } from 'react-router-dom'
import Routes, { IRoutes, IBaseRoutes } from './routes'
import { Spin } from 'antd'
function Router() {
  return (
    <Suspense fallback={<Spin className="center"/>}>
      <BrowserRouter>
        <Switch>
        {
          Routes.map((route: IRoutes) => {
            const { title: _, ...rest } = route
            return <Route key={rest.path} {...rest} />
          })
        }
        </Switch>
      </BrowserRouter>
    </Suspense>
  )
}

export default Router
