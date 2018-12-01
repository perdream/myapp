import router from './router'

getLoginToken(){
	return localStorage.getItem('isLogin');
}
router.beforeEach((to, from, next) => {
    //根据字段判断是否路由过滤
    if (to.matched.some(record => record.meta.auth)) {
        if (getLoginToken() !== null) {
            next()
        } else {
            //防止无限循环
            if (to.name === 'Login') {
                next();
                return
            }
            next({
                path: '/',
            });
        }
    } else {
        next()//若点击的是不需要验证的页面,则进行正常的路由跳转
    }
});


