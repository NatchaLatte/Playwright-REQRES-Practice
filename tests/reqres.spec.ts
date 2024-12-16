import { test, expect } from '@playwright/test'

test.describe('GET API', () => {
  test('LIST USERS', async ({ request }) => {
    const response = await request.get('/api/users/2')
  })
})

test.describe.skip('POST API', () => {

})

test.describe.skip('PUT API', () => {

})

test.describe.skip('PATCH API', () => {

})

test.describe.skip('DELETE API', () => {

})