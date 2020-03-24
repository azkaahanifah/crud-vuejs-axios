import Vue from 'vue';
import Router from 'vue-router';
import Course from '@/components/Course';

Vue.use(Router);

export default new Router ({
    mode: "history",
    routes: [{
        path: '/',
        name: 'Home',
        component: Course
    }]
})