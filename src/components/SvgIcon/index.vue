<template>
      <svg  :class="svgClass" v-bind="$attrs" :style="{ color: color,fontSize:size }">
        <use :xlink:href="iconName"></use>
    </svg>
</template>
    
<script setup>
const props = defineProps({
  name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: ''
    },
    size:{
      type:String,
      default:'1em'
    }
})

const iconName = computed(() => `#icon-${ props.name }`)
    const svgClass = computed(() => {
        if(props.name) return `svg-icon icon-${ props.name }`
        return 'svg-icon'
    })
</script>
    
<style lang="scss" scoped>
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  color: inherit;
  overflow: hidden;
  vertical-align: middle;
  fill: currentColor;
  stroke: currentColor;
}

.svg-fill {
  fill: currentColor;
  stroke: none;
}
</style>