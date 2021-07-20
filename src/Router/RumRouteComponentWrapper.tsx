import { isValidElement, useRef } from 'react';
import type { RouteProps, RouteComponentProps } from 'react-router-dom';
import { getGlobalObject } from '../utils/getGlobalObject';

type RumRouteComponentType =
  | RouteProps['component']
  | RouteProps['children']
  | RouteProps['render'];

function isClassComponent(
  component: RumRouteComponentType
): component is React.ComponentClass {
  return (
    typeof component === 'function' && !!component.prototype?.isReactComponent
  );
}

function isFunctionComponent(
  component: RumRouteComponentType
): component is React.FunctionComponent<any> {
  return (
    typeof component === 'function' &&
    component.hasOwnProperty('props') &&
    isValidElement(component)
  );
}

function isReactRouterComponent(
  component: RumRouteComponentType
): component is RouteProps['component'] {
  return isClassComponent(component) || isFunctionComponent(component);
}

export const withRum = (component: RumRouteComponentType) =>
  function RumView(props: RouteComponentProps) {
    useRef(
      (() => {
        const globalObj = getGlobalObject<Window>();

        if (!globalObj.DD_RUM) {
          console.warn(
            '@datadog/rum-react-integration: Datadog RUM SDK is not initialized.'
          );
          return;
        }

        if (!globalObj.DD_RUM?.startView) {
          console.warn(
            '@datadog/rum-react-integration: Manual tracking not supported. Try updating the Datadog RUM SDK.'
          );
          return;
        }

        const manualTracking = !!globalObj.DD_RUM?.getInitConfiguration()
          ?.trackViewsManually;
        if (!manualTracking) {
          console.warn(
            '@datadog/rum-react-integration: The trackViewsManually flag in RUM initialization must be set to %ctrue%c.',
            'color:green',
            'color:default'
          );
          return;
        }

        globalObj.DD_RUM.startView(props.match.path);
      })()
    );

    if (!component) {
      return <>{component}</>;
    } else if (isReactRouterComponent(component)) {
      const Component = component;
      return <Component {...props} />;
    } else if (component instanceof Function) {
      return <>{component(props)}</>;
    }

    return <>{component}</>;
  };
