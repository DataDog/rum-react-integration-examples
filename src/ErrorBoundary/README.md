# Datadog RUM React Error Boundary

## Overview
Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Learn more in the [official React documentation](https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries).
In addition to displaying a fallback UI, this implementation sends the error to [Datadog Real User Monitoring](https://www.datadoghq.com/product/real-user-monitoring/) with all the error context.

![RUM explorer error displayed in side panel](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/X6uAZR8R/181f1e93-8d52-4cdb-a22c-161934054859.png?v=92d481baf3bd9c1538f1816cadca3488)

## Setup
1. [Set up RUM browser](https://docs.datadoghq.com/real_user_monitoring/browser/#setup).
2. Wrap React components with the `<ErrorBoundary />` component to start collecting more detailed errors.

## Props
`fallback: React.ReactNode | (error: Error) => React.ReactNode`
> (required) This render method is called when an exception is thrown within the ErrorBoundary. It receives the Error instance that triggered it.

## Usage example

```jsx
import "./App.css";

import { ErrorBoundary } from '@Datadog/rum-react-integration';

import { Gallery } from './Gallery';

export function App() {
  return (
    <div className="App">
        <Menu />
        <ErrorBoundary
            fallback={(error) => <div>Houston we've got a problem with the gallery: {error.message}</div>}
        >
            <Gallery />
        </ErrorBoundary>
    </div>
  );
}
```