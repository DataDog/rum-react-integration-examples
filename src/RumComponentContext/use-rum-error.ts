import { useContext } from 'react';

import { RumComponentContext } from './rum-component-context';
import { getGlobalObject } from '../utils/getGlobalObject';

/**
 * Utility to track errors in RUM with the component chain/breadcrumbs from <RumComponentContextProvider> automatically added
 *
 */
export const useRumError = () => {
    const componentContext = useContext(RumComponentContext);
    const RumGlobal = getGlobalObject<Window>().DD_RUM

    if (!RumGlobal) {
        console.warn(
            '@datadog/rum-react-integration: Datadog RUM SDK is not initialized.'
        );
        return () => {};
    }

    return (error: unknown, customAttributes: object | undefined, source: "custom" | "network" | "source" | undefined) => {
        RumGlobal.addError(
            error,
            {
                ...componentContext.customAttributes,
                ...customAttributes,
                react: {
                    breadcrumbs: componentContext.componentBreadCrumbs,
                    component: componentContext.component,
                    ...(customAttributes as any)?.react
                }
            },
            source
        );
    };
};
