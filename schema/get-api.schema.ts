export const listUsers = {
    type: 'object',
    properties: {
        page: { type: 'integer' },
        per_page: { type: 'integer' },
        total: { type: 'integer' },
        total_pages: { type: 'integer' },
        data: {
            type: 'array',
            contains: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    email: { type: 'string' },
                    first_name: { type: 'string' },
                    last_name: { type: 'string' },
                    avatar: { type: 'string' }
                },
                required: ['id', 'email', 'first_name', 'last_name', 'avatar']
            },
            minContains: 0,
            maxContains: 6
        },
        support: {
            type: 'object',
            properties: {
                url: { type: 'string' },
                text: { type: 'string' }
            },
            required: ['url', 'text']
        }
    },
    required: ['page', 'per_page', 'total', 'total_pages', 'data', 'support']
}

export const singleUser = {
    type: 'object',
    properties: {
        data: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                email: { type: 'string' },
                first_name: { type: 'string' },
                last_name: { type: 'string' },
                avatar: { type: 'string' }
            },
            required: ['id', 'email', 'first_name', 'last_name', 'avatar']
        },
        support: {
            type: 'object',
            properties: {
                url: { type: 'string' },
                text: { type: 'string' }
            },
            required: ['url', 'text']
        }
    }
}

export const listResource = {
    type: 'object',
    properties: {
        page: { type: 'integer' },
        per_page: { type: 'integer' },
        total: { type: 'integer' },
        total_pages: { type: 'integer' },
        data: {
            type: 'array',
            contains: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    year: { type: 'integer' },
                    color: { type: 'string' },
                    pantone_value: { type: 'string' }
                },
                required: ['id', 'name', 'year', 'color', 'pantone_value']
            },
            minContains: 0,
            maxContains: 6
        },
        support: {
            type: 'object',
            properties: {
                url: { type: 'string' },
                text: { type: 'string' }
            },
            required: ['url', 'text']
        }
    },
    required: ['page', 'per_page', 'total', 'total_pages', 'data', 'support']
}

export const singleResource = {
    type: 'object',
    properties: {
        data: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                year: { type: 'integer' },
                color: { type: 'string' },
                pantone_value: { type: 'string' }
            },
            required: ['id', 'name', 'year', 'color', 'pantone_value']
        },
        support: {
            type: 'object',
            properties: {
                url: { type: 'string' },
                text: { type: 'string' }
            },
            required: ['url', 'text']
        }
    }
}