import * as EmploymentStatus from '../views/__backoffice/employeeStatus';

const resources = [
    {
        name: `employeeStatus.index`,
        path: `/employeeStatus`,
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
    route.name = `employeeStatus.${route.name}`;
    route.auth = true;

    return route;
});
