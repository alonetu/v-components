<template>
  <div class="v-tooltip" v-on="outerEvents" ref="popperContainerNode">
    <div class="v-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot />
    </div>
    <div v-if="isOpen" class="v-tooltip__popper" ref="popperNode">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from "vue";
import { createPopper } from '@popperjs/core'
import type { Instance } from '@popperjs/core'
import type { TooltipProps, TooltipEmits } from "./types";
import useClickOutside from '../../hooks/useClickOutside'

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: "bottom",
  trigger: 'hover'
});
const emits = defineEmits<TooltipEmits>();
const isOpen = ref(false);
const popperNode = ref<HTMLElement>();
const triggerNode = ref<HTMLElement>();
const popperContainerNode = ref<HTMLElement>()
let popperInstance: Instance | null = null;
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})

const togglePopper = () => {
  isOpen.value = !isOpen.value;
  emits("visible-change", isOpen.value);
};

const open = () => {
  console.log('open')
  isOpen.value = true;
  emits("visible-change", true);
};

const close = () => {
  console.log('close')
  isOpen.value = false;
  emits("visible-change", false);
}

useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value) {
    close()
  }
})

const attachEvents = () => {
  console.log('attachEvents', props.trigger)
  if (props.trigger === 'hover') {
    // 动态绑定事件
    events['mouseenter'] = open
    outerEvents['mouseleave'] = close
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}

attachEvents()

watch(() => props.trigger, (newTrigger, oldTrigger) => {
  if (newTrigger !== oldTrigger) {
    // clear the events
    events = {}
    outerEvents = {}
    attachEvents()
  }
})
watch(isOpen, (newValue) => {
  if (newValue) {
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(triggerNode.value, popperNode.value, {
        placement: props.placement
      })
    } else {
      popperInstance?.destroy()
    }
  }
}, {
  flush: 'post'
})
</script>
