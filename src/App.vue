<template>
  <Button ref="buttonRef" loading>loading</Button>
  <Button ref="buttonRef" icon="arrow-up">Icon</Button>
  <Button plain>Plain Button</Button>
  <Button round>Round Button</Button>
  <Button circle>VK</Button>
  <Button disabled>Disabled Button</Button><br/><br/>

  <a href="#">123</a>
  <br />
  <Icon icon="user-secret" type="primary" color="red" />
  <Collapse v-model="openedValue" accordion>
    <Item name="a">
      <template #title>
        <h1>nice title a</h1>
      </template>
      <h1>headline title</h1>
      <div>this is content a</div>
    </Item>
    <Item name="b">
      <template #title>
        <h1>nice title b</h1>
      </template>
      <h1>headline title</h1>
      <div>this is content b</div>
    </Item>
    <Item name="c" disabled>
      <template #title>
        <h1>nice title c</h1>
      </template>
      <h1>headline title</h1>
      <div>this is content c</div>
    </Item>
  </Collapse>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import type { ButtonInstance } from './components/Button/types'

const buttonRef = ref<ButtonInstance | null>(null)

const openedValue = ref(['a'])
onMounted(() => {
  if (buttonRef.value) {
    console.log('button.value', buttonRef.value.ref)
  }
})
</script>

<style scoped>
</style>
