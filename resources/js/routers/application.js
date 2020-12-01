import * as Applications from '../views/__backoffice/applications';

const resources = [
    {
        name: `applications.index`,
        path: `/applications`,
        component: Applications.List,
    },
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `applications.${route.name}`;
    route.auth = true;

    return route;
});
