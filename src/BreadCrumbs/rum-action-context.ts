import React from 'react';

export interface ActionContext {
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
    /**
     * custom attributes passed to all tracking actions under this context
     */
    customTrackingAttributes?: object;
}

export const RumActionContext = React.createContext<ActionContext>({
    componentBreadCrumbs: 'root',
    component: 'root'
});
