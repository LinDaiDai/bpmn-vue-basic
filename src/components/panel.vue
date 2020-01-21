<template>
  <div class="containers" ref="content">
    <div class="canvas" ref="canvas"></div>
    <div id="js-properties-panel" class="panel"></div>
  </div>
</template>

<script>
// 引入相关的依赖
// import BpmnViewer from 'bpmn-js'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
import { xmlStr } from '../mock/xmlStr'
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
        canvas: null
    }
  },
// 方法集合
  methods: {
    init () {
      // 获取到属性ref为“content”的dom节点
      this.container = this.$refs.content
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
          propertiesProviderModule,
          // 右边的工具栏
          propertiesPanelModule
        ],
        moddleExtensions: {
          camunda: camundaModdleDescriptor
        }
      })
      this.createNewDiagram()
	},
    createNewDiagram () {
        // 将字符串转换成图显示出来
        this.bpmnModeler.importXML(xmlStr, (err) => {
            if (err) {
                // console.error(err)
            }
            else {
                // 这里是成功之后的回调, 可以在这里做一系列事情
                this.success()
            }
        })
    },
    success () {
        // console.log('创建成功!')
        this.addEventBusListener()
    },
    addEventBusListener() {
      // 监听 element
      let that = this
      const eventBus = this.bpmnModeler.get('eventBus')
      const eventTypes = ['element.click', 'element.changed', 'element.updateLabel']
      eventTypes.forEach(function(eventType) {
        eventBus.on(eventType, function(e) {
          console.log(eventType)
          if (!e || e.element.type == 'bpmn:Process') return
          if (eventType === 'element.changed') {
            // that.elementChanged(e)
          } else if (eventType === 'element.click') {
            console.log('点击了element', e)
            // if (e.element.type === 'bpmn:Task') {
            // }
          } else if (eventType === 'element.updateLabel') {
            console.log('element.updateLabel', e.element)
          }
        })
      })
    }
  },
// 计算属性
  computed: {}
}
</script>

<style scoped>
.containers{
	background-color: #ffffff;
	width: 100%;
	height: calc(100vh - 52px);
}
.canvas{
	width: 100%;
	height: 100%;
}
.panel{
	position: absolute;
	right: 0;
	top: 0;
	width: 300px;
}
</style>