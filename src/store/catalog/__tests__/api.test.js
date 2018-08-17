import nock from 'nock'
import { List } from 'immutable'
import { OK } from 'http-status-codes'

import Config from '../../../config'
import * as api from '../api'

describe('catalog API', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  describe('fetchExample()', () => {
    it('should return a promise and resolve to a List of things', () => {
      const expectedThings = [
        { id: 1, title: 'Thing #1', description: 'This thing is super cool' },
        {
          id: 2,
          title: 'Thing #2',
          description: 'This thing is super super cool'
        },
        {
          id: 3,
          title: 'Thing #3',
          description: 'This thing is super mega cool'
        }
      ]

      nock(`${Config.get('/ApiHostname')}`).get('/example').reply(OK, expectedThings)

      const fetchExampleCall = api.fetchExample()

      expect(fetchExampleCall).toBeInstanceOf(Promise)

      return fetchExampleCall.then(payload => {
        expect(payload).toBeInstanceOf(List)
        payload.forEach((thing, idx) => {
          expect(thing).toEqual(expectedThings[idx])
        })
      })
    })
  })
})
