<template>
  <v-dialog v-model="open" max-width="600">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>

      <v-card-text>{{message}}</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="red darken-1" icon @click="open = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['open', 'title', 'message'],
  mounted () {
    console.log(this.open)
  }
}
</script>

<style>
</style>
