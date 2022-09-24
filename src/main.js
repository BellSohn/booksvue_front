import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Books from './components/Books';
import BookComponent from './components/BookComponent';
import HomeComponent from './components/HomeComponent';
import NewBookComponent from './components/NewBookComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import PerfilComponent from './components/PerfilComponent';
import SearchComponent from './components/SearchComponent';
import RedirectComponent from './components/RedirectComponent';
import LoanManagerComponent from './components/LoanManagerComponent';
import LoanComponent from './components/LoanComponent';
import LoanEditComponent from './components/LoanEditComponent';
import vuelidate from 'vuelidate';
import VueMoment from 'vue-moment';
import moment from 'moment';
import 'moment/locale/en-ie';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import main from './assets/js/main.js';

import VueRouteMiddleware from 'vue-route-middleware';

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(vuelidate);
Vue.use(VueRouteMiddleware);
Vue.use(VueMoment,{
  moment
});
Vue.use(main);


const routes = [
  {path:'/home',component:HomeComponent},
  {path:'/books',component:Books},
  {path:'/book/:id',component:BookComponent},
  {path:'/newbook',component:NewBookComponent},
  {path:'/register',component:RegisterComponent},
  {path:'/perfil',component:PerfilComponent},
  {path:'/login',component:LoginComponent},
  {path:'/loans/:id',component:LoanComponent},
  {path:'/loan/:id',component:LoanEditComponent},
  {path:'/loanmanager',component:LoanManagerComponent},
  {path:'/buscador/:searchString',component:SearchComponent},
  {path:'/redirect/:searchString',component:RedirectComponent}
];

const router = new VueRouter({
  routes,
  mode:'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
