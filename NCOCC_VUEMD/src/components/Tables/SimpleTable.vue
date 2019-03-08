<template>
  <div>
    <md-table v-model="waybills" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="状态">{{ item.WaybillID }}</md-table-cell>
        <md-table-cell md-label="船期">{{ item.WaybillID }}</md-table-cell>
        <md-table-cell md-label="船名/船次">{{ item.country }}</md-table-cell>
        <md-table-cell md-label="类型">{{ item.city }}</md-table-cell>
        <md-table-cell md-label="客户简称">{{ item.salary }}</md-table-cell>
        <md-table-cell md-label="船公司">{{ item.salary }}</md-table-cell>
        <md-table-cell md-label="运单号">{{ item.salary }}</md-table-cell>
        <md-table-cell md-label="箱型">{{ item.salary }}</md-table-cell>
        <md-table-cell md-label="箱号">{{ item.salary }}</md-table-cell>
        <md-table-cell md-label="门点">{{ item.salary }}</md-table-cell>
        <md-table-cell md-label="联系人">{{ item.salary }}</md-table-cell>
        <md-table-cell md-label="联系电话">{{ item.salary }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      waybills: [
        {
          WaybillID: "Dakota Rice",
          salary: "$36,738",
          country: "Niger",
          city: "Oud-Turnhout"
        },
        {
          WaybillID: "Minerva Hooper",
          salary: "$23,738",
          country: "Curaçao",
          city: "Sinaai-Waas"
        },
        {
          WaybillID: "Sage Rodriguez",
          salary: "$56,142",
          country: "Netherlands",
          city: "Overland Park"
        },
        {
          WaybillID: "Philip Chaney",
          salary: "$38,735",
          country: "Korea, South",
          city: "Gloucester"
        },
        {
          WaybillID: "Doris Greene",
          salary: "$63,542",
          country: "Malawi",
          city: "Feldkirchen in Kārnten"
        },
        {
          WaybillID: "Mason Porter",
          salary: "$78,615",
          country: "Chile",
          city: "Gloucester"
        }
      ]
    };
  }
};
</script>
