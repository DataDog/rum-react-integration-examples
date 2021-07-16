import { isValidElement, useState } from 'react';
import type { ReactElement } from 'react';
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

function getComponentName(component: RumRouteComponentType): string | null {
  let maybeComponentName = null;
  if (component && isReactRouterComponent(component)) {
    maybeComponentName = component.displayName;
  } else if (isFunctionComponent(component)) {
    maybeComponentName = component.name;
  } else if (isValidElement(component) && typeof component.type !== 'string') {
    maybeComponentName = component.type.name;
  }

  return maybeComponentName ?? null;
}

export const withRum = (component: RumRouteComponentType) =>
  function RumView(props: RouteComponentProps): ReactElement {
    // Makes the code run _before_ render, similar to a constructor in Class Components
    // Otherwise, all children startViews will be called before the parents
    useState(() => {
      const globalObj = getGlobalObject<Window>();
      if (globalObj.DD_RUM?.startView) {
        const maybeComponentName = getComponentName(component);

        if (maybeComponentName) {
          globalObj.DD_RUM.startView(maybeComponentName);
        }
      }
    });

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
