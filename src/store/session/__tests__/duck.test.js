import { Record, List } from 'immutable'
import { LIFECYCLE } from 'redux-pack'

import * as duck from '../duck'
import * as phases from '../../../utils/phases'
import * as Api from '../api'
import makePackAction from '../../../utils/testing/makePackAction'

const reducer = duck.default

describe('session duck', () => {
  describe('actions', () => {
    it('creates an action to fetch things', () => {
      const _fetchExampleApi = jest.spyOn(Api, 'fetchExample').mockImplementation(() => Promise.resolve())
      const calledAction = duck.fetchExample()
      expect(calledAction.type).toEqual(duck.FETCH_EXAMPLE)
      expect(_fetchExampleApi).toHaveBeenCalled()
      _fetchExampleApi.mockRestore()
    })
  })

  describe('reducer', () => {
    it('returns initial state', () => {
      const state = reducer(undefined, {})
      expect(state).toBeInstanceOf(Record)
      expect(state.phase).toBe(phases.INIT)
      expect(state.exampleThings).toBeInstanceOf(List)
      expect(state.error).toBe(null)
    })
    it('should set passed state', () => {
      const passedState = {
        phase: phases.SUCCESS,
        exampleThings: [
          { id: 1, title: 'The Title', description: 'A description' },
          { id: 2, title: 'Another Title', description: 'Another description' },
          { id: 3, title: 'One More Title', description: 'One More description' }
        ]
      }
      const state = reducer(passedState, undefined)
      expect(state).toBeInstanceOf(Record)
      expect(state.phase).toBe(passedState.phase)
      expect(state.exampleThings).toBeInstanceOf(List)
      expect(state.exampleThings.toJS()).toEqual(passedState.exampleThings)
      expect(state.error).toBeNull()
    })

    describe('FETCH_EXAMPLE', () => {
      it('should handle start', () => {
        const fetchExampleAction = makePackAction(LIFECYCLE.START, {
          type: duck.FETCH_EXAMPLE,
          payload: {}
        })
        const state = reducer(undefined, fetchExampleAction)
        expect(state.phase).toBe(phases.LOADING)
        expect(state.error).toBeNull()
      })
      it('should handle success', () => {
        const things = List([
          { id: 1, title: 'The Title', description: 'A description' },
          { id: 2, title: 'Another Title', description: 'Another description' },
          { id: 3, title: 'One More Title', description: 'One More description' }
        ])
        const fetchExampleSuccessAction = makePackAction(LIFECYCLE.SUCCESS, {
          type: duck.FETCH_EXAMPLE,
          payload: { things }
        })
        const state = reducer(undefined, fetchExampleSuccessAction)
        expect(state.phase).toEqual(phases.SUCCESS)
        expect(state.exampleThings).toBe(things)
        expect(state.error).toEqual(null)
      })
      it('should handle a failure', () => {
        const error = new Error('Something blew up')
        const fetchExampleErrorAction = makePackAction(LIFECYCLE.FAILURE, {
          type: duck.FETCH_EXAMPLE,
          payload: { error }
        })
        const state = reducer(undefined, fetchExampleErrorAction)
        expect(state.phase).toEqual(phases.ERROR)
        expect(state.exampleThings).toBeInstanceOf(List)
        expect(state.error).toEqual(error)
      })
    })
  })
})
