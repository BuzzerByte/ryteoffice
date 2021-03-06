import * as Roles from '../views/__backoffice/roles';

const resources = [
    {
        name: `roles.index`,
        path: `/roles`,
        component: Roles.List,
    },
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `roles.${route.name}`;
    route.auth = true;

    return route;
});
