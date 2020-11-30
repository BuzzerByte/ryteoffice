import * as Inventories from '../views/__backoffice/inventories';

const resources = [
    {
        name: 'inventories.index',
        path: '/inventories',
        component: Inventories.List,
    },
    {
        name: 'inventories.import',
        path: '/inventories/import',
        component: Inventories.Import,
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
