const routes = [
    {
        path: '/',
        name: '',
        component: () => import('@/views/word/index.vue'),
        meta: {
            title: '',
            key: ''
        }
    },
    {
        path: '/staking',
        name: 'staking',
        component: () => import('@/views/profit/staking.vue'),
        meta: {
            title: '/staking',
            key: '/staking'
        }
    },
    {
        path: '/rewards',
        name: 'rewards',
        component: () => import('@/views/profit/index.vue'),
        meta: {
            title: 'rewards',
            key: 'rewards'
        }
    },
    {
        path: '/synthesis',
        name: 'synthesis',
        component: () => import('@/views/profit/synthesis.vue'),
        meta: {
            title: 'checkTokenID.vue',
            key: 'checkTokenID.vue'
        }
    },
    {
        path: '/dismantling',
        name: 'dismantling',
        component: () => import('@/views/profit/dismantling.vue'),
        meta: {
            title: 'dismantling',
            key: 'dismantling'
        }
    },
    {
        path: '/sentence',
        name: 'sentence',
        component: () => import('@/views/home/index.vue'),
        meta: {
            title: 'sentence',
            key: 'sentence'
        }
    },
    {
        path: '/word',
        name: 'word',
        component: () => import('@/views/word/index.vue'),
        meta: {
            title: 'word',
            key: 'word'
        }
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about/index.vue'),
        meta: {
            title: 'about',
            key: 'about'
        }
    },
]


export default routes;
