<template>
  <div class="border rounded shadow pt-3 mt-3 w-50 main-container">
    <h1 class="text-center title-page">Steps to a productive day</h1>
    <todo-entry
      :title="todoTitle"
      @input="onChangeEntryHandler"
      @on-search="onSaveHandler()"
    />
    <ul class="list-group list-group-flush">
      <div class="border-top" />
      <todo-row
        :id="item.id"
        :title="item.title"
        :completed="item.completed"
        class="list-group-item"
        v-for="(item, index) in todos"
        :key="`todo-${index}`"
        @on-check="onCheckHandler(item)"
        @on-edit="onEditHandler(index, item)"
        @on-delete="onDeleteHandler(index, item)"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
//core
import { ref, onMounted } from 'vue';

//components
import { TodoEntry, TodoRow } from './components';

//types
import { Todo } from '../../services/types';

import { useStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
const store = useStore();

//reactive properties
const todos = ref<Todo[]>([]);
const selectedTodo = ref<Todo | null>(null);
const selectedTodoIndex = ref<number | null>(null);
const todoTitle = ref<string>();

//constants
const RECORDS_SIZE = 15;

//methods
const fetchTodos = async () => {
  const list: Todo[] = store.getters.list;
  todos.value = list.slice(0, RECORDS_SIZE);
};

const onCheckHandler = async (todo: Todo) => {
  if (todo?.id) {
    const payload = {
      ...todo,
      completed: !todo.completed,
    };

    if (!todo.isManually) {
      store.commit('updateTodo', payload);
    }

    //set record as completed
    todo.completed = payload.completed;
  }
};

const onChangeEntryHandler = (value: string) => {
  todoTitle.value = value;
};

const onEditHandler = async (todoIndex: number, todo: Todo) => {
  selectedTodo.value = { ...todo };
  selectedTodoIndex.value = todoIndex;
  todoTitle.value = todo.title;
};

const onDeleteHandler = async (todoIndex: number, todo: Todo) => {
  todos.value.splice(todoIndex, 1);

  store.commit('deleteTodo', todo);

  clearSelectedTodo();
};

const clearSelectedTodo = () => {
  selectedTodo.value = null;
  selectedTodoIndex.value = null;
  todoTitle.value = '';
};

const onSaveHandler = async () => {
  if (todoTitle.value) {
    const payload = {
      title: todoTitle.value,
      completed: selectedTodo.value?.completed ?? false,
      isManually: !selectedTodo.value?.isManually,
    };
    //add new
    if (!selectedTodo.value?.id) {
      store.commit('addTodo', {
        id: uuidv4(),
        ...payload,
      });
      const newList = store.getters.list;
      if (newList) {
        fetchTodos();
      }
    } else {
      //update existing
      if (!selectedTodo.value?.isManually) {
        store.commit('updateTodo', { ...payload, id: selectedTodo.value?.id });
      }
      todos.value[selectedTodoIndex.value!!].title = payload.title;
    }
    clearSelectedTodo();
  }
};

//lifecycle hooks
onMounted(() => {
  fetchTodos();
});
</script>

<style scoped lang="scss">
.main-container {
  padding: 30px;
  width: 900px;
  min-height: 400px;
  background-color: white;
  -webkit-border-radius: 53px;
  -webkit-border-top-right-radius: 7px;
  -webkit-border-bottom-left-radius: 7px;
  -moz-border-radius: 53px;
  -moz-border-radius-topright: 7px;
  -moz-border-radius-bottomleft: 7px;
  border-radius: 53px !important;
  border-top-right-radius: 7px !important;
  border-bottom-left-radius: 7px !important;
}

.title-page{
  font-weight: 200;
}

@media (max-width: 1100px) {
  .main-container {
    width: 95% !important;
  }
}
</style>
