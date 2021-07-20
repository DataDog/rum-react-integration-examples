import { useContext } from 'react';

import { RumActionContext } from './rum-action-context';
import { getGlobalObject } from '../utils/getGlobalObject';

type RumActionPurpose = 'unknown' | 'user-tracking' | 'performance';
/**
 * Utility to track actions in RUM with the component chain/breadcrumbs from <RumActionContextProvider> automatically added
 *
 * add a "purpose" to the custom attributes to group the actions
 *
 * {@link https://datadoghq.atlassian.net/wiki/spaces/FRON/pages/1832059156/User+Action+Tracking|User Action Tracking Documentation}
 *
 * @param purpose: explains the use case for the action, allows to split performance and user-tracking actions for example
 */
export const useRumAction = (
    purpose: RumActionPurpose = 'unknown'
) => {
    const actionContext = useContext(RumActionContext);
    const RumGlobal = getGlobalObject<Window>().DD_RUM

    if (!RumGlobal) {
        return () => {};
    }

    return (name: string, customAttributes?: object) => {
        RumGlobal.addAction(name, {
            purpose,
            ...actionContext.customAttributes,
            ...customAttributes,
            react: {
                breadcrumbs: actionContext.componentBreadCrumbs,
                component: actionContext.component,
                ...(customAttributes as any)?.react
            }
        });
    };
};

type RumUserInteraction = 'hover' | 'click' | 'valueChange' | 'toggle';
/**
 * Utility to easily track user interactions and do behavior analytics
 *
 * context.purpose is used to mark those actions as 'user-tracking' to easily find them in the RUM explorer
 *
 * {@link https://datadoghq.atlassian.net/wiki/spaces/FRON/pages/1832059156/User+Action+Tracking|User Action Tracking Documentation}
 */
export const useRumTrackingAction = () => {
    const addAction = useRumAction('user-tracking');
    const actionContext = useContext(RumActionContext);
    /**
     * @param element - describes the html element targeted inside the component
     * @param interaction - type of user action we want to track
     * @param elementInfo - generic facets to make it easier to compare actions (like googe analytics events) - label & value
     * @param customTrackingAttributes - any additional attributes we want to track with the action, will be prefixed by tracking for easier management in RUM
     */
    return (
        element: string,
        interaction: RumUserInteraction,
        elementInfo?: {
            label?: string;
            value?: string | number;
        },
        customTrackingAttributes?: object
    ) => {
        addAction(`${actionContext.component}__${element}--${interaction}`, {
            purpose: 'user-tracking',
            react: {
                element
            },
            interaction,
            tracking: Object.assign(
                {},
                elementInfo
                    ? {
                          label: elementInfo.label,
                          value: elementInfo.value
                      }
                    : {},
                actionContext.customTrackingAttributes,
                customTrackingAttributes
            )
        });
    };
};
