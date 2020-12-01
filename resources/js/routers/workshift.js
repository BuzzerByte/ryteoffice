import * as WorkShifts from '../views/__backoffice/workShifts';

const resources = [
    {
        name: `workShifts.index`,
        path: `/workShifts`,
        component: WorkShifts.List,
    },
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `workShifts.${route.name}`;
    route.auth = true;

    return route;
});
