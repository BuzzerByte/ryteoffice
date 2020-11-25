import { BACKOFFICE_ROUTES } from '../routers';
import { CLIENTS } from '../routers';
import { VENDORS } from '../routers';
import { ORDERS } from '../routers';
import { QUOTATIONS } from '../routers';
import * as Auth from '../views/auth';
import * as Errors from '../views/errors';

export default [
    {
        name: 'auth.signin',
        path: '/signin',
        component: Auth.SignIn,
        auth: false,
    },

    {
        name: 'auth.passwords.request',
        path: '/password/request',
        component: Auth.PasswordRequest,
        auth: false,
    },
    {
        name: 'auth.passwords.reset',
        path: '/password/reset/:token',
        component: Auth.PasswordReset,
        auth: false,
    },

    ...BACKOFFICE_ROUTES,
    ...CLIENTS,
    ...VENDORS,
    ...ORDERS,
    ...QUOTATIONS,
    
    {
        name: 'errors.not-found',
        component: Errors.NotFound,
    },
];
