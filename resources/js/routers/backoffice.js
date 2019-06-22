import { Home } from '../views/__backoffice';
import * as Settings from '../views/__backoffice/settings';
import * as Users from '../views/__backoffice/users';
import * as Clients from '../views/__backoffice/clients';

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
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

const clientResources = [
    
].map(route=>{
    route.name = 'clientResources.${route.name}';
    route.path = '/clientResources${route.path}';

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
    
].map(route => {
    route.name = `backoffice.${route.name}`;
    route.auth = true;

    return route;
});
