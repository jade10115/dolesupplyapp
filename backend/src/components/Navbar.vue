<template>
  <div class="bg-blue-900 text-white py-4 px-6 fixed w-full z-40 transition-all duration-300 ease-in-out"
       :class="{'pl-72': isSidebarOpen}">
    <div class="flex items-center justify-between">
      <!-- Responsive heading based on sidebar state -->
      <h1 :class="['text-lg font-bold transition-all duration-300 ease-in-out', { 'text-xl pl-10': isSidebarOpen }]">
        DOLE-APP
      </h1>
      <button 
        @click="$emit('sidebar-toggled', !isSidebarOpen)" 
        class="text-white focus:outline-none lg:hidden"
      >
        <!-- Conditional rendering of the icon -->
        <span v-if="isSidebarOpen">✖</span>
        <span v-else>☰</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isSidebarOpen: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Additional styles for responsiveness */
</style>
