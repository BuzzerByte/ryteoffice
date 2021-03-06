import * as Categories from '../views/__backoffice/categories';

const resources = [
    {
        name: 'categories.index',
        path: '/categories',
        component: Categories.List,
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
