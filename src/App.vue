
<template>
<div class="px-6 flex h-[100vh] items-center justify-center">
    <div class="lg:w-1/2 sm:w-2/3 w-full mx-auto border border-black p-10">
        <div class="card flex justify-center">
      <Dropdown v-model="selectedUnions" :options="places" filter optionLabel="name" placeholder="Select Your Union" class="w-full border border-green-800 mb-40">
          <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center">
                  <div>{{ slotProps.value.name }}</div>
              </div>
              <span v-else>
                  {{ slotProps.placeholder }}
              </span>
          </template>
          <template #option="slotProps">
              <div class="flex items-center">
                  <div>{{ slotProps.option.name }} - ( {{ slotProps.option.bn_name }} )</div>
              </div>
          </template>
      </Dropdown>
  </div>

  <div>
    <h1 class="text-xl font-normal"> Selected Union: <span class="font-semibold">{{  selectedUnions.name }} - ( {{  selectedUnions.bn_name }} )</span></h1>
    <h1 class="text-xl font-normal"> Selected Upazila: <span class="font-semibold">{{ selectedUpazila.name }} - ( {{ selectedUpazila.bn_name }} )</span></h1>
    <h1 class="text-xl font-normal"> Selected District: <span class="font-semibold">{{ selectedDristrict.name }} - ( {{ selectedDristrict.bn_name }} )</span></h1>
    <h1 class="text-xl font-normal"> Selected Divisions: <span class="font-semibold">{{ selectedDevision.name }} - ( {{ selectedDevision.bn_name }} )</span></h1>
  </div>
    </div>
</div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, watch } from "vue";


const places = ref([]);

const selectedUnions = ref("")
const selectedUpazila = ref("")
const selectedDristrict = ref("")
const selectedDevision = ref("")

onMounted(async () => {
      try {
        const response = await axios.get('unions.json');
        // Handle the response data here
        // console.log(response.data[2].data);
        places.value = response.data[2].data;
      } catch (error) {
        // Handle errors here
        console.error('Error fetching data:', error);
      }
    });

    watch(
      () => selectedUnions.value,
      async (newVal, oldVal) => {
        // Introduce a delay of 300 milliseconds before executing the watch logic
        await new Promise((resolve) => setTimeout(resolve, 300));

        try {
          const response = await axios.get('upazilas.json');
          // Handle the response data here
          const filterUpazila = response.data[2].data.find((upaz) => upaz.id === newVal.upazilla_id);

          selectedUpazila.value = filterUpazila;
        } catch (error) {
          // Handle errors here
          console.error('Error fetching data:', error);
        }
      }
    );

    watch(
      () => selectedUpazila.value,
      async (newVal, oldVal) => {
        // Introduce a delay of 300 milliseconds before executing the watch logic
        await new Promise((resolve) => setTimeout(resolve, 300));
        
        try {
            const response = await axios.get('districts.json');
            // Handle the response data here
          const filterDistrict = response.data[2].data.find((dis) => dis.id == newVal.district_id);

          selectedDristrict.value = filterDistrict;
        } catch (error) {
          // Handle errors here
          console.error('Error fetching data:', error);
        }
      }
    );

    watch(
      () => selectedDristrict.value,
      async (newVal, oldVal) => {
        // Introduce a delay of 300 milliseconds before executing the watch logic
        await new Promise((resolve) => setTimeout(resolve, 300));
        
        try {
            const response = await axios.get('divisions.json');
            // Handle the response data here
          const filterDivision = response.data[2].data.find((div) => div.id == newVal.division_id);

          selectedDevision.value = filterDivision;
        } catch (error) {
          // Handle errors here
          console.error('Error fetching data:', error);
        }
      }
    );


</script>


<style>
input.p-dropdown-filter.p-inputtext.p-component {
    padding: 10px 20px;
    border: 1px solid #333;
}
</style>