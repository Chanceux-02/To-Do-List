<template>

  <h1>{{ title }}</h1>

  <div class="addTaskContainer">
      <input type="text" v-model="taskToBeAdded">
      <button @click="addTaskProcess">Add</button>
  </div>

  <a href="#" class="del-all" v-show="checked" @click="deleteSelected">Delete {{checked}} 
  <span v-if="checked < 2">task</span> <span v-else>tasks</span>
  </a>

  <p class="task-tobeadded">{{taskToBeAdded}}</p>
  <div class="todos" v-for="todo in todos" :key="todo.id">
    <div class="todo-data" :data-id="todo.id">
      <input type="checkbox" :id="'todo-' + todo.id" @click="select('todo-' +todo.id)">
      <input class="updateTast" @blur="hide($event)"  v-model="todo.title">
      <p class="title" @click="crossWord('todo-' + todo.id, $event)"  @dblclick.prevent="handleUpdate('todo-' + todo.id, $event)" >{{todo.title}}</p>
      <a href="#" @click.prevent="handleDelete('todo-' + todo.id, $event)">Delete</a>
    </div>
  </div>

  <div v-if="!todos" class="loading">
    <p>Loading Content...</p>
  </div>

</template>

<script>

import { ref, onMounted } from 'vue'
import getTodos from '../composables/getToDos'


export default {
  name: 'HomeView',
  components: {},
  setup(){

    let title = 'To Do List'
    const { todos, err, load } = getTodos()

   onMounted(async () => {
      await load();

      if (todos.value) {
        todos.value = todos.value.slice().sort((a, b) => b.id - a.id)
      }
    });


    let selected = ref([])
    let done = ref([])
    let checked = ref(0)
    let taskToBeAdded = ref('')

    const handleDelete = (id, event) => {

      selected.value = selected.value.filter(item => item !== id)
      todos.value = todos.value.filter(item => item.id != id.substring(5))
      event.currentTarget.parentNode.parentNode.remove()

    }

    const select = (id)=>{
      if (!selected.value.includes(id)) {
          selected.value.push(id)
          checked.value++
      }else{
         selected.value = selected.value.filter(item => item !== id)
          checked.value--
      }
    }

    const deleteSelected = ()=>{
      selected.value.forEach(element => {
          todos.value = todos.value.filter(item => item.id != element.substring(5))
          document.querySelector(`#${element}`).parentNode.parentNode.remove()
          selected.value = []
          checked.value = 0
      });
    }

    const crossWord = (id, event)=>{
        const task = event.target  

       console.log('test')
        
        if (!done.value.includes(id)) {
          done.value.push(id)   
          task.style.textDecoration = 'line-through';

        }else{
          done.value = done.value.filter(item => item !== id)
          task.style.textDecoration = '';
        }
    }

    const addTaskProcess = () => {

        const firstTodoElement = document.querySelector('.todos .todo-data').getAttribute('data-id')

        let test

        if (firstTodoElement) {
          test = firstTodoElement
          console.log(1)
        }else{
          console.log(0)
          test = 0
        }

        todos.value.unshift({
          "userId": 10,
          "id": parseInt(test) + 1,
          "title": taskToBeAdded.value,
          "completed": false
        })

        taskToBeAdded.value = ''

        console.log(todos.value)

    }

    const handleUpdate = (id, event) =>{
      console.log(id)
      event.target.style.display = "none";
      event.target.parentElement.querySelector('.updateTast').style.display = "block"; 
      event.target.parentElement.querySelector('.updateTast').focus(); 
    }

    const hide = (event) =>{
      event.target.style.display = "none";
      event.target.parentElement.querySelector('.title').style.display = "block"; 
    }

    return{
      title,
      todos,
      err,
      load,
      handleDelete,
      select,
      deleteSelected,
      crossWord,
      checked,
      taskToBeAdded,
      addTaskProcess,
      handleUpdate,
      hide
    }
  }

}
</script>

<style scoped>

  h1{
    text-align: center;
  }
  .todos{
    width: 80%;
    margin: auto;
    border-bottom: rgb(0, 0, 0, 0.2) 1px solid;
    padding: 0 1%;

  }
  .todos h4{
    text-align: start;
    flex-wrap: wrap;
  }
  .todos:hover{
   background: rgb(0, 0, 0, 0.2);
  }
  .todos input{
    border: none;
  }
  .todo-data{
    display: flex;
    justify-content: space-between;
    text-align: start;

  }
  a{
    padding: 0.5% 1%;
    margin: 2px 5px;
    text-decoration: none;
    border-radius: 5px;
    color: #2c3e50;
    font-weight: bold;
  }
  a:hover{
    color: blue;
  }

  .title{
    width: 60%;
    cursor: pointer;
  }

  .del-all{
    text-align: start;
    margin: 0 0 0 10%;
    border: #2c3e50 1px solid;
    border-radius: 5px;
    padding: 5px;
  }
  .addTaskContainer{
    margin: 4% 0;
    text-align: center;
  }
  .addTaskContainer input, button{
    border: 0.5px solid #2c3e50;
    border-radius: 5px;
    margin: 1%;
    padding: 0.7%;
  }
  .addTaskContainer input{
   width: 40%;
  }
  .task-tobeadded{
    width: 53%;
    margin: auto;
    margin-bottom: 2%;
  }
  .updateTast{
    display: none;
    color: #2c3e50;
    width: 60%;
    border: none;
  }
  .updateTast:focus {
    outline: none;
    font-size: 1em;
    font-weight: bold;
    word-wrap: break-word;
    background: rgb(0, 0, 0, 0);
    padding: 1.5% 0;
  }
  .loading{
    margin-top: 10%;
    text-align: center;
    font-weight: bold;
  }

</style>
