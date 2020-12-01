import * as JobTitles from '../views/__backoffice/jobtitles';

const resources = [
    {
        name: `jobTitles.index`,
        path: `/jobTitles`,
        component: JobTitles.List,
    },
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `jobTitles.${route.name}`;
    route.auth = true;

    return route;
});
