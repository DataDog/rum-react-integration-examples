import { RumRoute } from './RumRoute';
import { Router, Redirect, Route } from 'react-router-dom';
import type { RouteProps } from 'react-router-dom';

import { createMemoryHistory } from 'history';
import { getGlobalObject } from '../utils/getGlobalObject';
import { render, screen } from '@testing-library/react';
import { Component } from 'react';

const history = createMemoryHistory();

const defaultProps: RouteProps = {};

const globalObj = getGlobalObject<Window>();

describe('<RumRoute />', () => {
  const buildSubject = (props = defaultProps) => {
    render(
      <Router history={history}>
        <Redirect from="/" to="/home" />
        <RumRoute path="/home">Home is where the heart is</RumRoute>
        <RumRoute path="/thread/:threadId">
          Here's some relevant info regarding planks and rope skipping
          <RumRoute path="/thread/:threadId/comment/:commentId">Nice</RumRoute>
        </RumRoute>
        <Route path="/about">
          <RumRoute path="/about/history">Last edited: yesterday</RumRoute>
        </Route>
        <RumRoute path="/rumRoute" {...props} />
        <div>Footer</div>
      </Router>
    );
  };

  beforeEach(() => {
    globalObj.DD_RUM = {
      getInitConfiguration: () => ({ trackViewsManually: true }),
      startView: () => {},
    } as any;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('startView calls', () => {
    it('should be able call RUM startView through router redirect', () => {
      jest.spyOn(globalObj.DD_RUM!, 'startView');
      buildSubject();

      screen.getByText(/Home is where the heart is/i);

      expect(globalObj.DD_RUM?.startView).toHaveBeenCalledTimes(1);
      expect(globalObj.DD_RUM?.startView).toHaveBeenLastCalledWith('/home');
    });

    it('should call RUM startView through nested routes', () => {
      buildSubject();

      jest.spyOn(globalObj.DD_RUM!, 'startView');
      history.push('/thread/10/comment/20');

      screen.getByText(/Nice/i);

      expect(globalObj.DD_RUM?.startView).toHaveBeenNthCalledWith(
        1,
        '/thread/:threadId'
      );
      expect(globalObj.DD_RUM?.startView).toHaveBeenNthCalledWith(
        2,
        '/thread/:threadId/comment/:commentId'
      );
    });

    it('should call RUM startView when combining Route and RumRoute ', () => {
      buildSubject();

      jest.spyOn(globalObj.DD_RUM!, 'startView');
      history.push('/about/history');

      screen.getByText(/Last edited: yesterday/i);

      expect(globalObj.DD_RUM?.startView).toHaveBeenNthCalledWith(
        1,
        '/about/history'
      );
      expect(globalObj.DD_RUM?.startView).not.toHaveBeenCalledWith('/about');
    });
  });

  describe('ReactRouter children rendering', () => {
    it('should render strings', () => {
      buildSubject({ children: 'This is a string' });
      history.push('/rumRoute');

      screen.getByText(/This is a string/i);
    });

    it('should render JSX', () => {
      buildSubject({
        children: <div>This is a JSX children</div>,
      });
      history.push('/rumRoute');

      screen.getByText(/This is a JSX children/i);
    });

    it('should render a React element', () => {
      const TestChildren = () => <div>This is a React element</div>;
      buildSubject({ children: <TestChildren /> });
      history.push('/rumRoute');

      screen.getByText(/This is a React element/i);
    });
  });

  describe('ReactRouter render prop rendering', () => {
    it('should render strings', () => {
      buildSubject({ render: () => 'This is a string' });
      history.push('/rumRoute');

      screen.getByText(/This is a string/i);
    });

    it('should render JSX', () => {
      buildSubject({
        render: () => <div>This is a JSX children</div>,
      });
      history.push('/rumRoute');

      screen.getByText(/This is a JSX children/i);
    });

    it('should render a React element', () => {
      const TestChildren = () => <div>This is a React element</div>;
      buildSubject({ render: () => <TestChildren /> });
      history.push('/rumRoute');

      screen.getByText(/This is a React element/i);
    });
  });

  describe('ReactRouter component prop rendering', () => {
    it('should render a React Functional Component', () => {
      const TestChildren = () => (
        <div>This is a React Functional Component</div>
      );
      buildSubject({ render: () => <TestChildren /> });
      history.push('/rumRoute');

      screen.getByText(/This is a React Functional Component/i);
    });

    it('should render a React Class Component', () => {
      const TestChildren = class Test extends Component {
        render() {
          return <div>This is a React Class Component</div>;
        }
      };
      buildSubject({ render: () => <TestChildren /> });
      history.push('/rumRoute');

      screen.getByText(/This is a React Class Component/i);
    });
  });
});
