import React from 'react';

const LoginView = React.lazy(() => import('./view/login/Login'));
const HomeView = React.lazy(() => import('./view/home/Home'));


const routes = [
    // Custom routes
    {path: '/login', name: 'Login', component: LoginView},
    {path: '/', name: 'Advertisements', component: HomeView},
];

export default routes;
