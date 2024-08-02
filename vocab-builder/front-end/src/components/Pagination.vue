<template>
  <div class="pagination">
    <button 
      class="pagination-button" 
      @click="prevPage" 
      :disabled="currentPage === 1"
    >
      Previous
    </button>

    <button
      class="pagination-button"
      v-for="page in totalPages"
      :key="page"
      @click="goToPage(page)"
      :class="{ active: currentPage === page }"
    >
      {{ page }}
    </button>

    <button 
      class="pagination-button" 
      @click="nextPage" 
      :disabled="currentPage === totalPages"
    >
      Next
    </button>
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


<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}

.pagination-button {
  padding: 10px 20px;
  border: 2px solid #333;
  border-radius: 50%;
  background-color: white;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.pagination-button:hover:not(.active) {
  background-color: #333;
  color: white;
}

.pagination-button:disabled {
  cursor: not-allowed;
  background-color: #f5f5f5;
  color: #999;
  border-color: #ccc;
}

.pagination-button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}
</style>
