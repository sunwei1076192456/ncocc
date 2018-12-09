import axios from 'axios';
import iView from 'iview';
export default {
    namespaced: true,
    state:{
        currentUser:{
            get UserName(){
                return localStorage.getItem("currentUser_name");
            },
            get UserToken(){
                return localStorage.getItem("currentUser_token");
            },
        }
    },
    mutations:{
        setUser(state,{user_name,user_token}){
            // 在这里把用户名和token保存起来
            localStorage.setItem("currentUser_name",user_name);
            localStorage.setItem("currentUser_token",user_token);
        },
        clearUser(state){
            localStorage.clear();
        }
    },
    actions:{
        userLogin(context,{user_name,user_password,router}){
        	axios({
                method: 'post',
                url: 'api/userManger/login.do',
                data: {
                    "loginName": user_name,
                    "password": user_password
                }
            }).then(function(response){
                /*console.log(response.data);*/
                if(response.data.resultCode == 200){
                    context.commit('setUser',{"user_name":user_name,"user_token":response.data.extend.access_token});
                    /*router.push({path:"base"});*/
                    axios.defaults.headers.common['Authorization'] = 'bearer '+ localStorage.getItem("currentUser_token");
                    /*context.commit('setLoginErrorCode',200,{root: true});*/
                    iView.Message.error("success");
                    router.push({ path: '/index' });
                }else{
                    /*context.commit('setLoginErrorCode',response.data.resultCode,{root: true});*/
                    iView.Message.error(response.data.resultMsg);
                }              
                /*this.$route.router.push({ path: '/base' });*/
            }).catch(function(error){
                iView.Message.error("未知错误!");
                /*context.commit('users/setLoginErrorCode',500,{root: true});*/
            });
        },
        loginOUt(context,{router}){
            router.push({ path: '/' }) ;
            location.reload();
            context.commit('clearUser');
        }
    }
}