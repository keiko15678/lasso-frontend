<template>
  <v-app id="inspire" v-show="$route.query.type === 'enabled' || $route.query.type === 'success'">
    <main>
      <nuxt />
    </main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

@Component
export default class LandingLayout extends Vue {
}
</script>
