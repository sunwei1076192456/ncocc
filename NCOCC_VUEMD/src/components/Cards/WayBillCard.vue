<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="wayBillImage" />
    </div>
    <md-card-content>
      <div class="md-layout">
        <div class="md-layout-item md-size-100">
          <div class="md-content md-table-content md-scrollbar md-theme-default">
            <table>
              <tbody>
                <tr class="md-table-row">
                  <td class="md-table-cell">箱号</td>
                  <td class="md-table-cell">TEMU8662755</td>
                </tr>
                <tr class="md-table-row">
                  <td class="md-table-cell">箱号</td>
                  <td class="md-table-cell">TEMU8662755</td>
                </tr>
                <tr class="md-table-row">
                  <td class="md-table-cell">箱号</td>
                  <td class="md-table-cell">TEMU8662755</td>
                </tr>
                <tr class="md-table-row">
                  <td class="md-table-cell">箱号</td>
                  <td class="md-table-cell">TEMU8662755</td>
                </tr>
                <tr class="md-table-row">
                  <td class="md-table-cell">箱号</td>
                  <td class="md-table-cell">TEMU8662755</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: "waybill-card",
  props: {
    wayBillImage: {
      type: String,
      default: require("@/assets/img/waybill/EWaybill.jpg")
    }
  },
  data() {
    return {};
  }
};
</script>
<style></style>
