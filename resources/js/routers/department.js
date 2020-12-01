import * as Departments from '../views/__backoffice/departments';

const resources = [
    {
        name: `departments.index`,
        path: `/departments`,
        component: Departments.List,
    },
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `departments.${route.name}`;
    route.auth = true;

    return route;
});
