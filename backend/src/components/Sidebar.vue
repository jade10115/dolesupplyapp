<template>
  <div class="relative">
    <!-- Sidebar -->
    <div :class="['fixed inset-y-0 transform bg-red-700 p-5 w-72 transition-transform duration-300 ease-in-out z-40 shadow-lg', { '-translate-x-full': !isOpen, 'translate-x-0': isOpen }]">
      <div class="flex items-center justify-center mb-8">
        <h1 class="text-2xl font-bold text-white">DOLE-APP</h1>
      </div>
      <nav class="pt-4">
        <ul class="space-y-6">
          <li>
            <router-link 
              to="/Dashboard" 
              class="flex items-center space-x-4 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              active-class="bg-gray-700 font-bold"
            >
              <i class="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link 
              to="/Inventory" 
              class="flex items-center space-x-4 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              active-class="bg-gray-700 font-bold"
            >
              <i class="fas fa-boxes"></i>
              <span>Inventory</span>
            </router-link>
          </li>
          <li>
            <router-link 
              to="/employee" 
              class="flex items-center space-x-4 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              active-class="bg-gray-700 font-bold"
            >
              <i class="fas fa-users"></i>
              <span>Employees</span>
            </router-link>
          </li>
          <li>
            <router-link 
              to="/ris" 
              class="flex items-center space-x-4 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              active-class="bg-gray-700 font-bold"
            >
              <i class="fas fa-users"></i>
              <span>RIS</span>
            </router-link>
          </li>
          
        </ul>
      </nav>
    </div>

    <!-- Hamburger Button -->
    <button 
      @click="toggleSidebar" 
      class="fixed top-5 left-5 z-50 text-white bg-gray-900 p-2 rounded-full focus:outline-none shadow-lg transition-transform duration-300 ease-in-out"
      :class="{'translate-x-72': isOpen}"
    >
      <span v-if="isOpen">✖</span>
      <span v-else>☰</span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: true, // Default state is open
    };
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
      this.$emit('sidebar-toggled', this.isOpen); // Emit an event to notify parent
    },
  },
  watch: {
    isOpen(newValue) {
      if (newValue) {
        document.body.classList.add('sidebar-open');
      } else {
        document.body.classList.remove('sidebar-open');
      }
    },
  },
  mounted() {
    if (this.isOpen) {
      document.body.classList.add('sidebar-open');
    }
  },
};
</script>

<style scoped>
/* Sidebar Styles */
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

nav li {
  margin: 0;
  padding: 0;
}

nav a {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  text-decoration: none;
}

nav a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

nav a.active-class {
  background-color: rgba(255, 255, 255, 0.1);
  font-weight: bold;
}

/* Hamburger button and open body overlay */
body.sidebar-open {
  overflow: hidden; /* Prevent scrolling */
}

.fixed {
  left: 0;
}

/* Button shadow */
button {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Sidebar transition and hover effects */
nav a {
  color: white;
  transition: background-color 0.3s ease;
}
</style>
