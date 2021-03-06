import * as Purchases from '../views/__backoffice/purchases';

const resources = [
    {
        name: 'purchases.create',
        path: '/purchases/create',
        component: Purchases.Create,
    },
    {
        name: 'purchases.index',
        path: '/purchases',
        component: Purchases.List,
    },
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `purchases.${route.name}`;
    route.auth = true;

    return route;
});
