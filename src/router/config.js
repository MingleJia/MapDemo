import * as config from 'ROUTER/index';

export const routerConfig = [
    {
        path:'/',
        component: config.Login,    // 登陆页
        exact: true
    },
    {
        path:'/examWait',
        component: config.ExamWait,    // 登陆页
        exact: true
    },
    {
        path:'/test',
        component: config.Test,    // test
        exact: true
    },
    {
        path:'/tsTest',
        component: config.TsTest,    // test
        exact: true
    },
    {
        path:'/board',
        component: config.Board,    // test
        exact: true
    },
    {
        path:'/jSPang',
        component: config.JSPang,    // JSPang博客练习
        exact: true
    },
    {
        path:'/mapDemo',
        component: config.MapDemo,    // JSPang博客练习
        exact: true
    },
]