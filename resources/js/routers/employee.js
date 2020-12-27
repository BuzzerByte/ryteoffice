import * as Employees from '../views/__backoffice/employees';

const resources = [
    {
        name: 'employees.create',
        path: '/employees/create',
        component: Employees.Create,
    },
    {
        name: 'employees.import',
        path: '/employees/import',
        component: Employees.Import,
    },
    {
        name: 'employees.index',
        path: '/employees',
        component: Employees.List,
    },
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `employees.${route.name}`;
    route.auth = true;

    return route;
});
