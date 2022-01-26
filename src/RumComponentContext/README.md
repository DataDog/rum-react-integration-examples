# Datadog React RUM Component Context provider

## Overview

The RUM Component Context provider helps scoping the context of the RUM errors and actions.
Users can then define a specific context for each of their React component by naming it and passing it some attributes.

Once these contexts provided, any errors or actions generated within them will contain :
- a component breadcrumbs path generated form the parent context names
- Optional: some custom defined attributes

## Setup

1. Have Datadog RUM SDK up and running. [Instructions](https://github.com/DataDog/browser-sdk/blob/main/packages/rum/README.md);
2. Add this repository to your project with `yarn add https://github.com/DataDog/rum-react-integration`;
   + Optionally, you can copy the contents of this repo and adapt it to your needs.

## Usage

### Set the context your React components.

Wrap any React components in a `RumComponentContextProvider` or use the `WithRumComponentContext` component decorator and define their names and custom attributes.

### Generate RUM actions and errors using the custom React hook

Use the provided custom hooks `useRumAction` and `useRumError` and their callback functions to generate actions and errors

## Props

### RumComponentContextProvider

```
componentName: string
```
> Set the current breadcrumbs step

```
customAttributes?: object;
```
> Optional property that will populate a custom field for each of the errors and actions under this context

### WithRumComponentContext (React component decorator alternative)

```
componentName: string
```
> Set the current breadcrumbs step

```
options: { customAttributes?: object; } | undefined
```
> Optional property that will populate a custom field for each of the errors and actions under this context

```
Component: React.FunctionComponent
```
> Child component that will wrapped in the RumComponentContextProvider

## Example

### WithRumComponentContext

```
import { useRumError, useRumAction, WithRumComponentContext } from '@datadog/rum-react-integration';


const App = WithRumComponentContext("AppComponent", () => {
  const addAction = useRumAction("trackingAppAction");
  const addError = useRumError();

  return (
    <div className="App">
        <Button
            onClick={() => addError('new Error from root.AppComponent')}
        >
            Generate Error from root.AppComponent
        </Button>
        <Button
            onClick={() => addAction('new Action from root.AppComponent'}
        >
            Generate Action from root.AppComponent
        </Button>
    </div>
  );
})
```

### RumComponentContextProvider

```
import { useRumError, useRumAction, RumComponentContextProvider } from '@datadog/rum-react-integration';

export function App() {
  return (
    <div className="App">
    <RumComponentContextProvider componentName="AppComponent">
        <FnComponent />
    </RumComponentContextProvider>
    </div>
  );
}


function FnComponent() {
  const addAction = useRumAction("trackingAppAction");
  const addError = useRumError();

  return (
    <div className="FnComponent">
        <Button
            onClick={() => addError('new Error from root.AppComponent')}
        >
            Generate Error from root.AppComponent
        </Button>
        <Button
            onClick={() => addAction('new Action from root.AppComponent'}
        >
            Generate Action from root.AppComponent
        </Button>
    </div>
  );
}
```

## Expected Results
The usage of both `WithRumComponentContext` and `RumComponentContextProvider` will populate your RUM's [custom action events](https://docs.datadoghq.com/real_user_monitoring/guide/send-rum-custom-actions/) with the following fields:

`purpose: string`
A general category field that can be used to filter groups of actions.

`react: { breadcrumbs: string }`
A breadcrumb trail of `WithRumComponentContext` and `RumComponentContextProvider` componentName props, to give a better context for an Action event.

`react: { component: string }`
This is the current componentName available through the context provider. It should equal the last part of the breadcrumbs attribute