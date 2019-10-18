import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            component: (resolve) => {
                require(['../components/Home'], resolve)
            }
        }, {
            path: '/news',
            name: 'News',
            component: (resolve) => {
                require(['../components/News'], resolve)
            }
        }, {
            path: '/newsdel/:id',
            name: 'Newsdel',
            component: (resolve) => {
                require(['../components/Newsdel'], resolve)
            }
        }
    ]
})

//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) {
        // 判断是否需要登录权限
        if (sessionStorage.getItem('Ticket')) {
            // 判断是否登录
            next()
        } else {
            // 没登录则跳转到登录界面
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        next()
    }
})

export default router