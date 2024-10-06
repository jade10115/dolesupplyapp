
<template>
  
  <div class="p-4">
    <!-- Add Product Button -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Product List</h2>
      <button
        @click="openAddModal"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Product
      </button>
    </div>

    <!-- Responsive Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr class="bg-gray-800 text-white">
            <th class="py-3 px-4 text-left">Product Name</th>
            <th class="py-3 px-4 text-left">Category</th>
            <th class="py-3 px-4 text-left">Price</th>
            <th class="py-3 px-4 text-left">Measurement</th>
            <th class="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id" class="border-b hover:bg-gray-100">
            <td class="py-3 px-4">{{ product.item_name }}</td>
            <td class="py-3 px-4">{{ product.description }}</td>
            <td class="py-3 px-4">{{ product.price }}</td>
            <td class="py-3 px-4">{{ product.unit_of_measurement }}</td>
            <td class="py-3 px-4">
              <button @click="openEditModal(product)" class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                Edit
              </button>
              <button @click="deleteProduct(product.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Product Modal -->
    <div v-if="isAddModalOpen" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div class="modal-container bg-white w-11/12 md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg">
        <h3 class="text-xl font-semibold mb-4">Add New Product</h3>
        <form @submit.prevent="addProduct">
          <div class="mb-4">
            <label class="block text-gray-700">Product Name</label>
            <input v-model="newProduct.item_name" type="text" class="w-full px-4 py-2 border rounded-lg focus:outline-none" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Description</label>
            <input v-model="newProduct.description" type="text" class="w-full px-4 py-2 border rounded-lg focus:outline-none" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Price</label>
            <input v-model="newProduct.price" type="number" class="w-full px-4 py-2 border rounded-lg focus:outline-none" required />
          </div>
          <div class="flex justify-between">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Product
            </button>
            <button type="button" @click="closeAddModal" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Product Modal -->
    <div v-if="isEditModalOpen" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div class="modal-container bg-white w-11/12 md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg">
        <h3 class="text-xl font-semibold mb-4">Update Product</h3>
        <form @submit.prevent="updateProduct">
          <div class="mb-4">
            <label class="block text-gray-700">Product Name</label>
            <input v-model="currentProduct.item_name" type="text" class="w-full px-4 py-2 border rounded-lg focus:outline-none" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Category</label>
            <input v-model="currentProduct.description" type="text" class="w-full px-4 py-2 border rounded-lg focus:outline-none" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Price</label>
            <input v-model="currentProduct.price" type="number" class="w-full px-4 py-2 border rounded-lg focus:outline-none" required />
          </div>
          <div class="flex justify-between">
            <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Update Product
            </button>
            <button type="button" @click="closeEditModal" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';
export default {
  data() {
    return {
      products: [],
      isAddModalOpen: false,
      isEditModalOpen: false,
      newProduct: {
        item_name: '',
        description: '',
        price: null,
        qty :'23',
        unit_of_measurement:'pcs',
      },
      currentProduct: {
        id: null,
        name: '',
        description: '',
        price: null,
      },
    };
  },

  mounted() {
    this.getProducts();
  },

  methods: {
    getProducts() {
      axios
        .get('http://localhost:8000/api/products')
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    },

    openAddModal() {
      this.isAddModalOpen = true;
    },

    closeAddModal() {
      this.isAddModalOpen = false;
    },
    openEditModal(product) {
    this.currentProduct = { ...product };  // Clone the product object
    this.isEditModalOpen = true;
  },

  closeEditModal(product) {
    this.currentProduct = { ...product };  // Clone the product object
    this.isEditModalOpen = false;
  },

    addProduct() {
  axios.post('http://localhost:8000/api/products', this.newProduct)
    .then(response => {
      this.products.push(response.data);
      this.closeAddModal();
      Swal.fire({
        icon: 'success',
        title: 'Product Added',
        text: 'The product has been added successfully!',
      });
      this.newProduct="";
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add product.',
      });
      console.error('Error adding product:', error.response || error.message);
    });
},


updateProduct() {
  axios.put(`http://localhost:8000/api/products/${this.currentProduct.id}`, this.currentProduct)
    .then(response => {
      const index = this.products.findIndex(p => p.id === this.currentProduct.id);
      if (index !== -1) {
        this.products[index] = response.data;
      }
      this.closeEditModal();
      Swal.fire({
        icon: 'success',
        title: 'Product Updated',
        text: 'The product has been updated successfully!',
      });
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update product.',
      });
      console.error('Error updating product:', error);
    });
},

deleteProduct(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`http://localhost:8000/api/products/${id}`)
        .then(() => {
          this.products = this.products.filter(product => product.id !== id);
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The product has been deleted successfully.',
          });
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete product.',
          });
          console.error('Error deleting product:', error);
        });
    }
  });
},
  },
};
</script>

<style scoped>
.modal-container {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.bg-opacity-50 {
  backdrop-filter: blur(5px);

  
}
</style>
