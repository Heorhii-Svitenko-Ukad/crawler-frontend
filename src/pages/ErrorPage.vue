<template>
  <div>
      <h1>Ooops</h1>
    <h3>It seems that error has occured</h3>
    <br />
    <br />
    <br />
    <h3>Details:</h3>
    <p v-if="StatusCode">Status code: {{ StatusCode }}</p>
    <p v-if="Message">Message: {{ Message }}</p>
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
    props: ['StatusCode', 'Message'],
    data() {
        return {

        }
    }
}
</script>