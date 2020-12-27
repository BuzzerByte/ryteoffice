import * as Attendances from '../views/__backoffice/attendances';

const resources = [
    {
        name: `attendances.setAttendance`,
        path: `/attendances/setAttendance`,
        component: Attendances.SetAttendance,
    },
    {
        name: `attendances.import`,
        path: `/attendances/import`,
        component: Attendances.Import,
    },
    {
        name: `attendances.attendanceReport`,
        path: `/attendances/attendanceReport`,
        component: Attendances.Report,
    },
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

export default [
    ...resources,
].map(route => {
    route.name = `attendances.${route.name}`;
    route.auth = true;

    return route;
});
