# Datadog RUM React Router Integration

## Overview
React Router v5 Integration to report routes matched path as views

### Setup
1. Have Datadog RUM SDK up and running. [Instructions](https://github.com/DataDog/browser-sdk/blob/main/packages/rum/README.md);
2. In your RUM SDK initialization (`DD_RUM.init` calls), pass `trackViewsManually: true`; 
3. Add this repository to your project with `yarn add https://github.com/DataDog/rum-react-integration`;
4. Replace the necessary `<Route />` usage by `<RumRoute />`. You can mix original React-Router's `<Route />` with `<RumRoute />` to track only the desired paths.

### Import Options    
You can import with:
```
import { RumRoute } from '@datadog/rum-react-integration';
```

Or use an alias for React Router's `<Route />` with:
```
import { RumRoute as Route } from '@datadog/rum-react-integration';
```

### Notes on `trackViewsManually`
While this is not mandatory to use this package, it is highly recommended to do so, since views that are automatically tracked will *also* be reported whenever there's a view change. Disabling it makes `<RumRoute />` control the tracking of views by itself.

### Notes on `React.StrictMode`
Using React.StrictMode will cause doubled logs appearing in Datadog's RUM Explorer. While it doesn't affect production builds, it can be particularly annoying and misleading while working on new features or debugging. 

We recommend including a [context attribute](https://docs.datadoghq.com/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#global-context) in development sessions in order to exclude these from real users data, or avoid initializing the SDK while in development mode.

Read more about React.StrictMode [here](https://reactjs.org/docs/strict-mode.html)