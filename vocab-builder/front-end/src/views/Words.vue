<template>
    <div>
        <h1>Words</h1>
        <!-- Searching bar -->

    <input type="text" v-model="input" placeholder="Search words..." />



        <table id="words" class="ui celled compact table">
            <thead>
                <tr>
                    <th>English</th>
                    <th>German</th>
                    <th>French</th>
                    <th colspan="3"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(word, i) in filteredList" :key="i">
                    <td>{{ word.english }}</td>
                    <td>{{ word.german }}</td>
                    <td>{{ word.french }}</td>
                    <td width="75" class="center aligned">
                        <router-link :to="{ name: 'show', params: { id: word._id } }">Show</router-link>
                    </td>
                    <td width="75" class="center aligned">
                        <router-link :to="{ name: 'edit', params: { id: word._id } }">Edit</router-link>
                    </td>
                    <td width="75" class="center aligned" @click.prevent="onDestroy(word._id)">
                        <a :href="`/words/${word._id}`">Destroy</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import {api} from '../helpers/helpers';

    import { Vue } from 'vue';


    export default {
        name: 'words',
        data(){
            return {
                words: [],
                input: "",
            };
        },
        methods: {
            async onDestroy(id){
                const sure = window.confirm("Are you sure?");
                if(!sure) return;
                await api.deleteWord(id);
                this.flash("Word deleted sucessfully!", 'success');
                const newWords = this.words.filter(word => word._id !== id);
                this.words = newWords;
            },
            

        },
        
        computed: {
             filteredList() {
                // initialize as an empty string
            const searchTerm = this.input ? this.input.toLowerCase() : '';
            return this.words.filter(word => 
                (word.english.toLowerCase().includes(searchTerm) || 
                word.french.toLowerCase().includes(searchTerm) || 
                word.german.toLowerCase().includes(searchTerm))
            );
        }
        },

        async mounted(){
            this.words = await api.getWords();
        }
    }
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

body {
  padding: 20px;
  min-height: 100vh;
  background-color: rgb(234, 242, 255);
}

input {
  display: block;
  width: 350px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white url("../assets/search-icon.svg") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.item {
  width: 350px;
  margin: 0 auto 10px auto;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

.fruit {
  background-color: rgb(97, 62, 252);
  cursor: pointer;
}

.error {
  background-color: tomato;
}
</style>