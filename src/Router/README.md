# Datadog RUM React Router Integration

## Overview
React Router v5 Integration to report routes matched path as views

## Setup
1. Have Datadog RUM SDK up and running. [Instructions](https://github.com/DataDog/browser-sdk/blob/main/packages/rum/README.md);
2. In your RUM SDK initialization (`DD_RUM.init` calls), pass `trackViewsManually: true`; 
3. Add this repository to your project with `yarn add https://github.com/DataDog/rum-react-integration`;
4. Replace the necessary `<Route />` usage by `<RumRoute />`. You can mix original React-Router's `<Route />` with `<RumRoute />` to track only the desired paths.

## Import Options    
You can import with:
```
import { RumRoute } from '@datadog/rum-react-integration';
```

Or use an alias for React Router's `<Route />` with:
```
import { RumRoute as Route } from '@datadog/rum-react-integration';
```

## Props
It inherits the same props available to the original React-Router's `<Route>` component. As seen [here](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-router/index.d.ts#L86). Further examples can be found [here](https://reactrouter.com/web/api/Route).

## Usage example
```
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
    <Router>
      <div className="App">
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
      </div>
    </Router>
  );
}
```

### Notes on `trackViewsManually`
While this is not mandatory to use this package, it is highly recommended to do so, since views that are automatically tracked will *also* be reported whenever there's a view change. Disabling it makes `<RumRoute />` control the tracking of views by itself.

### Notes on `React.StrictMode`
Using React.StrictMode will cause doubled logs appearing in Datadog's RUM Explorer. While it doesn't affect production builds, it can be particularly annoying and misleading while working on new features or debugging. 

We recommend including a [context attribute](https://docs.datadoghq.com/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#global-context) in development sessions in order to exclude these from real users data, or avoid initializing the SDK while in development mode.

Read more about React.StrictMode [here](https://reactjs.org/docs/strict-mode.html)

## Expected Results
Your views `@view.name` facets will be populated with [React Routers paths patterns](https://reactrouter.com/web/api/Route/path-string-string), instead of Datadog RUM's automatic [url_path_group](https://reactrouter.com/web/api/Route/path-string-string) assumptions.