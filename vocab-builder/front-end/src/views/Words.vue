<template>
    <div>
        <h1>Words</h1>
        <!-- Searching bar -->
        <input type="text" v-model="input" placeholder="Search words..." />
        <p>{{input}}</p>
        <p>{{filteredList}}</p>
        <p>{{words}}</p>


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
    import { ref } from "vue";


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
                word.english.toLowerCase().includes(searchTerm)
            );
        }
        },

        async mounted(){
            this.words = await api.getWords();
        }
    }
</script>