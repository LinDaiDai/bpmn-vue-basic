<template>
  <div id="app">
    <div class="content">
      <ul class="router_ul">
        <router-link v-for="link in links" :key="link.to" tag="li" active-class="activeClass" :to="link.to">{{ link.title }}</router-link>
      </ul>
       <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data () {
    return {
      links: [
        { to: '/basic', title: '基本使用' },
        { to: '/provider', title: '引入左侧工具栏以及节点' },
        { to: '/panel', title: '引入左侧工具栏和右侧属性栏' },
        { to: '/axios', title: '通过网络请求获取bpmn并渲染' },
        { to: '/save', title: '保存bpmn并发送给后台' },
        { to: '/event', title: '绑定event事件' }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
}
.router_ul {
  display: flex;
  justify-content: center;
  margin: 0;
  list-style: none;
  padding: 10px 0;
}
.router_ul li {
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 14px;  
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: all 0.3s;
}
.router_ul li.activeClass {
    background: #4d90fe;
    color: #fff;
    border: none;
}
</style>
