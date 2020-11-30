import * as PurchaseProducts from '../views/__backoffice/purchaseProducts';

const resources = [
    {
        name: 'purchases.index',
        path: '/purchases',
        component: PurchaseProducts.List,
    },
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `purchases.${route.name}`;
    route.auth = true;

    return route;
});
