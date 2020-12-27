import * as PurchaseProducts from '../views/__backoffice/purchaseProducts';

const resources = [
    {
        name: 'purchaseProducts.index',
        path: '/purchaseProducts',
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
    route.name = `purchaseProducts.${route.name}`;
    route.auth = true;

    return route;
});
