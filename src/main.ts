import { createApp } from 'vue'
import { createStore } from 'vuex'
import router from './router';

//components
import App from './App.vue';

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore({
    state() {
        return{
            list:[
                { id: 2, title: 'Go for a walk', completed: false},
                { id: 3, title: 'Cook chocolate chips', completed: false},
                { id: 1, title: 'Journal daily objectives', completed: false},
            ]
        }
    }, 
    getters: {
        list (state) {
            return state.list;
        }
    },
    mutations: {
        loadStore() {
            if(localStorage.getItem('store')) {
                try {
                    this.replaceState(JSON.parse(localStorage.getItem('store')));
                }
                catch(e) {
                    console.log('Could not initialize store', e);
                }
            }
        },
        addTodo (state, item) {
            if(item.id !== undefined && typeof item.title == 'string' && typeof item.completed == 'boolean') {
                state.list.push({
                    id: item.id,
                    title: item.title,
                    completed: item.completed
                });
            }
        },
        updateTodo (state, item) {

            let id = item.id;
            let completed = item.completed;
            let title = item.title;

            let findEl = state.list.find((x) => x.id == id);
            if(findEl !== null) {
                if(completed !== undefined) {
                    findEl.completed = completed;
                }
                if(title !== undefined) {
                    findEl.title = title;
                }
            }
            else {
                console.log(`List Item ${id} couldn't be found`);
            }
        },
        deleteTodo (state, item) {
            let id = item.id;
            let removedEl = state.list.findIndex((x) => x.id == id);
            if(removedEl !== null) {
                state.list.splice(removedEl, 1);
            }
        },
    }
});

store.subscribe((mutation, state) => {
    localStorage.setItem('store', JSON.stringify(state));
})

createApp(App).use(router).use(store).mount('#app');
