import * as Orders from '../views/__backoffice/orders';

const resources = [
    {
        name: 'orders.index',
        path: '/orders',
        component: Orders.List,
    },

    {
        name: 'orders.create',
        path: '/orders/create',
        component: Orders.Create,
    },
    {
        name: 'orders.edit',
        path: '/orders/:id/edit',
        component: Orders.Edit,
    },
    {
        name: 'orders.process',
        path: '/orders/process',
        component: Orders.List,
    },
    {
        name: 'orders.pending',
        path: '/orders/pending',
        component: Orders.List
    },
    {
        name: 'orders.deliver',
        path: '/orders/deliver',
        component: Orders.List
    }
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `orders.${route.name}`;
    route.auth = true;

    return route;
});
