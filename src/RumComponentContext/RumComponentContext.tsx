import React, { useContext, useMemo } from 'react';

import type { ComponentContext } from './rum-component-context';
import { RumComponentContext} from './rum-component-context';

/**
 * Context Provider to add a new component to the action breadcrumbs. Useful for class Components.
 */
export const RumComponentContextProvider: React.FunctionComponent<{
    componentName: string;
    customAttributes?: object;
}> = ({
    componentName,
    customAttributes,
    children
}) => {
    const parentContext = useContext(RumComponentContext);
    const newContext = useMemo<ComponentContext>(
        () => ({
            component: componentName,
            customAttributes: {
                ...parentContext.customAttributes,
                ...customAttributes
            },
            componentBreadCrumbs: `${parentContext.componentBreadCrumbs}.${componentName}`
        }),
        [
            componentName,
            parentContext.componentBreadCrumbs,
            parentContext.customAttributes,
            customAttributes
        ]
    );
    return (
        <RumComponentContext.Provider value={newContext}>
            {children}
        </RumComponentContext.Provider>
    );
};
/**
 * Decorator to add a new component to the breadcrumbs when using useRumAction or useRumTracking action hooks
 * the decorator is better than a just component because it will add the context to everything in your component
 */
export function WithRumComponentContext<PropsType>(
    componentName: string,
    options:
        | {
              customAttributes?: object;
          }
        | undefined,
    Component: React.FunctionComponent<PropsType>
): React.FunctionComponent<PropsType>;
export function WithRumComponentContext<PropsType>(
    componentName: string,
    Component: React.FunctionComponent<PropsType>
): React.FunctionComponent<PropsType>;
export function WithRumComponentContext<PropsType>(
    componentName: string,
    options: any,
    Component?: React.FunctionComponent<PropsType>
): React.FunctionComponent<PropsType> {
    if (typeof Component === 'undefined') {
        return WithRumComponentContext(componentName, {}, options);
    }
    return (props: PropsType) => {
        return (
            <RumComponentContextProvider
                componentName={componentName}
                customAttributes={options.customAttributes}
            >
                <Component {...props} />
            </RumComponentContextProvider>
        );
    };
}
