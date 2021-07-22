# Datadog RUM React Error Boundary

## Overview
Error boundary ensure that your errors stay scoped in it, not breaking the full React tree in case of error. For every error caught, an [`Error`](https://docs.datadoghq.com/real_user_monitoring/#error-tracking-and-crash-reporting) event will be sent to your Datadog dashboards and RUM Explorer.

## Setup
1. Have Datadog RUM SDK up and running. [Instructions](https://github.com/DataDog/browser-sdk/blob/main/packages/rum/README.md);
2. Add this repository to your project with `yarn add https://github.com/DataDog/rum-react-integration`;

## Usage
Import this utility with:
```
import { ErrorBoundary } from '@datadog/rum-react-integration';
```

Components that are expected to [throw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw) an [error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) can be wrapped with ErrorBoundary to avoid crashing the rest of application.

## Props
`renderError: (errorMessage: string, error: Error) => React.ReactNode`
> The render method called when an exception is thrown within the ErrorBoundary. It receives the same errorMessage prop and the thrown error

`errorMessage: string`
> The message that will be displayed instead of the original children content when an error occurs. 

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
            renderError={(errorMessage) => <h1>{errorMessage}</h1>}
            errorMessage="Houston we've got a problem"
        >
            <Gallery />
        </ErrorBoundary>
    </div>
  );
}
```