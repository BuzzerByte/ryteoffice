import * as Permissions from '../views/__backoffice/permissions';

const resources = [
    {
        name: `permissions.index`,
        path: `/permissions`,
        component: Permissions.List,
    },
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `permissions.${route.name}`;
    route.auth = true;

    return route;
});
