import loadable from '@loadable/component';

export const List = loadable(() => import('./List'));
export const Create = loadable(() => import('./Create'));
export const Edit = loadable(() => import('./Edit'));
export const Process = loadable(() => import('./Process'));
export const Pending = loadable(() => import('./Pending'));
export const Deliver = loadable(() => import('./Deliver'));
