// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import iView from 'iview';
import App from './App';
import axios from './axios';
import VueAxios from 'vue-axios';
import store from './store/store';
import router from './router';
import VueRouter from 'vue-router';
import VueQuillEditor from 'vue-quill-editor';
import './styles/common.css';
import 'iview/dist/iview.min.js'
import 'iview/dist/styles/iview.css';

Vue.use(VueAxios,axios);

Vue.use(iView);
Vue.use(VueQuillEditor);

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});