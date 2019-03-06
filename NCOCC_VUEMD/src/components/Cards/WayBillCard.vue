<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="wayBillImage" />
    </div>
    <md-card-content>
      <h6 class="category text-gray">CEO / Co-Founder</h6>
      <h4 class="card-title">Alec Thompson</h4>
      <p class="card-description">
        Don't be scared of the truth because we need to restart the human
        foundation in truth And I love you like Kanye loves Kanye I love Rick
        Owens’ bed design but the back is...
      </p>
      <md-button class="md-round md-success">Follow</md-button>
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
