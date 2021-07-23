import { renderHook, act } from '@testing-library/react-hooks';
import * as React from 'react';

import { useRumAction } from './use-rum-action';

import { getGlobalObject } from '../utils/getGlobalObject';

jest.mock('../utils/getGlobalObject', () => ({
    getGlobalObject: jest.fn()
}));

describe('useRumAction', () => {
    let rumAgent: {
        addAction: ()=>void
    };
    let addActionSpy: jest.Mock;

    beforeEach(() => {
        addActionSpy = jest.fn();
        rumAgent = {
            addAction: addActionSpy,
        } as any;

        (getGlobalObject as jest.Mock).mockReturnValue({
            DD_RUM: rumAgent
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should send an action with user-tracking purpose', () => {
        const {
            result: { current: addRumAction }
        } = renderHook(() => useRumAction("action-fou-tracking"));
        act(() => {
            addRumAction('test-element', {
                customAttr1: 'fou', 
                customAttr2: 'fou'
            });
        });

        expect(rumAgent.addAction).toHaveBeenCalledTimes(1);
        expect(
            (rumAgent.addAction as jest.MockedFunction<
                typeof rumAgent.addAction
            >).mock.calls[0]
        ).toMatchInlineSnapshot(`
            Array [
              "test-element",
              Object {
                "customAttr1": "fou",
                "customAttr2": "fou",
                "purpose": "action-fou-tracking",
                "react": Object {
                  "breadcrumbs": "root",
                  "component": "root",
                },
              },
            ]
        `);
    });
});
