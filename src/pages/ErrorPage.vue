<template>
  <div>
      <h1>Ooops</h1>
    <h3>It seems that error has occured</h3>
    <br />
    <br />
    <br />
    <h3 v-if="statusCode != null || message != null">Details:</h3>
    <p v-if="statusCode != null">Status code: {{ statusCode }}</p>
    <p v-if="message != null">Message: {{ message }}</p>
    <br />
    <br />
    <router-link 
        class="btn btn-outline-info"
        tag="button"
        :to="{name: 'Home'}"
        >Go back to tests</router-link>
  </div>
</template>

<script>
export default {
    data() {
        return {
          message: this.$router.currentRoute.query.message,
          statusCode: this.$router.currentRoute.query.statusCode,
        }
    }
}
</script>