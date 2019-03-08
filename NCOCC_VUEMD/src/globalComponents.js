import DropDown from "./components/Dropdown.vue";
import WayBillCard from "./components/Cards/WayBillCard.vue";
import BusinessCard from "./components/Groups/BusinessCard.vue";

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component("drop-down", DropDown);
    Vue.component("waybill-card", WayBillCard);
    Vue.component("business-card", BusinessCard);
  }
};

export default GlobalComponents;
