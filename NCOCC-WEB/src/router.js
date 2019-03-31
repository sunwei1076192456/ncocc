import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'iview';
import Util from './libs/util';

Vue.use(VueRouter);

const routers = [
	{ 
		path: '*', 
		component: (resolve) => require(['./template/error404.vue'], resolve) 
	},
	{
		path: '/',
	    meta: {
	        title: '首页'
	    },
	    component: (resolve) => require(['./template/PC/index.vue'], resolve),
	    children: [
	    	{
	    		path: '',
                name: 'welcome',
                component: (resolve) => require(['./template/PC/welcome.vue'], resolve),
                meta: {
                    title:"欢迎"
                }
	    	}
	    ]
	},
	{
	    path: '/login',
	    meta: {
	        title: '登录'
	    },
	    component: (resolve) => require(['./template/PC/login.vue'], resolve)
	},
	{
	    path: '/index',
	    meta: {
	        title: '首页'
	    },
	    component: (resolve) => require(['./template/PC/index.vue'], resolve),
	    children: [
	    	{
	    		path: '',
                name: 'welcome',
                component: (resolve) => require(['./template/PC/welcome.vue'], resolve),
                meta: {
                    title:"欢迎"
                }
	    	},
	    	{
	    		path: '/userManager',
                name: 'userManager',
                component: (resolve) => require(['./template/PC/UserCenter/userManager.vue'], resolve),
                meta: {
                    title:"用户管理"
                }
	    	},
	    	{
	    		path: '/menuManager',
                name: 'menuManager',
                component: (resolve) => require(['./template/PC/UserCenter/menuManager.vue'], resolve),
                meta: {
                    title:"菜单管理"
                }
	    	},
	    	{
	    		path: '/roleManager',
                name: 'roleManager',
                component: (resolve) => require(['./template/PC/UserCenter/roleManager.vue'], resolve),
                meta: {
                    title:"角色管理"
                }
			},
			{
				path: '/waybillManager',
                name: 'waybillManager',
                component: (resolve) => require(['./template/PC/OrderCenter/waybillManager.vue'], resolve),
                meta: {
                    title:"运单管理"
                }
			},
			{
				path: '/addWaybill',
                name: 'addWaybill',
                component: (resolve) => require(['./template/PC/OrderCenter/addWaybill.vue'], resolve),
                meta: {
                    title:"新增运单"
                }
			}
	    ]
	},
];

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    let token = window.localStorage.getItem('currentUser_token')
    if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
        next({
          path: '/',
          query: { redirect: to.fullPath }
        })
    }
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export default router;