import { useContext } from 'react';

import { RumComponentContext } from './rum-component-context';
import { getGlobalObject } from '../utils/getGlobalObject';

/**
 * Utility to track actions in RUM with the component chain/breadcrumbs from <RumComponentContextProvider> automatically added
 *
 * add a "purpose" to the custom attributes to group the actions
 *
 *
 * @param purpose: explains the use case for the action, allows to split performance and user-tracking actions for example
 */
export const useRumAction = (
    purpose: string = 'unknown'
) => {
    const componentContext = useContext(RumComponentContext);
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
            ...componentContext.customAttributes,
            ...customAttributes,
            react: {
                breadcrumbs: componentContext.componentBreadCrumbs,
                component: componentContext.component,
                ...(customAttributes as any)?.react
            }
        });
    };
};
