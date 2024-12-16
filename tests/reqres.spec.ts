import { test, expect } from '@playwright/test'
import Ajv2020  from 'ajv/dist/2020'
import { listResource, listUsers, singleUser } from '../schema/get-api.schema'

const ajv = new Ajv2020 ()

test.describe('GET API', () => {
  test('LIST USERS', async ({ request }) => {
    const response = await request.get('/api/users?page=2')
    
    const stauts = response.status()
    expect(stauts).toBe(200)

    const headers = response.headers()
    expect(headers['content-type']).toContain('application/json')

    const body = await response.json()
    const validate = ajv.compile(listUsers)
    expect(validate(body)).toBe(true)
  })
  test('SINGLE USER', async ({ request }) => {
    const response = await request.get('/api/users/2')
    
    const stauts = response.status()
    expect(stauts).toBe(200)

    const headers = response.headers()
    expect(headers['content-type']).toContain('application/json')

    const body = await response.json()
    const validate = ajv.compile(singleUser)
    expect(validate(body)).toBe(true)
  })
  test('SINGLE USER NOT FOUND', async ({ request }) => {
    const response = await request.get('/api/users/23')
    
    const stauts = response.status()
    expect(stauts).toBe(404)

    const headers = response.headers()
    expect(headers['content-type']).toContain('application/json')

    const body = await response.json()
    expect(body).toEqual({})
  })
  test('LIST <RESOURCE>', async ({ request }) => {
    const response = await request.get('/api/unknown')
    
    const stauts = response.status()
    expect(stauts).toBe(200)

    const headers = response.headers()
    expect(headers['content-type']).toContain('application/json')

    const body = await response.json()
    const validate = ajv.compile(listResource)
    expect(validate(body)).toBe(true)
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