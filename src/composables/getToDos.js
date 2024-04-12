
import {ref} from 'vue'

const getTodos = () =>{
    const todos = ref(null)
    const err = ref(null)

    const load = async () => {

        try {
          let data = await fetch('https://jsonplaceholder.typicode.com/todos')

          // console.log(data)
          if (!data.ok) {
            throw Error('no data found')
          }
          todos.value = await data.json();
        } catch (error) {
          err.value = error.message
          // console.log(err.value)
        }
    }

    return { todos, err, load }
}

export default getTodos
