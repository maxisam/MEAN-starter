
export const AUTH_CONFIG = {
    google: {
        clientId: {
            'doc': 'The Client ID from Google to use for authentication',
            'default': '',
            'env': 'GOOGLE_CLIENTID'
        },
        clientSecret: {
            'doc': 'The Client Secret from Google to use for authentication',
            'default': '',
            'env': 'GOOGLE_CLIENTSECRET'
        }
    },
    facebook: {
        clientId: {
            'doc': 'The Client ID from Facebook to use for authentication',
            'default': '',
            'env': 'FACEBOOK_CLIENTID'
        },
        clientSecret: {
            'doc': 'The Client Secret from Facebook to use for authentication',
            'default': '',
            'env': 'FACEBOOK_CLIENTSECRET'
        }
    },
    token: {
        secret: {
            doc: 'The signing key for the JWT',
            default: 'xxx-key',
            env: 'JWT_SIGNING_KEY'
        },
        issuer: {
            doc: 'The issuer for the JWT',
            default: 'xxx.azurewebsites.net'
        },
        audience: {
            doc: 'The audience for the JWT',
            default: 'xxx.azurewebsites.net'
        }
    }
};
