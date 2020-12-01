import * as Terminations from '../views/__backoffice/terminations';

const resources = [
    {
        name: `terminations.index`,
        path: `/terminations`,
        component: Terminations.List,
    }
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `terminations.${route.name}`;
    route.auth = true;

    return route;
});
