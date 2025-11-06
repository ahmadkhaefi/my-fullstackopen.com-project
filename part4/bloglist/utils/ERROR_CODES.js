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
            }
        }
    }
}
