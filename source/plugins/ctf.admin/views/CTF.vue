<template>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">CTF Admin Panel</div>
        <v-list-item-title class="headline mb-1">Server Options</v-list-item-title>
        <v-text-field
            v-model="portNumber"
            label="Server Port"
            placeholder="5000 (default port)"
            :disabled="serverStarted"
        ></v-text-field>
        <v-overflow-btn
          :items="dropDownList"
          label="Choose Database"
          v-model="activeElement"
          :disabled="serverStarted"
        ></v-overflow-btn>
        <v-text-field
          v-model="newDbName"
          label="Choose a data base name"
          placeholder="newDatabase"
          :disabled="serverStarted"
          v-if="activeElement  === 'Create new database'"
        ></v-text-field>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn :disabled="serverStarted" @click="startServer()" color="success" text>Start</v-btn>
      <v-btn :disabled="!serverStarted" @click="stopServer()" color="error" text>Stop</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import moment from 'moment';

	export default {
    name: 'CTF',
    data() {
      return {
        serverStarted: false,
        portNumber: undefined,
        dropDownList: [],
        activeElement: undefined,
        newDbName: undefined
      }
    },
    async created() {
        let dbPath = await this.studio.ctf_admin.getDbPath();
        this.dropDownList.push('Create new database');
        this.dropDownList = this.dropDownList.concat(await this.studio.ctf_admin.getAvailableDatabases(dbPath));
        this.newDbName = "newDatabase" + moment().format('DDMMYYYYhhmm');
      
        if (this.dropDownList.length == 1) {
          this.activeElement = this.dropDownList[0];
        } else if (this.dropDownList.length > 1) {
          this.activeElement = this.dropDownList[1]
        }
    },
    methods: {
      startServer() {
        if (this.activeElement === 'Create new database') {
          if (this.dropDownList.includes(this.newDbName)) {
            this.newDbName += moment().format('DDMMYYYYhhmm');
          }
          this.activeElement = this.newDbName;
          this.dropDownList.push(this.activeElement);
        }
        
        this.studio.ctf_admin.startServer(this.portNumber, this.activeElement);
        this.changeServerButtonState();
      },
      stopServer() {
        this.studio.ctf_admin.stopServer();
        this.changeServerButtonState();
      },
      changeServerButtonState() {
        this.serverStarted = !this.serverStarted;
      }
    }
	}
</script>