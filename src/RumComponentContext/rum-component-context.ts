import React from 'react';

export interface ComponentContext {
    /**
     * list of all parent components, separated by .
     */
    componentBreadCrumbs: string;
    /**
     * last parent component, used in the use-rum-action hook to name the action
     */
    component: string;
    /**
     * custom attributes passed to all actions under this context
     */
    customAttributes?: object;
}

export const RumComponentContext = React.createContext<ComponentContext>({
    componentBreadCrumbs: 'root',
    component: 'root'
});
