import * as Taxes from '../views/__backoffice/taxes';

const resources = [
    {
        name: `taxes.index`,
        path: `/taxes`,
        component: Taxes.List,
    },
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `taxes.${route.name}`;
    route.auth = true;

    return route;
});
