<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Simple Table</h4>
            <p class="category">Here is a subtitle for this table</p>
          </md-card-header>
          <md-card-content>
            <simple-table table-header-color="green"></simple-table>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <waybill-card> </waybill-card>
      </div>
    </div>
  </div>
</template>

<script>
import { SimpleTable } from "@/components";
import { WayBillCard } from "@/components";
export default {
  components: {
    WayBillCard,
    SimpleTable
  }
};
</script>
