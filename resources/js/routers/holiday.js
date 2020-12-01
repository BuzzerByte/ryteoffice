import * as Holidays from '../views/__backoffice/holidays';

const resources = [
    {
        name: `holidays.index`,
        path: `/holidays`,
        component: Holidays.List,
    },
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `holidays.${route.name}`;
    route.auth = true;

    return route;
});
