import Layout from '@/views/layout/TheLayout.vue';

const logsRouter = {
    path: '/logs',
    component: Layout,
    redirect: 'noredirect',
    name: 'Logs',
    meta: {
        title: 'route.logs',
        icon: 'mdi-database-search',
    },
    children: [
        {
            path: 'users',
            component: () => import('@/views/components/Logs/UserLogs.vue'),
            name: 'UserLogs',
            meta: { title: 'route.log.user', roles: ['wizard'], noCache: true },
        },
        {
            path: 'docs',
            component: () => import('@/views/components/Permission/Editor.vue'),
            name: 'MultiDocLogs',
            meta: { title: 'route.log.multidoc', roles: ['wizard'], noCache: true },
        },
        {
            path: 'chats',
            component: () => import('@/views/components/Permission/Visitor.vue'),
            name: 'MultiChatLogs',
            meta: { title: 'route.log.multichat', roles: ['wizard'], noCache: true },
        },
    ],
};

export default logsRouter;
