import Layout from '@/layout'
export default {
    path: '/salarys',
    name: 'salarys',
    component: Layout,
    children: [{
        path: '',
        component: () =>
            import ('@/views/salarys'),
        meta: {
            title: '薪水',
            icon: 'money'
        }
    }]
}