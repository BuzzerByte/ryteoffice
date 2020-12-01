import * as WorkingDays from '../views/__backoffice/workingDays';

const resources = [
    {
        name: `workingDays.index`,
        path: `/workingDays`,
        component: WorkingDays.List,
    },
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `workingDays.${route.name}`;
    route.auth = true;

    return route;
});
