<template>
  <div class="tabs">
    <div class="tabs__left">
      <TabsPanel :items="tabsItems" @change="handleChangeTab" />
    </div>
    <div class="tabs__right">
      <component :is="activeTabContent.tab_content"></component>
    </div>
  </div>
</template>

<script setup>
import TabsPanel from "~/components/Tabs/components/TabsPanel.vue";
import TabsContentUsers from "~/components/Tabs/components/TabsContentUsers.vue";
import TabsContentShops from "~/components/Tabs/components/TabsContentShops.vue";
import TabsContentCustomers from "~/components/Tabs/components/TabsContentCustomers.vue";

const activeTab = ref(0);
const tabsItems = reactive([
  {
    title: "Users",
    tab_content: TabsContentUsers
  },
  {
    title: "Shops",
    tab_content: TabsContentShops
  },
  {
    title: "Customers",
    tab_content: TabsContentCustomers
  },
]);

const activeTabContent = computed(() => tabsItems[activeTab.value])
const handleChangeTab = (index) => activeTab.value = index
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  flex-direction: row;
  min-height: 400px;

  &__left {
    background-color: rgba(79, 80, 75, 0.41);
    padding: 20px;
    width: 200px;
  }

  &__right {
    background-color: rgba(154, 205, 50, 0.41);
    padding: 20px;
    width: 100%;
  }
}
</style>
