<template>
  <div>
    <Navbar :isSidebarOpen="isSidebarOpen" @sidebar-toggled="toggleSidebar" />
    <Sidebar :isOpen="isSidebarOpen" @sidebar-toggled="toggleSidebar" />
    <div :class="['transition-all duration-300 ease-in-out', { 'lg:ml-64': isSidebarOpen, 'ml-0': !isSidebarOpen }, 'pt-16']">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';

export default {
  components: {
    Navbar,
    Sidebar,
  },
  data() {
    return {
      isSidebarOpen: true,
    };
  },
  methods: {
    toggleSidebar(isOpen) {
      this.isSidebarOpen = isOpen;
      this.updateBodyMargin();
    },
    updateBodyMargin() {
      if (this.isSidebarOpen) {
        document.body.style.marginLeft = '2rem'; // Adjust margin when sidebar is open
      } else {
        document.body.style.marginLeft = '0'; // Reset margin when sidebar is closed
      }
    },
  },
};
</script>

<style scoped>
/* Ensure main content area adjusts with sidebar */
@media (min-width: 1024px) {
  body {
    transition: margin-left 0.3s ease-in-out;
  }
}

body {
  margin-left: 0; /* Default margin */
}
</style>



