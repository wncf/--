<template>
  <van-dialog v-model:show="props.show"  @confirm="$emit('update:show')" @cancel="$emit('update:show')">
    <slot />
  </van-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})
defineEmits(['update:show'])
</script>
<style scoped></style>
