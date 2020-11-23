import * as Quotations from '../views/__backoffice/quotations';

const resources = [
    {
        name: 'quotations.index',
        path: '/quotations',
        component: Quotations.List,
    },
    {
        name: 'quotations.create',
        path: '/quotations/create',
        component: Quotations.Create,
    },
    {
        name: 'quotations.edit',
        path: '/quotations/:id/edit',
        component: Quotations.Edit,
    },
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `quotations.${route.name}`;
    route.auth = true;

    return route;
});
