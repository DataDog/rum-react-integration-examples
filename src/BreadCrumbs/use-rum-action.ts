import { useContext } from 'react';

import { RumActionContext } from './rum-action-context';
import { getGlobalObject } from '../utils/getGlobalObject';

/**
 * Utility to track actions in RUM with the component chain/breadcrumbs from <RumActionContextProvider> automatically added
 *
 * add a "purpose" to the custom attributes to group the actions
 *
 *
 * @param purpose: explains the use case for the action, allows to split performance and user-tracking actions for example
 */
export const useRumAction = (
    purpose: string = 'unknown'
) => {
    const actionContext = useContext(RumActionContext);
    const RumGlobal = getGlobalObject<Window>().DD_RUM

    if (!RumGlobal) {
        console.warn(
            '@datadog/rum-react-integration: Datadog RUM SDK is not initialized.'
        );
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
