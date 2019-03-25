<template>
  <form class="form-horizontal">
    <md-card>
      <md-card-content>
        <div class="md-layout">
          <label class="md-layout-item md-size-30 md-form-label">客户简称 :</label>
          <div class="md-layout-item">
            <md-field>
              <md-input v-model="disabled" type="text"></md-input>
            </md-field>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
export default {
    name: "waybill-searchbar",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {}
}
</script>
<style>

</style>