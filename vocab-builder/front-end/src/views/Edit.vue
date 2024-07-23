<template>
    <div>
        <h1>Edit Word</h1>
        <word-form :word=this.word></word-form>
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
    }
})
</script>
