<template>
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Card 1 -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Total Sales</h2>
        <p class="text-3xl font-bold">$25,000</p>
      </div>
      
      <!-- Card 2 -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">New Users</h2>
        <p class="text-3xl font-bold">1,200</p>
      </div>

      <!-- Card 3 -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Pending Orders</h2>
        <p class="text-3xl font-bold">150</p>
      </div>

      <!-- Card 4 -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Customer Feedback</h2>
        <p class="text-3xl font-bold">87%</p>
      </div>

      <!-- Card 5 -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">New Products</h2>
        <p class="text-3xl font-bold">24</p>
      </div>

      <!-- Card 6 -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Support Tickets</h2>
        <p class="text-3xl font-bold">35</p>
      </div>

      <!-- Card 7 -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Website Visits</h2>
        <p class="text-3xl font-bold">80,000</p>
      </div>

      <!-- Card 8 -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Revenue</h2>
        <p class="text-3xl font-bold">$150,000</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
