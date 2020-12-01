import * as JobCategories from '../views/__backoffice/jobCategories';

const resources = [
    {
        name: `jobCategories.index`,
        path: `/jobCategories`,
        component: JobCategories.List,
    },
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `jobCategories.${route.name}`;
    route.auth = true;

    return route;
});
