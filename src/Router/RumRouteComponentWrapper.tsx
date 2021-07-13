import * as React from 'react';
import type { RouteProps, RouteComponentProps } from 'react-router-dom';

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
    React.isValidElement(component)
  );
}

function isReactRouterComponent(
  component: RumRouteComponentType
): component is RouteProps['component'] {
  return isClassComponent(component) || isFunctionComponent(component);
}

function isElement(
  element: RumRouteComponentType
): element is React.ReactElement<any> {
  return React.isValidElement(element);
}

function isDOMTypeElement(
  element: RumRouteComponentType
): element is HTMLElement {
  return isElement(element) && typeof element.type === 'string';
}

function getComponentName(component: RumRouteComponentType): string | null {
  let maybeComponentName = null;
  if (component && isReactRouterComponent(component)) {
    maybeComponentName = component.displayName;
  } else if (isFunctionComponent(component)) {
    maybeComponentName = component.name;
  } else if (
    React.isValidElement(component) &&
    typeof component.type !== 'string'
  ) {
    maybeComponentName = component.type.name;
  }

  return maybeComponentName ?? null;
}

export const withRum = (component: RumRouteComponentType) =>
  component
    ? (props: RouteComponentProps): React.ReactNode => {
        // Makes the code run _before_ render, similar to a constructor in Class Components
        // Otherwise, all children startViews will be called before the parents
        React.useRef(
          (() => {
            if (window.DD_RUM?.startView) {
              const maybeComponentName = getComponentName(component);

              if (maybeComponentName) {
                window.DD_RUM.startView(maybeComponentName);
              }
            }
          })()
        );

        if (isReactRouterComponent(component)) {
          const Component = component;
          return <Component {...props} />;
        } else if (component instanceof Function) {
          return component(props);
        }

        return component;
      }
    : component;
