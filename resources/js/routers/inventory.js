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
    },
    {
        name: 'inventories.create',
        path: '/inventories/create',
        component: Inventories.Create,
    }
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `inventories.${route.name}`;
    route.auth = true;

    return route;
});
