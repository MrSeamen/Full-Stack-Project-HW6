//imports
    import login from './comps/login.vue';
    import dashboard from './comps/dashboard.vue';

//define routes
    export default [{
            name: 'dashboard',
            path: '/dashboard/:id',
            component: dashboard
        },{
            name: 'login',
            path: '/login',
            component: login
        },{
            name: 'default',
            path: "*",
            redirect: "/login"
        }];