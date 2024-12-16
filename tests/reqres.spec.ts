import { test, expect } from '@playwright/test'
import Ajv2020  from 'ajv/dist/2020'
import { listResource, listUsers, singleResource, singleUser } from '../schema/get-api.schema'
import { createUser, loginSuccessful, registerSuccessful, registerUnSuccessful } from '../schema/post-api.schema'

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
  test('SINGLE <RESOURCE>', async ({ request }) => {
    const response = await request.get('/api/unknown/2')
    
    const stauts = response.status()
    expect(stauts).toBe(200)

    const headers = response.headers()
    expect(headers['content-type']).toContain('application/json')

    const body = await response.json()
    const validate = ajv.compile(singleResource)
    expect(validate(body)).toBe(true)
  })
  test('SINGLE <RESOURCE> NOT FOUND', async ({ request }) => {
    const response = await request.get('/api/unknown/23')
    
    const stauts = response.status()
    expect(stauts).toBe(404)

    const headers = response.headers()
    expect(headers['content-type']).toContain('application/json')

    const body = await response.json()
    expect(body).toEqual({})
  })
  test('DELAYED RESPONSE', async ({ request }) => {
    test.setTimeout(3_500)

    const response = await request.get('/api/users?delay=3')

    const stauts = response.status()
    expect(stauts).toBe(200)

    const headers = response.headers()
    expect(headers['content-type']).toContain('application/json')

    const body = await response.json()
    const validate = ajv.compile(listUsers)
    expect(validate(body)).toBe(true)
  })
})

test.describe('POST API', () => {
  test('CREATE', async ({ request }) => {
    const user = {
      name: "morpheus",
      job: "leader"
    }

    const response = await request.post('/api/users', { data: user })
    
    const stauts = response.status()
    expect(stauts).toBe(201)

    const headers = response.headers()
    expect(headers['content-type']).toContain('application/json')

    const body = await response.json()
    const validate = ajv.compile(createUser)
    expect(validate(body)).toBe(true)

    expect(user).toEqual(expect.objectContaining(user))
  })
  test('REGISTER - SUCCESSFUL', async ({ request }) => {
    const user = {
      email: "eve.holt@reqres.in",
      password: "pistol"
    }

    const response = await request.post('/api/register', { data: user })
    
    const stauts = response.status()
    expect(stauts).toBe(200)

    const headers = response.headers()
    expect(headers['content-type']).toContain('application/json')

    const body = await response.json()
    const validate = ajv.compile(registerSuccessful)
    expect(validate(body)).toBe(true)
  })
  test('REGISTER - UNSUCCESSFUL', async ({ request }) => {
    const user = {
      email: "sydney@fife",
    }

    const response = await request.post('/api/register', { data: user })
    
    const stauts = response.status()
    expect(stauts).toBe(400)

    const headers = response.headers()
    expect(headers['content-type']).toContain('application/json')

    const body = await response.json()
    const validate = ajv.compile(registerUnSuccessful)
    expect(validate(body)).toBe(true)
  })
  test('LOGIN - SUCCESSFUL', async ({ request }) => {
    const user = {
      email: "eve.holt@reqres.in",
      password: "cityslicka"
    }

    const response = await request.post('/api/login', { data: user })
    
    const stauts = response.status()
    expect(stauts).toBe(200)

    const headers = response.headers()
    expect(headers['content-type']).toContain('application/json')

    const body = await response.json()
    const validate = ajv.compile(loginSuccessful)
    expect(validate(body)).toBe(true)
  })
})

test.describe.skip('PUT API', () => {

})

test.describe.skip('PATCH API', () => {

})

test.describe.skip('DELETE API', () => {

})