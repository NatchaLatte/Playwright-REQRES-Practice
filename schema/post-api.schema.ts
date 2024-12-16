export const createUser = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        job: { type: 'string' },
        id: { type: 'string' },
        createdAt: { type: 'string' },
    },
    required: ['name', 'job', 'id', 'createdAt']
}

export const registerSuccessful = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        token: { type: 'string' }
    },
    required: ['id', 'token']
}

export const registerUnSuccessful = {
    type: 'object',
    properties: {
        error: { type: 'string' }
    },
    required: ['error']
}

export const loginSuccessful = {
    type: 'object',
    properties: {
        token: { type: 'string' }
    },
    required: ['token']
}

export const loginUnSuccessful = {
    type: 'object',
    properties: {
        error: { type: 'string' }
    },
    required: ['error']
}