import { ReactNode, Component, isValidElement } from 'react';

import { getGlobalObject } from '../utils/getGlobalObject';

type FallbackRenderer = (error: Error) => React.ReactNode;

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  prevScope: string;
}

export interface ErrorBoundaryProps {
  fallback: ReactNode | FallbackRenderer;
  scope?: string;
}

/**
 * ErrorBoundary component sends enriched errors to RUM.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static defaultProps = {
    scope: 'error-boundary',
  };

  constructor(props: any) {
    super(props);
    this.state = { hasError: false, prevScope: props.scope };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  static getDerivedStateFromProps(
    props: ErrorBoundaryProps,
    state: ErrorBoundaryState
  ) {
    if (state.prevScope !== props.scope) {
      return {
        hasError: false,
        error: undefined,
        prevScope: props.scope,
      };
    }

    return state;
  }

  componentDidCatch(error: Error) {
    const RumGlobal = getGlobalObject<Window>().DD_RUM;
    if (RumGlobal) {
      RumGlobal.addError(
        error,
        {
          scope: this.props.scope,
        },
        'source'
      );
    }
  }

  render() {
    const { hasError, error } = this.state;
    const { fallback } = this.props;

    if (!hasError || !error) {
      return this.props.children;
    }

    if (isValidElement(fallback) || typeof fallback === 'string') {
      return fallback;
    } else if (typeof fallback === 'function') {
      return fallback(error);
    }

    return null;
  }
}
