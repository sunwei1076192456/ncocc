<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">订单搜索</h4>
          </md-card-header>
          <md-card-content>
            <waybill-searchbar></waybill-searchbar>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">运单业务</h4>
            <p class="category">运单业务清单列表</p>
          </md-card-header>
          <md-card-content>
            <simple-table table-header-color="green">
            </simple-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { SimpleTable,WaybillSearchBar } from "@/components";
export default {
  components: {
    SimpleTable,
    WaybillSearchBar
  }
};
</script>
