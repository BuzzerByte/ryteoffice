import * as Purchases from '../views/__backoffice/purchases';

const resources = [
    {
        name: 'purchases.index',
        path: '/purchases',
        component: Purchases.List,
    },
    {
        name: 'purchases.create',
        path: '/purchases/create',
        component: Purchases.Create,
    }
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
