<template>
    <div>
        <h1>New Word</h1>
        <word-form @createOrUpdate="createOrUpdate"></word-form>
        <div class="uploadCSV">
            <upload-csv></upload-csv>

        </div>
    </div>
</template>

<script>
import { api } from '../helpers/helpers';
import WordForm from '../components/WordForm.vue';
import UploadCSV from '../components/UploadCSV.vue';

export default ({
    name: 'new-word',
    components: {
        'word-form': WordForm,
        'upload-csv': UploadCSV
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

<style scoped>
.uploadCSV{
    margin-top: 20px;
}
</style>
