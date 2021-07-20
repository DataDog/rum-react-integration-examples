import React, { useContext, useMemo } from 'react';

import type { ActionContext } from './rum-action-context';
import { RumActionContext } from './rum-action-context';

/**
 * Context Provider to add a new component to the action breadcrumbs. Useful for class Components.
 */
export const RumActionContextProvider: React.FunctionComponent<{
    componentName: string;
    customAttributes?: object;
    customTrackingAttributes?: object;
}> = ({
    componentName,
    customAttributes,
    customTrackingAttributes,
    children
}) => {
    const parentContext = useContext(RumActionContext);
    const newContext = useMemo<ActionContext>(
        () => ({
            component: componentName,
            customAttributes: {
                ...parentContext.customAttributes,
                ...customAttributes
            },
            customTrackingAttributes: {
                ...parentContext.customTrackingAttributes,
                ...customTrackingAttributes
            },
            componentBreadCrumbs: `${parentContext.componentBreadCrumbs}.${componentName}`
        }),
        [
            componentName,
            parentContext.componentBreadCrumbs,
            parentContext.customAttributes,
            parentContext.customTrackingAttributes,
            customAttributes,
            customTrackingAttributes
        ]
    );
    return (
        <RumActionContext.Provider value={newContext}>
            {children}
        </RumActionContext.Provider>
    );
};
/**
 * Decorator to add a new component to the action breadcrumbs when using useRumAction or useRumTracking action hooks
 * the decorator is better than a just component because it will add the context to everything in your component
 */
export function BreadCrumbs<PropsType>(
    componentName: string,
    options:
        | {
              customAttributes?: object;
              customTrackingAttributes?: object;
          }
        | undefined,
    Component: React.FunctionComponent<PropsType>
): React.FunctionComponent<PropsType>;
export function BreadCrumbs<PropsType>(
    componentName: string,
    Component: React.FunctionComponent<PropsType>
): React.FunctionComponent<PropsType>;
export function BreadCrumbs<PropsType>(
    componentName: string,
    options: any,
    Component?: React.FunctionComponent<PropsType>
): React.FunctionComponent<PropsType> {
    if (typeof Component === 'undefined') {
        return BreadCrumbs(componentName, {}, options);
    }
    return (props: PropsType) => {
        return (
            <RumActionContextProvider
                componentName={componentName}
                customAttributes={options.customAttributes}
                customTrackingAttributes={options.customTrackingAttributes}
            >
                <Component {...props} />
            </RumActionContextProvider>
        );
    };
}
