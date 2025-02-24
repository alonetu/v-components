<template>
  <i class="v-icon" :class="{[`v-icon--${type}`]: type}" :style="customStyle" v-bind="$attrs">
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { omit } from 'lodash-es'
import type { IconProps } from './types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineOptions({
  name: 'VIcon',
  inheritAttrs: false // 透传，使透传不再绑定到根节点上
})

const props = defineProps<IconProps>()
// 这里使用computed包裹是因为只修改了一次，没有响应式效果
const filterProps = computed(() => omit(props, ["type", "color"]))
const customStyle = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>
