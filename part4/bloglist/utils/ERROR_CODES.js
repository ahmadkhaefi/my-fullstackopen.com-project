export default {
    API: {
        USER: {
            PASSWORD: {
                PASSWORD_FIELD_NOT_VALID: {
                    code: 'PASSWORD_FIELD_NOT_VALID',
                    message: 'Password field is not valid. A password should contain at least 3 characters.'
                }
            },
            USERNAME: {
                USERNAME_TOO_SHORT: {
                    code: 'USERNAME_TOO_SHORT',
                    message: 'Username field must be at least 3 characters long.'
                },
                USERNAME_REQUIRED: {
                    code: 'USERNAME_REQUIRED',
                    message: 'Username is required.'
                },
                USERNAME_FIELD_DUPLICATE: {
                    code: 'USERNAME_FIELD_DUPLICATE',
                    message: 'Username field is duplicate.'
                }
            },
            USERNAME_OR_PASSWORD_NOT_VALID: {
                code: 'USERNAME_OR_PASSWORD_NOT_VALID',
                message: 'Username or password is not valid.'
            },
            TOKEN_NOT_VALID: {
                code: 'TOKEN_NOT_VALID',
                message: 'JWT token is not valid.'
            },
            USER_NOT_FOUND: {
                code: 'USER_NOT_FOUND',
                message: 'User is not found.'
            }
        },
        BLOG: {
            BLOG_NOT_FOUND: {
                code: 'BLOG_NOT_FOUND',
                message: 'Blog is not found.'
            },
            UNAUTHORIZED_DELETION: {
                code: 'UNAUTHORIZED_DELETION',
                message: 'User is not authorized to delete this blog.'
            }
        }
    }
}
