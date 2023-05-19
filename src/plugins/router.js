import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LobbyView from '../views/LobbyView.vue'
import ClassroomView from '../views/ClassroomView.vue'
import RestaurantView from '../views/RestaurantView.vue'
import MRTView from '../views/MRTView.vue'
import SupermarketView from '../views/SupermarketView.vue'
import ResultView from '../views/ResultView.vue'
import SignupForm from '../views/SignupForm.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignupForm
    },
    {
        path: '/lobby',
        name: 'lobby',
        component: LobbyView
    },
    {
        path: '/classroom',
        name: 'classroom',
        component: ClassroomView
    },
    {
        path: '/restaurant',
        name: 'restaurant',
        component: RestaurantView
    },
    {
        path: '/MRT',
        name: 'MRT',
        component: MRTView
    },
    {
        path: '/supermarket',
        name: 'supermarket',
        component: SupermarketView
    },
    {
        path: '/result',
        name: 'result',
        component: ResultView
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router