import * as React from 'react';

import { Redirect, RouteProps } from 'react-router-dom';

const Main = React.lazy(() => import('./pages/main'));
const Collaborator = React.lazy(() => import('./pages/collaborator'));
const ScoreChange = React.lazy(() => import('./pages/score-change'));
const Info = React.lazy(() => import('./pages/info'));

interface IRouteProps extends RouteProps {
  path: string;
  _component: React.ElementType;
}

const routes: IRouteProps[] = [
  {
    path: '/',
    exact: true,
    _component: Main,
  },
  {
    path: '/collaborators/:id',
    exact: true,
    _component: Collaborator,
  },
  {
    path: '/collaborators/:id/:counter',
    _component: ScoreChange,
  },
  {
    path: '/info',
    _component: Info,
  },
  {
    path: '*',
    _component: () => <Redirect to="/" />,
  },
];

export default routes;
