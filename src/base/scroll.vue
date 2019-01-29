<template>
  <div ref="wrapper" >
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name:'scroll',
    props: {
      probeType: {
        type: Number,
        default: 2
      },
      bounce:{
        type:Boolean,
        default:false
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: true
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      scrollToEndFlag: {
        type: Boolean,
        default: false
      },
      messageList:'',
    },
    mounted() {
      setTimeout(() => {
        this._initScroll();
        //console.log(this.scroll.maxScrollY);
        this.refresh();
      },1000);
    },
    /*created() {
      setTimeout(() => {
        this._initScroll()
      }, 20);
    },*/
    activated() {
      setTimeout(() => {
        this._initScroll()
        //console.log(this.scroll.maxScrollY);
      }, 20);
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          bounce:this.bounce,
        })

        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            //me.$emit('scrollp', Math.round(pos.y))
            //console.log( Math.round(pos.y));
            //console.log(this.scroll.maxScrollY)
          }) 
        }

        if(this.scrollToEndFlag) {
          //console.log(this.scroll.maxScrollY);
            this.refresh();
            this.scroll.scrollTo(0,this.scroll.maxScrollY)
        };

        /*if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }*/

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll.scrollTo(0,this.scroll.maxScrollY)
      },
      /*scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },*/
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      chilFn(msg) {
        console.log(msg);
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      },
      messageList() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>

<style scoped>
</style>
