import Vue from 'vue'
import Router from 'vue-router'
import common from '../components/common/common'
import analyze from '../components/analyze/analyze'
import evaluate from '../components/evaluate/evaluate'
import diagnose from '../components/diagnose/diagnose'
import dispatch from '../components/dispatch/dispatch'
import history from '../components/history/history'
import risk from '../components/risk/risk'
import emulation from '../components/emulation/emulation'
import dragTest from '../components/dragTest/dragTest'
import login from '../components/login/login'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: login},
    { path: '/common', name: 'common', component: common},
    { path: '/analyze', component: analyze},
    { path: '/evaluate', component: evaluate},
    { path: '/diagnose', component: diagnose},
    { path: '/dispatch', component: dispatch},
    { path: '/history', component: history},
    { path: '/risk', component: risk},
    { path: '/emulation', component: emulation},
    { path: '/dragTest', component: dragTest}
  ]
})
