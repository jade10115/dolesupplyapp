<template>
  <div class="p-4">
    <!-- Add Employee Button -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Employees List</h2>
      <button
        @click="openAddModal"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Release Product
      </button>
    </div>

    <!-- Responsive Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr class="bg-gray-800 text-white">
            <th class="py-3 px-4 text-left">Employee Name</th>
            <th class="py-3 px-4 text-left">Designation</th>
            <th class="py-3 px-4 text-left">Assigned at</th>
            <th class="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emp in employees" :key="emp.id" class="border-b hover:bg-gray-100">
            <td class="py-3 px-4">{{ emp.first_name }} {{ emp.middle_name }} {{ emp.last_name }} {{ emp.ext_name }}</td>
            <td class="py-3 px-4">{{ emp.designation }}</td>
            <td class="py-3 px-4">{{ emp.assigned_at }}</td>
            <td class="py-3 px-4">
              <button @click="openEditModal(emp)" class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                Edit
              </button>
              <button @click="openDeleteModal(emp.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Employee Modal -->
    <div v-if="isAddModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Add Employee</h2>
          <button @click="closeAddModal" class="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <form @submit.prevent="addEmployee" class="space-y-4">
          <!-- Form Fields -->
          <div v-for="field in fields" :key="field.name">
            <label :for="field.name" class="block text-sm font-medium text-gray-700">{{ field.label }}</label>
            <input
              v-model="newEmployee[field.name]"
              :id="field.name"
              type="text"
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end">
            <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Employee Modal -->
    <div v-if="isEditModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Edit Employee</h2>
          <button @click="closeEditModal" class="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <form @submit.prevent="updateEmployee" class="space-y-4">
          <div v-for="field in fields" :key="field.name">
            <label :for="field.name" class="block text-sm font-medium text-gray-700">{{ field.label }}</label>
            <input
              v-model="currentEmployee[field.name]"
              :id="field.name"
              type="text"
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div class="flex justify-end">
            <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Employee Modal -->
    <div v-if="isDeleteModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Delete Employee</h2>
          <button @click="closeDeleteModal" class="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <p>Are you sure you want to delete this employee?</p>
        <div class="flex justify-end mt-4">
          <button @click="deleteEmployee" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
          <button @click="closeDeleteModal" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 ml-2">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      employees: [],
      isAddModalOpen: false,
      isEditModalOpen: false,
      isDeleteModalOpen: false,
      newEmployee: {
        first_name: '',
        middle_name: '',
        last_name: '',
        ext_name: '',
        designation: '',
        assigned_at: '',
      },
      currentEmployee: {},
      employeeToDelete: null,
      fields: [
        { name: 'first_name', label: 'First Name' },
        { name: 'middle_name', label: 'Middle Name' },
        { name: 'last_name', label: 'Last Name' },
        { name: 'ext_name', label: 'Extension Name' },
        { name: 'designation', label: 'Designation' },
        { name: 'assigned_at', label: 'Assigned At' }
      ],
    };
  },

  mounted() {
    this.getEmployees();
  },

  methods: {
    getEmployees() {
      axios
        .get('http://localhost:8000/api/employees')
        .then((response) => {
          this.employees = response.data;
        })
        .catch((error) => {
          console.error('Error fetching employees:', error);
        });
    },

    openAddModal() {
      this.isAddModalOpen = true;
    },

    closeAddModal() {
      this.isAddModalOpen = false;
    },

    addEmployee() {
      axios
        .post('http://localhost:8000/api/employees', this.newEmployee)
        .then((response) => {
          this.employees.push(response.data);
          this.closeAddModal();
          Swal.fire('Success', 'Employee added successfully', 'success');
        })
        .catch((error) => {
          Swal.fire('Error', 'Failed to add employee', 'error');
          console.error(error);
        });
    },

    openEditModal(employee) {
      this.currentEmployee = { ...employee };
      this.isEditModalOpen = true;
    },

    closeEditModal() {
      this.isEditModalOpen = false;
    },

    updateEmployee() {
      axios
        .put(`http://localhost:8000/api/employees/${this.currentEmployee.id}`, this.currentEmployee)
        .then(() => {
          const index = this.employees.findIndex((emp) => emp.id === this.currentEmployee.id);
          if (index !== -1) {
            this.employees[index] = { ...this.currentEmployee };
          }
          this.closeEditModal();
          Swal.fire('Success', 'Employee updated successfully', 'success');
        })
        .catch((error) => {
          Swal.fire('Error', 'Failed to update employee', 'error');
          console.error(error);
        });
    },

    openDeleteModal(employeeId) {
      this.employeeToDelete = employeeId;
      this.isDeleteModalOpen = true;
    },

    closeDeleteModal() {
      this.isDeleteModalOpen = false;
      this.employeeToDelete = null;
    },

    deleteEmployee() {
      axios
        .delete(`http://localhost:8000/api/employees/${this.employeeToDelete}`)
        .then(() => {
          this.employees = this.employees.filter((emp) => emp.id !== this.employeeToDelete);
          this.closeDeleteModal();
          Swal.fire('Success', 'Employee deleted successfully', 'success');
        })
        .catch((error) => {
          Swal.fire('Error', 'Failed to delete employee', 'error');
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
button {
  transition: background-color 0.3s ease;
}

.bg-opacity-50 {
  backdrop-filter: blur(5px);
}
</style>
