import React from 'react';
import { RumPublicApi, StartRum } from '@datadog/browser-rum-core'
import { render } from '@testing-library/react'
import { ErrorBoundary } from './errorBoundary'

declare global {
  interface Window {
    DD_RUM?: RumPublicApi
  }
}

const Throws = () => {
	throw new Error('Oh no!')
}

describe('ErrorBoundary', () => {
  let addErrorSpy: jasmine.Spy<ReturnType<StartRum>['addError']>
  let onerror: jasmine.Spy

  beforeEach(() => {
		onerror = spyOn(window, 'onerror')
    addErrorSpy = jasmine.createSpy()
		window.DD_RUM = {
			addError: addErrorSpy	
		}
  })

  afterEach(() => {
    delete window.DD_RUM
  })

  const ErrorRenderer = () => <h1>ERROR</h1>

  it('sends errors to addError', () => {

    render(
      <ErrorBoundary render={ErrorRenderer} errorMessage="Houston we've got a problem">
        <Throws />
      </ErrorBoundary>
    )
		expect(onerror).toHaveBeenCalled();

    expect(addErrorSpy).toHaveBeenCalledTimes(1)
  })
})
