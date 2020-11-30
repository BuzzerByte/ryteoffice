import { BACKOFFICE_ROUTES } from '../routers';
import { CLIENTS } from '../routers';
import { VENDORS } from '../routers';
import { ORDERS } from '../routers';
import { QUOTATIONS } from '../routers';
import { PURCHASES } from '../routers';
import { PURCHASEPRODUCTS } from '../routers';
import { INVENTORIES } from '../routers';
import { CATEGORIES } from '../routers';
import { EMPLOYEES } from '../routers';
import { TERMINATIONS } from '../routers';
import { AWARDS } from '../routers';
import { ATTENDANCES } from '../routers';
import { APPLICATIONS } from '../routers';
import { REIMBURSEMENTS } from '../routers';
import { DEPARTMENTS } from '../routers';
import { JOBTITLES } from '../routers';
import { JOBCATEGORIES } from '../routers';
import { WORKSHIFTS } from '../routers';
import { WORKINGDAYS } from '../routers';
import { HOLIDAYS } from '../routers';
import { LEAVETYPES } from '../routers';
import { PAYGRADES } from '../routers';
import { SALARIES } from '../routers';
import { EMPLOYMENTSTATUS } from '../routers';
import { TAXES } from '../routers';
import { ROLES } from '../routers';
import { PERMISSIONS } from '../routers';
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
