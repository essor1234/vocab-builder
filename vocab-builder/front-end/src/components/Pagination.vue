<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
    
    <button
      v-for="page in totalPages"
      :key="page"
      @click="goToPage(page)"
      :class="{ active: currentPage === page }"
    >
      {{ page }}
    </button>
    
    <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    words: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    totalPages: {
    type: Number,
    required: true
  }
  },

  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.$emit('update:currentPage', this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('update:currentPage', this.currentPage + 1);
      }
    },
    goToPage(page) {
      this.$emit('update:currentPage', page);
    }
  }
};
</script>


<style>
.pagination {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.5rem;
  border-radius: 100%;
}

button.active {
  background-color: #007bff;
  color: white;
}
</style>
