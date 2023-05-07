<template>
  <div class="d-flex input-box">
    <input
      :value="props.title"
      type="text"
      class="form-control p-3 input"
      placeholder="Add new step"
      @keyup.enter="onSaveHandler"
      @input="emits('input', $event.target.value)"
    />
    <div
      class="button"
      @click="onSaveHandler"
    >
      Add
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
}

import { watch } from 'vue';

//props
const props = defineProps<Props>();

//emits
const emits = defineEmits(['on-search', 'input']);

//watchers
watch(
  () => props.title,
  (newData, oldData) => {
    if (newData !== oldData) {
      emits('input', newData);
    }
  }
);

//methods
const onSaveHandler = () => {
  emits('on-search');
};
</script>

<style scoped lang="scss">
.input-box {
  height: 40px;
  margin: 10px;
}

.input{
  margin-right: 10px;  
  &:focus{
    box-shadow: -5px 8px 0 -1px rgb(109 117 130 / 25%);
  }
}

.button {
  padding: 10px 20px;
  background-color: #66b949;
  border-radius: 25px;
  color: white;
  display: flex;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
}
</style>
