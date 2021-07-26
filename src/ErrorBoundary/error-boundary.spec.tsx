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

  const ErrorRenderer = (error: Error) => (
    <h1>Pretty error displayed {error.message}</h1>
  );

  it('sends errors to addError', () => {
    render(
      <ErrorBoundary fallback={ErrorRenderer}>
        <Throws />
      </ErrorBoundary>
    );

    screen.getByText(/Pretty error displayed/i);
    expect(onErrorSpy).toHaveBeenCalled();
    expect(addErrorSpy).toHaveBeenCalledTimes(1);
  });
});
