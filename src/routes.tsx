import * as React from 'react';

import { Redirect, RouteProps } from 'react-router-dom';

const Main = React.lazy(() => import('./pages/main'));
const Collaborator = React.lazy(() => import('./pages/collaborator'));
const ScoreChange = React.lazy(() => import('./pages/score-change'));
const Info = React.lazy(() => import('./pages/info'));

interface IRouteProps extends RouteProps {
  path: string;
}

const routes: IRouteProps[] = [
  {
    path: '/',
    exact: true,
    component: Main,
  },
  {
    path: '/collaborators/:id',
    exact: true,
    component: Collaborator,
  },
  {
    path: '/collaborators/:id/:counter',
    component: ScoreChange,
  },
  {
    path: '/info',
    component: Info,
  },
  {
    path: '*',
    component: () => <Redirect to="/" />,
  },
];

export default routes;
