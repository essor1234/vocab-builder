<template>
    <div>
        <h1>Edit Word</h1>
        <word-form @createOrUpdate="createOrUpdate" :word=this.word></word-form>
    </div>
</template>

<script>
import { api } from "../helpers/helpers";
import WordForm from "../components/WordForm.vue"

export default ({
    name: 'edit',
    components: {
        'word-form': WordForm
    },
    data: function(){
        return {
            word: {}
        };
    },
    async mounted(){
        this.word = await api.getWord(this.$route.params.id)
    },
    methods: {
        createOrUpdate: async function(word){
            const res = await api.updateWord(word);
            // CHeck if the words already exist
            if(res.code == 11000){
                this.flash(' Objects already exist', 'error');
                return;
            } 
            this.flash('Word updated sucessfully', 'success');
            this.$router.push(`/words/${word._id}`);
        }
    }
})
</script>
