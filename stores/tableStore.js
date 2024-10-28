import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useTableStore = defineStore("tableStore", () => {
  const tables = ref([]);
  const tablesData = ref([]);

  const fetchTables = async () => {
    try {
      const responseTables = await axios.get("http://localhost:8888/tables");
      tables.value = responseTables.data;
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  const fetchTablesData = async (nameTable) => {
    try {
      tablesData.value = [];
      const responseTablesData = await axios.get(
        `http://localhost:8888/${nameTable}`
      );
      tablesData.value = responseTablesData.data.data;
      console.log(tablesData.value, "Test server");
    } catch (error) {
      console.error(`Error fetching data for table ${nameTable}:`, error);
    }
  };

  return {
    tables,
    tablesData,
    fetchTables,
    fetchTablesData,
  };
});
