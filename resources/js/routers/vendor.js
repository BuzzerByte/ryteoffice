import * as Vendors from '../views/__backoffice/vendors';

const resources = [
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

export default [
    ...resources,
].map(route => {
    route.name = `vendors.${route.name}`;
    route.auth = true;

    return route;
});
