import React from 'react';
import { render } from '@testing-library/react';
import { ErrorBoundary } from './errorBoundary';

const Throws = () => {
  throw new Error('Oh no!');
};

describe('ErrorBoundary', () => {
  let addErrorSpy: jest.Mock;
  let onerror: jasmine.Spy;

  beforeEach(() => {
    onerror = spyOn(window, 'onerror');
    addErrorSpy = jest.fn();
    window.DD_RUM = {
      addError: addErrorSpy,
    } as any;
  });

  afterEach(() => {
    // @ts-ignore
    delete window.DD_RUM;
  });

  const ErrorRenderer = () => <h1>ERROR</h1>;

  it('sends errors to addError', () => {
    render(
      <ErrorBoundary
        render={ErrorRenderer}
        errorMessage="Houston we've got a problem"
      >
        <Throws />
      </ErrorBoundary>
    );
    expect(onerror).toHaveBeenCalled();

    expect(addErrorSpy).toHaveBeenCalledTimes(1);
  });
});
