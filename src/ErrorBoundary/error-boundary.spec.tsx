import { render, screen } from '@testing-library/react';
import { getGlobalObject } from '../utils/getGlobalObject';
import { ErrorBoundary } from './ErrorBoundary';

jest.mock('../utils/getGlobalObject', () => ({
    getGlobalObject: jest.fn()
}));

const Throws = () => {
  throw new Error('Oh no!');
};

describe('ErrorBoundary', () => {
  let onErrorSpy: jest.Mock;
  let addErrorSpy: jest.Mock;

  let rumAgent: {
    addError: () => void
  };

  beforeEach(() => {
    onErrorSpy = jest.fn();
    addErrorSpy = jest.fn();

    global.window.onerror = onErrorSpy;
    rumAgent = {
      addError: addErrorSpy,
    } as any;

   (getGlobalObject as jest.Mock).mockReturnValue({
     DD_RUM: rumAgent
   });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const ErrorRenderer = () => <h1>Pretty error displayed</h1>;

  it('sends errors to addError', () => {
    render(
      <ErrorBoundary
        renderError={ErrorRenderer}
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
