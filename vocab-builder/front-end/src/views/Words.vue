<template>
    <div>
        <h1>Words</h1>
        <div>{{visualWords}}</div>
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
                <tr v-for="(word, i) in visualWords" :key="i"
                 :visualWords="visualWords"
                  :currentPage="currentPage">
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

        <!-- Pagination -->
        <pagination :totalPages="totalPages" :currentPage="1"></pagination>
    </div>
</template>
<script>
    import {api} from '../helpers/helpers';

    import { Vue } from 'vue';
    import Pagination from '../components/Pagination.vue'


    export default {
  components: { Pagination },
        name: 'words',
        data(){
            return {
                words: [],
                // For getting user searching input
                input: "",
                // Pagination
                perPage: 5,
                currentPage: 1,
                visualWords: []
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
            updatePage(pageNum){
            this.currentPage = pageNum;
            this.updateVisualWords();
            // this.filteredList();
        },
            updateVisualWords(){
                const wordsToDisplay = this.filteredList.length ? this.filteredList : this.words;
                const start = (this.currentPage - 1) * this.perPage;
                const end = start + this.perPage;
                this.visualWords = wordsToDisplay.slice(start, end);
                if (this.visualWords.length == 0 && this.currentPage > 1){
                    this.updatePage(this.currentPage - 1);
                }
            }


            

        },
        
        computed: {
             filteredList() {
                // initialize as an empty string if this.input does not exsit
            const searchTerm = this.input ? this.input.toLowerCase() : '';
            return this.words.filter(word => 
                (word.english.toLowerCase().includes(searchTerm) || 
                word.french.toLowerCase().includes(searchTerm) || 
                word.german.toLowerCase().includes(searchTerm))
            );
            
        },
        totalPages(){
                // Formular is getting total items devide by item per page, then ceiling it
                return Math.ceil(this.words.length/this.perPage);
            },
        
        },

        async mounted(){
            this.words = await api.getWords();
            this.updateVisualWords();

        },
        comments: {
            'pagination' : Pagination
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



.error {
  background-color: tomato;
}
</style>