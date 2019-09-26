import { Home } from '../views/__backoffice';
import * as Settings from '../views/__backoffice/settings';
import * as Users from '../views/__backoffice/users';
import * as Clients from '../views/__backoffice/clients';
import * as Vendors from '../views/__backoffice/vendors';

const resources = [
    {
        name: 'users.index',
        path: '/users',
        component: Users.List,
    },

    {
        name: 'users.create',
        path: '/users/create',
        component: Users.Create,
    },

    {
        name: 'users.edit',
        path: '/users/:id/edit',
        component: Users.Edit,
    },
    {
        name: 'clients.index',
        path: '/clients',
        component: Clients.List,
    },

    {
        name: 'clients.create',
        path: '/clients/create',
        component: Clients.Create,
    },
    {
        name: 'clients.edit',
        path: '/clients/:id/edit',
        component: Clients.Edit,
    },
    {
        name: 'vendors.index',
        path: '/vendors',
        component: Vendors.List,
    },
    {
        name: 'vendors.create',
        path: '/vendors/create',
        component: Vendors.Create,
    },
    {
        name: 'vendors.edit',
        path: '/vendors/:id/edit',
        component: Vendors.Edit,
    },

].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

// const clientResources = [  
// ].map(route=>{
//     route.name = 'clientResources.${route.name}';
//     route.path = '/clientResources${route.path}';

//     return route;
// });

const vendorResources = [  
].map(route=>{
    route.name = 'vendorResources.${route.name}';
    route.path = '/vendorResources${route.path}';

    return route;
});

export default [
    {
        name: 'home',
        path: '/',
        component: Home,
    },

    {
        name: 'settings.profile',
        path: '/settings/profile',
        component: Settings.Profile,
    },

    {
        name: 'settings.account',
        path: '/settings/account',
        component: Settings.Account,
    },

    ...resources,
    ...vendorResources,
].map(route => {
    route.name = `backoffice.${route.name}`;
    route.auth = true;

    return route;
});
