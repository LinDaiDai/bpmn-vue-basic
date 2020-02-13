<template>
  <div class="containers">
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <template v-else>
      <div class="canvas" ref="canvas"></div>
      <div id="js-properties-panel" class="panel"></div>
    </template>
  </div>
</template>

<script>
// 引入相关的依赖
import BpmnModeler from 'bpmn-js/lib/Modeler'
import axios from 'axios'
import { xmlStr } from '../mock/xmlStr'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
export default {
  name: '',
  components: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 载入后, Vue 实例挂载到实际的 DOM 操作完成，一般在该过程进行 Ajax 交互
  mounted() {
    this.init()
  },
  data() {
    return {
      // bpmn建模器
      bpmnModeler: null,
      container: null,
      canvas: null,
      loading: true,
      xmlUrl: '',
      defaultXmlStr: xmlStr
    }
  },
  // 方法集合
  methods: {
    async init() {
      this.loading = true
      this.xmlUrl = await this.getXmlUrl()
      console.log(this.xmlUrl)
      this.loading = false
      this.$nextTick(() => {
        this.initBpmn()
      })
    },
    getXmlUrl() {
      return new Promise(resolve => {
        setTimeout(() => {
          const url = 'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmnMock.bpmn'
          resolve(url)
        }, 1000)
      })
    },
    initBpmn() {
      // 获取到属性ref为“canvas”的dom节点
      const canvas = this.$refs.canvas
      // 建模
      this.bpmnModeler = new BpmnModeler({
        container: canvas,
        //添加控制板
        propertiesPanel: {
          parent: '#js-properties-panel'
        },
        additionalModules: [
          // 左边工具栏以及节点
          propertiesProviderModule
        ]
      })
      this.createNewDiagram()
    },
    async createNewDiagram() {
      const that = this
      let bpmnXmlStr = ''
      if (this.xmlUrl === '') {
        bpmnXmlStr = this.defaultXmlStr
        this.transformCanvas(bpmnXmlStr)
      } else {
        let res = await axios({
          method: 'get',
          timeout: 120000,
          url: that.xmlUrl,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        console.log(res)
        bpmnXmlStr = res['data']
        this.transformCanvas(bpmnXmlStr)
      }
    },
    transformCanvas(bpmnXmlStr) {
      // 将字符串转换成图显示出来
      this.bpmnModeler.importXML(bpmnXmlStr, err => {
        if (err) {
          console.error(err)
        } else {
          this.success()
        }
        // 让图能自适应屏幕
        var canvas = this.bpmnModeler.get('canvas')
        canvas.zoom('fit-viewport')
      })
    },
    success() {
      console.log('创建成功!')
    }
  },
  // 计算属性
  computed: {}
}
</script>

<style scoped>
.loading {
  font-size: 26px;
}
.containers {
  background-color: #ffffff;
  width: 100%;
  height: calc(100vh - 52px);
}
.canvas {
  width: 100%;
  height: 100%;
}
.panel {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
}
</style>
