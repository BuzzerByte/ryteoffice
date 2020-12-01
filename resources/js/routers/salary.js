import * as Salaries from '../views/__backoffice/salaries';

const resources = [
    {
        name: `salaries.index`,
        path: `/salaries`,
        component: Salaries.List,
    },
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `salaries.${route.name}`;
    route.auth = true;

    return route;
});
