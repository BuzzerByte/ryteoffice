import * as Awards from '../views/__backoffice/awards';

const resources = [
    {
        name: `awards.index`,
        path: `/awards`,
        component: Awards.List,
    },
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `awards.${route.name}`;
    route.auth = true;

    return route;
});
