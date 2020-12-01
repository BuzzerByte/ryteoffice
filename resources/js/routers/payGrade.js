import * as PayGrades from '../views/__backoffice/payGrades';

const resources = [
    {
        name: `payGrades.index`,
        path: `/payGrades`,
        component: PayGrades.List,
    },
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `payGrades.${route.name}`;
    route.auth = true;

    return route;
});
