import loadable from '@loadable/component';

// export { default as SignIn } from './SignIn';
export const SignIn  = loadable(() => import('./SignIn'));
export const PasswordRequest = loadable(() => import('./passwords/Request'));
export const PasswordReset = loadable(() => import('./passwords/Reset'));
