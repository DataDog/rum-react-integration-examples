# Datadog RUM React Error Boundary

## Overview
Error boundary ensure that your errors stay scoped in it, not breaking the full React tree in case of error. For every error caught, an [`Error`](https://docs.datadoghq.com/real_user_monitoring/#error-tracking-and-crash-reporting) event will be sent to your Datadog dashboards and RUM Explorer.

## Setup
1. Have Datadog RUM SDK up and running. [Instructions](https://github.com/DataDog/browser-sdk/blob/main/packages/rum/README.md);
2. Add this repository to your project with `yarn add https://github.com/DataDog/rum-react-integration-examples`;
   + Optionally, you can copy the contents of this repo and adapt it to your needs.

## Usage
Import this utility with:
```
import { ErrorBoundary } from '@datadog/rum-react-integration';
```

Components that are expected to [throw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw) an [error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) can be wrapped with ErrorBoundary to avoid crashing the rest of application.

## Props
`fallback: React.ReactNode | (error: Error) => React.ReactNode`
> The render method called when an exception is thrown within the ErrorBoundary. It receives the Error instance that triggered it.

`scope?: string`
> An optional [context](https://docs.datadoghq.com/real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually) string sent to Datadog in order to easily filter or group the thrown Errors.

## Example

```
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

## Expected results
Your errors will appear in Datadog's Dashboards and RUM Explorer, as they would appear by using [`addError`](https://docs.datadoghq.com/real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually). The wrapped UI in your application is expected to not crash, display any console errors, or not show any ominous error messages.