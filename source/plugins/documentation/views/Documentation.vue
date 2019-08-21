<template>
  <div>
    <v-btn @click="openDocumentation">Documentation</v-btn>
  </div>
</template>
<script>
const remote = node.require("electron").remote;
export default {
  name: "Documentation",
  data() {
    return {};
  },
  methods: {
    openDocumentation() {
      let child = new remote.BrowserWindow({
        width: 1180,
        height: 800,
        minWidth: 1150,
        minHeight: 700
      });
      child.loadFile("ui/js/documentation/index.html");
      console.log(__dirname);

      //console.log('file://'+path.join('source','ui','js','documentation','index.html'));
      //child.loadURL('file://'+path.join('source','ui','js','documentation','index.html'));
    }
  }
};
</script>