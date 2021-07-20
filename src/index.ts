import type { RumPublicApi } from '@datadog/browser-rum-core'

export { ErrorBoundary } from './ErrorBoundary'
export { RumRoute } from './Router'
export { BreadCrumbs, useRumError, useRumAction } from './BreadCrumbs'

declare global {
  interface Window {
    DD_RUM?: RumPublicApi & {
      startView?(name?: string): void;
    };
  }
}
