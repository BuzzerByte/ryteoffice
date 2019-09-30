import * as Clients from '../views/__backoffice/clients';

const resources = [
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

export default [
    ...resources,
].map(route => {
    route.name = `clients.${route.name}`;
    route.auth = true;

    return route;
});
