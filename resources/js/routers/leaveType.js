import * as LeaveTypes from '../views/__backoffice/leaveTypes';

const resources = [
    {
        name: `leaveTypes.index`,
        path: `/leaveTypes`,
        component: LeaveTypes.List,
    },
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `leaveTypes.${route.name}`;
    route.auth = true;

    return route;
});
