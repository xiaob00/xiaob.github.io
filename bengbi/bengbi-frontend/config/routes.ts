export default [
  { name:'登录',path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  { path:'/',redirect: '/add_chart' },
  { path: '/add_chart', name:'智能分析', icon: 'barChart', component: './AddChart' },
  { path: '/add_chart_async', name: '智能分析（异步）', icon: 'barChart', component: './AddChartAsync' },
  { path: '/my_chart', name: '我的图表', icon: 'pieChart', component: './MyChart' },
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name:'管理员页面',
    routes: [
      { name: '管理页面1',path: '/admin',redirect: '/admin/sub-page' },
      { name: '管理页面2', path: '/admin/sub-page', component: './Admin' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
