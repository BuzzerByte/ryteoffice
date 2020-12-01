import * as Reimbursements from '../views/__backoffice/reimbursements';

const resources = [
    {
        name: `reimbursements.index`,
        path: `/reimbursements`,
        component: Reimbursements.List,
    },
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `reimbursements.${route.name}`;
    route.auth = true;

    return route;
});
