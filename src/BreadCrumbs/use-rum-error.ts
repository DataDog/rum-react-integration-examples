import { useContext } from 'react';

import { RumActionContext } from './rum-action-context';
import { getGlobalObject } from '../utils/getGlobalObject';

/**
 * Utility to track errors in RUM with the component chain/breadcrumbs from <RumActionContextProvider> automatically added
 *
 * {@link https://datadoghq.atlassian.net/wiki/spaces/FRON/pages/1832059156/User+Action+Tracking|User Action Tracking Documentation}
 */
export const useRumError = () => {
    const actionContext = useContext(RumActionContext);
    const RumGlobal = getGlobalObject<Window>().DD_RUM

    if (!RumGlobal) {
        return () => {};
    }

    return (error: unknown, customAttributes: object | undefined, source: "custom" | "network" | "source" | undefined) => {
        RumGlobal.addError(
            error,
            {
                ...actionContext.customAttributes,
                ...customAttributes,
                react: {
                    breadcrumbs: actionContext.componentBreadCrumbs,
                    component: actionContext.component,
                    ...(customAttributes as any)?.react
                }
            },
            source
        );
    };
};
