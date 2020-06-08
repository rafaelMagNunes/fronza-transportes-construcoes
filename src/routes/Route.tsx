import React from 'react';
import {
  Route as ReactDOMRoute,
  Redirect,
  RouteProps as ReactDOMRouteProps,
} from 'react-router-dom';

import DefaultLayout from '../pages/_layouts/Default';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        // eslint-disable-next-line no-nested-ternary
        return isPrivate === !!user ? (
          location.pathname === '/' ? (
            <Component />
          ) : (
            <DefaultLayout location={location.pathname}>
              <Component />
            </DefaultLayout>
          )
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/home',
            }}
          />
        );
      }}
    />
  );
};

export default Route;
