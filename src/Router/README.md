# Datadog RUM React Router Integration

## Overview
[Datadog Real User Monitoring](https://www.datadoghq.com/product/real-user-monitoring/) integration with React Router V5. With each route change, the RUM SDK automates the creation of a new RUM view with the route path as the view name. This improves the naming of your pages in the RUM product and results in simplified analysis.

| Default RUM names                                                                                                                                                     | React-Router integration                                                                                                                                                          |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ![default RUM view names)](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/jkuPxAbd/736233cf-b448-4b71-9cd1-52bb7183fc1c.png?v=d45828ff76ac00dec333aba5077781cb) | ![react router integration RUM view names)](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/yAurdJOW/8bacc9e5-5361-4836-9c85-ab8bb53ed40f.png?v=ab2dd75359a2cb3c16dc2c8c3a82493c) |

## Setup
1. [Set up RUM browser](https://docs.datadoghq.com/real_user_monitoring/browser/#setup).
2. Initialize RUM with `trackViewsManually: true`:
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    trackViewsManually: true,
    ...
});
```
3. Include this package in your project. (`yarn add https://github.com/DataDog/rum-react-integration`).
4. Replace all the occurences of `<Route />` with `<RumRoute />`.

**Note**: Without the change, existing react-router `<Route />` components do not trigger a new RUM view. Resources, actions and errors are still collected and attributed to the active RUM view.

## Importing the package
Import this package with the following command:
```javascript
import { RumRoute } from '@datadog/rum-react-integration';
```

Alternatively, you may want to use an alias:
```javascript
import { RumRoute as Route } from '@datadog/rum-react-integration';
```

## Props
The `<Route \>` component inherits the same props available on the original react-router `<Route \>` component. Find more details in the [official react-router documentation](https://reactrouter.com/web/api/Route).

## Usage example
```jsx
import "./App.css";
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { RumRoute } from '@Datadog/rum-react-integration';
import { About } from './About';
import { Menu } from './Menu';
import { Gallery } from './Gallery';
export function App() {
  return (
    <div className="App">
      <Router>
        <Menu />
        <RumRoute path="/">
          <Home />
        </RumRoute>
        <RumRoute path="/gallery/:title">
          <Gallery />
        </RumRoute>
        <RumRoute path="/about">
          <About />
        </RumRoute>
      </Router>
    </div>
  );
}
```

### Notes on `trackViewsManually`
By default, the RUM SDK automatically tracks page changes using the History API. `trackViewsManually` ensures you are delegating the responsibility of creating new RUM views to the router only. Not setting `trackViewsManually` results in most RUM views appearing twice.

### Notes on `React.StrictMode`
If you are using [React.StrictMode](https://reactjs.org/docs/strict-mode.html), RUM views get duplicated **only in development mode, not in production mode**. This is due to [lifecycles being double invoked](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects).