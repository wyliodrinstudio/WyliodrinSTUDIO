<template>
  <v-alert
    style="margin: 0; min-width: 300px"
    :value="true"
    @input="$emit('submit')"
    :dismissible="dismissible"
    :type="type"
  >
    {{ text }}
    <pre>ueryweuiyriuew fdskjf  feurheiwyriuewyi</pre>
    
  </v-alert>
</template>
<script>


export default {
  components: {
    
  },
  layout: ['notification', { showClose: false }],
  props: {
    type: {
      type: String,
      default: () => 'info'
    },
    actions: [ Array, Object ],
    text: String,
    dismissible: {
      type: Boolean,
      default: true
    }
  }
}
</script>
