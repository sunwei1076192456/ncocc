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
                    title:"用户管理",
                    requiresAuth: true,
                    role: ['management']//什么角色能看到这个页面
                }
	    	},
	    	{
	    		path: '/menuManager',
                name: 'menuManager',
                component: (resolve) => require(['./template/PC/UserCenter/menuManager.vue'], resolve),
                meta: {
                    title:"菜单管理",
                    requiresAuth: true,
                    role: ['management']
                }
	    	},
	    	{
	    		path: '/roleManager',
                name: 'roleManager',
                component: (resolve) => require(['./template/PC/UserCenter/roleManager.vue'], resolve),
                meta: {
                    title:"角色管理",
                    requiresAuth: true,
                    role: ['management']
                }
			},
			{
				path: '/unpackWaybillManager',
                name: 'unpackWaybillManager',
                component: (resolve) => require(['./template/PC/OrderCenter/unpackWaybillManager.vue'], resolve),
                meta: {
                    title:"拆箱运单",
                    requiresAuth: true,
                    role: ['operator','management']
                }
			},
            {
                path: '/packWaybillManager',
                name: 'packWaybillManager',
                component: (resolve) => require(['./template/PC/OrderCenter/packWaybillManager.vue'], resolve),
                meta: {
                    title:"装箱运单",
                    requiresAuth: true,
                    role: ['operator','management']
                }
            },
            {
                path: '/todoWaybillManager',
                name: 'todoWaybillManager',
                component: (resolve) => require(['./template/PC/OrderCenter/todoWaybillManager.vue'], resolve),
                meta: {
                    title:"待办单",
                    requiresAuth: true,
                    role: ['operator','management']
                }
            },
			{
				path: '/dispatcherAudit',
                name: 'dispatcherAudit',
                component: (resolve) => require(['./template/PC/OrderCenter/dispatcherAudit.vue'], resolve),
                meta: {
                    title:"调度审核",
                    requiresAuth: true,
                    role: ['dispatcher','management']
                }
			},
            {
                path: '/dispatcherAssignCar',
                name: 'dispatcherAssignCar',
                component: (resolve) => require(['./template/PC/OrderCenter/dispatcherAssignCar.vue'], resolve),
                meta: {
                    title:"调度派车",
                    requiresAuth: true,
                    role: ['dispatcher','management']
                }
            },
            {
                path: '/carManagerAudit',
                name: 'carManagerAudit',
                component: (resolve) => require(['./template/PC/OrderCenter/carManagerAudit.vue'], resolve),
                meta: {
                    title:"车管审核",
                    requiresAuth: true,
                    role: ['vehicle_management','management']
                }
            },
            {
                path: '/searchManager',
                name: 'searchManager',
                component: (resolve) => require(['./template/PC/OrderCenter/searchManager.vue'], resolve),
                meta: {
                    title:"综合查询",
                    requiresAuth: true,
                    role: ['management','dispatcher','operator','dispatcherLeader','operatorLeader']
                }
            }
	    ]
	},
];

// 路由配置
const RouterConfig = {
    mode: 'history',
    base: '/ncocc',
    routes: routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    debugger;
    let token = window.localStorage.getItem('currentUser_token');
    let role = window.localStorage.getItem('currentUser_role');
    if(token != null && token != ""){
       if (to.matched.some(record => record.meta.requiresAuth)) {
            if (to.meta.role.indexOf(role) > -1) {
                next();
            }else{
               iView.Message.error("无权限访问!");
               next({
                  path: '/',
                  query: { redirect: to.fullPath }
               }) 
            }     
       }else{
            next();
       }
    }else{
       /*next({
          path: '/login',
          query: { redirect: to.fullPath }
       }) */
       next(); 
    }
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

/*router.beforeEach((to, from, next) => {
    debugger;
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
});*/

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export default router;