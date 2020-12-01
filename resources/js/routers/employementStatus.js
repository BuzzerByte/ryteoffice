import * as EmploymentStatus from '../views/__backoffice/employmentStatus';

const resources = [
    {
        name: `employmentStatus.index`,
        path: `/employmentStatus`,
        component: EmploymentStatus.List,
    },
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `employmentStatus.${route.name}`;
    route.auth = true;

    return route;
});
