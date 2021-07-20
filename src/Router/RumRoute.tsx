import { useMemo } from 'react';
import { Route } from 'react-router-dom';
import type { RouteProps } from 'react-router-dom';

import { withRum } from './RumRouteComponentWrapper';

type RumRouteProps = RouteProps;

export const RumRoute = ({
  children,
  component,
  render,
  ...otherProps
}: RumRouteProps) => {
  const RumComponent = useMemo(() => {
    // this is react-router priority
    return withRum(children ?? component ?? render, otherProps.path);
  }, [children, component, render]);

  return <Route {...otherProps} component={RumComponent} />;
};
