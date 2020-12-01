import * as Withdrawals from '../views/__backoffice/withdrawals';

const resources = [
    {
        name: 'withdrawals.index',
        path: '/withdrawals',
        component: Withdrawals.List,
    }
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
