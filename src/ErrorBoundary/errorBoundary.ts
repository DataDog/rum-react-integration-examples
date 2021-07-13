import React from 'react'

import { getGlobalObject } from '@datadog/browser-core'

interface InfoType {
  componentStack: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  prevScope: string
}

export interface ErrorBoundaryProps {
  render: (errorMessage: string, error: Error) => React.ReactNode
  errorMessage: string
  scope?: string
}

/**
 * ErrorBoundary component sends enriched errors to RUM.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static defaultProps = {
    scope: 'error-boundary',
  }

  constructor(props: any) {
    super(props)
    this.state = { hasError: false, prevScope: props.scope }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  static getDerivedStateFromProps(props: ErrorBoundaryProps, state: ErrorBoundaryState) {
    if (state.prevScope !== props.scope) {
      return {
        hasError: false,
        error: undefined,
        prevScope: props.scope,
      }
    }

    return state
  }

  componentDidCatch(error: Error, info: InfoType) {
    const RumGlobal = getGlobalObject<Window>().DD_RUM
    if (RumGlobal) {
      RumGlobal.addError(error, info)
    }
  }

  render() {
    const { hasError, error } = this.state
    const { errorMessage, render } = this.props

    if (!hasError || !error) {
      return this.props.children
    }

    return render(errorMessage, error)
  }
}
