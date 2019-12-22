<template>
  <v-card
    class="mx-auto"
    max-width="600"
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
        <div v-if="activeElement  === 'Create new database'">
          <v-layout row wrap align-center>  
            <v-col :cols="8">
              <v-text-field
                v-model="newDbName"
                label="Choose a data base name"
                placeholder="newDatabase"
                :disabled="serverStarted"
              ></v-text-field>
            </v-col>
            <v-col :cols="4">
              <v-btn :disabled="serverStarted" @click="addDbToList()" color="success" text>Create</v-btn>
            </v-col>
          </v-layout>
        </div>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn 
        :disabled="serverStarted 
                    || (this.dropDownList.length < 2 
                    || activeElement  === 'Create new database')" 
        @click="startServer()" 
        color="success" 
        text
      >Start</v-btn>
      <v-btn :disabled="!serverStarted" @click="stopServer()" color="error" text>Stop</v-btn>
      <v-btn 
        :disabled="serverStarted 
                    || (this.dropDownList.length < 2 
                    || activeElement  === 'Create new database')" 
        @click="editQuestions()" 
        color="warning" 
        text
      >Edit questions</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import moment from 'moment';
  import Questions from './Questions.vue';

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
        this.dropDownList.push('Create new database');
        this.dropDownList = this.dropDownList.concat(await this.studio.ctf_admin.getAvailableDatabases());
        this.newDbName = "newDatabase" + moment().format('DDMMYYYYhhmm');

        this.dropDownList = this.dropDownList.map((item) => {
          item = item.replace(/.sqlite$/g, '');
          return item;
        });

        if (this.dropDownList.length == 1) {
          this.activeElement = this.dropDownList[0];
        } else if (this.dropDownList.length > 1) {
          this.activeElement = this.dropDownList[1]
        }
    },
    methods: {
      startServer() {
        this.studio.ctf_admin.startServer(this.portNumber, this.activeElement + '.sqlite');
        this.changeServerButtonState();
      },
      stopServer() {
        this.studio.ctf_admin.stopServer();
        this.changeServerButtonState();
      },
      changeServerButtonState() {
        this.serverStarted = !this.serverStarted;
      },
      addDbToList() {
        if (this.activeElement === 'Create new database') {
          if (this.dropDownList.includes(this.newDbName)) {
            this.newDbName += moment().format('DDMMYYYYhhmm');
          }
          this.activeElement = this.newDbName;
          this.dropDownList.push(this.activeElement);
        }
      },
      editQuestions() {
        this.studio.workspace.showDialog(Questions, {width: '700px', activeDb: this.activeElement});
      }
    }
	}
</script>