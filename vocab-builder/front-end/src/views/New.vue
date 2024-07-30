<template>
    <div>
        <h1>New Word</h1>
        <word-form @createOrUpdate="createOrUpdate"></word-form>
    </div>
</template>

<script>
import { api } from '../helpers/helpers';
import WordForm from '../components/WordForm.vue'

export default ({
    name: 'new-word',
    components: {
        'word-form': WordForm
    },
    methods: {
        createOrUpdate: async function(word){
            const res = await api.createWord(word);
            if(res.code == 11000){
                this.flash('Word Existed', 'error');
                return;
            }
            
            this.flash('Word created', 'success');
            this.$router.push(`/words/${res._id}`);
        }
    }
})
</script>
