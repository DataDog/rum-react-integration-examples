import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

const Throws = () => {
  throw new Error('Oh no!');
};

describe('ErrorBoundary', () => {
  let onErrorSpy: jest.Mock;
  let addErrorSpy: jest.Mock;

  beforeEach(() => {
    onErrorSpy = jest.fn();
    addErrorSpy = jest.fn();

    global.window.onerror = onErrorSpy;
    rumAgent = {
      addError: addErrorSpy,
    } as any;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const ErrorRenderer = () => <h1>Pretty error displayed</h1>;

  it('sends errors to addError', () => {
    render(
      <ErrorBoundary
        render={ErrorRenderer}
        errorMessage="Houston we've got a problem"
      >
        <Throws />
      </ErrorBoundary>
    );

    screen.getByText('Pretty error displayed');
    expect(onErrorSpy).toHaveBeenCalled();
    expect(addErrorSpy).toHaveBeenCalledTimes(1);
  });
});
