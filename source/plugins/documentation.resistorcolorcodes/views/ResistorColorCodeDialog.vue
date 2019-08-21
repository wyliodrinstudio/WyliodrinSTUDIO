<template>
  <v-layout row justify-center>
    <v-card>
      <v-toolbar>
        <v-toolbar-title>
          <div class="md-toolbar-tools">
            <span>{{$t('TOOLBAR_RESISTOR_COLOR_CODE')}}</span>
          </div>
        </v-toolbar-title>
      </v-toolbar>
      <v-tabs>
        <v-tab @click="CtN=true">
          <v-tab-label>{{ $t('RESISTOR_COLORCODE_FROM_COLOR_TO_NUMBER')}}</v-tab-label>
        </v-tab>
        <v-tab @click="CtN=false">
          <v-tab-label>{{ $t('RESISTOR_COLORCODE_FROM_NUMBER_TO_COLOR')}}</v-tab-label>
        </v-tab>
      </v-tabs>
      <v-card-text v-if="CtN">
        <div layout="row" layout-padding>
          <label>{{ $t('RESISTOR_COLORCODE_STRIPES')}}</label>
          <select v-model="number">
            <option value="4">{{ $t('VALUE_FOUR')}}</option>
            <option value="5">{{ $t('VALUE_FIVE')}}</option>
          </select>

          <label>{{ $t('RESISTOR_COLORCODE_STRIPE')}} 1</label>
          <select v-model="color1">
            <option
              :value="index"
              v-for="(color, index) in colors"
              :key="index"
            >{{color}}</option>
          </select>

          <label>{{ $t('RESISTOR_COLORCODE_STRIPE')}} 2</label>
          <select v-model="color2">
            <option
              :value="index"
              v-for="(color, index) in colors"
              :key="index"
            >{{color}}</option>
          </select>
          <label v-show="number==5">{{ $t('RESISTOR_COLORCODE_STRIPE')}} 3</label>
          <select v-show="number==5" v-model="color3">
            <option v-show="number==5"
              :value="index"
              v-for="(color, index) in colors"
              :key="index"
            >{{color}}</option>
          </select>

          <label>{{ $t('RESISTOR_COLORCODE_STRIPE')}} {{4-(5-number)}}</label>
          <select v-model="color4">
            <option
              :value="color.value"
              v-for="(color, index) in multiplier"
              :key="index"
            >{{color.color}}</option>
          </select>

          <label>{{ $t('RESISTOR_COLORCODE_STRIPE')}} {{5-(5-number)}}</label>
          <select v-model="color5">
            <option
              :value="color.value"
              v-for="(color, index) in tolerance"
              :key="index"
            >{{color.color}}</option>
          </select>

          <div>
            <span>
              <b>{{ $t('VALUE_VALUE')}}:</b>
              {{r}} {{u}}&Omega;
            </span>
            <span style="padding-left:10px;">&plusmn;{{color5}}%</span>
          </div>
        </div>
      </v-card-text>
      <v-card-text v-else>
        <div>
          {{$t('RESISTOR_COLORCODE_RESISTANCE')}} {{$t('RESISTOR_COLORCODE_STRIPES')}} {{$t('VALUE_TOLERANCE')}}<br>
          <input
            :label="$t('RESISTOR_COLORCODE_RESISTANCE')"
            placeholder="Enter a number"
            v-model="Secondvaluenumber"
          />
          <b>&Omega;</b>

          <select v-model="Secondvaluestripes" :label="$t('RESISTOR_COLORCODE_STRIPES')">
            <option value="4">{{ $t('VALUE_FOUR')}}</option>
            <option value="5">{{ $t('VALUE_FIVE')}}</option>
          </select>

          <select v-model="Secondvaluetolerance" :label="$t('VALUE_TOLERANCE')">
            <option
              v-for="(value,index) in Secondtolerance"
              :key="index"
              :value="value.color"
            >{{value.value}}</option>
          </select>
        </div>

        <div>
          <span>
            <b>{{ $t('VALUE_VALUE') }}:</b>
            {{Secondr}} {{Secondu}}&Omega;
          </span>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="close" ref="reference">{{$t('EXIT')}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
const mapGetters = require("vuex").mapGetters;
module.exports = {
  name: "ColorCodeDialog",
  data() {
    return {
      CtN: true,
      colors: [
        "Black",
        "Brown",
        "Red",
        "Orange",
        "Yellow",
        "Green",
        "Blue",
        "Violet",
        "Gray",
        "White"
      ],

      multiplier: [
        {
          color: "Black",
          value: 1
        },
        {
          color: "Brown",
          value: 10
        },
        {
          color: "Red",
          value: 100
        },
        {
          color: "Orange",
          value: 1000
        },
        {
          color: "Yellow",
          value: 10000
        },
        {
          color: "Green",
          value: 100000
        },
        {
          color: "Blue",
          value: 1000000
        },
        {
          color: "Violet",
          value: 10000000
        },
        {
          color: "Gold",
          value: 0.1
        },
        {
          color: "Silver",
          value: 0.01
        }
      ],

      tolerance: [
        {
          color: "Black",
          value: 0
        },
        {
          color: "Brown",
          value: 1
        },
        {
          color: "Red",
          value: 2
        },
        {
          color: "Green",
          value: 0.5
        },
        {
          color: "Blue",
          value: 0.25
        },
        {
          color: "Violet",
          value: 0.1
        },
        {
          color: "Gray",
          value: 0.05
        },
        {
          color: "Gold",
          value: 5
        },
        {
          color: "Silver",
          value: 10
        }
      ],
      number: 4,
      color1: 0,
      color2: 0,
      color3: 0,
      color4: 1,
      color5: 0,
      r: 0,
      u: 0,
      //END FIRST
      //BEGIN SECOND
      second: {},

      Secondvalue: {},

      Secondtolerance: [
        {
          color: 0,
          value: "0%"
        },
        {
          color: 1,
          value: "1%"
        },
        {
          color: 2,
          value: "2%"
        },
        {
          color: 5,
          value: "0.5%"
        },
        {
          color: 6,
          value: "0.25%"
        },
        {
          color: 7,
          value: "0.10%"
        },
        {
          color: 8,
          value: "0.05%"
        },
        {
          color: 11,
          value: "5%"
        },
        {
          color: 22,
          value: "10%"
        }
      ],

      Secondvaluenumber: 220,
      Secondvaluestripes: "4",
      Secondvaluetolerance: 11, //last stripe

      Secondstripe1: 2,
      Secondstripe2: 2,
      Secondstripe3: 0,
      Secondstripe4: 0,
      Secondr: 220,
      Secondu: ""
    };
  },
  computed: {
    ...mapGetters({
      show: "windows/colorCodeDialog"
    }),
    FirstValueWatchable() {
      return (
        this.number,
        this.color1,
        this.color2,
        this.color3,
        this.color4,
        this.color5,
        Date.now()
      );
    },
    SecondValueWatchable() {
      return (
        this.Secondr,
        this.Secondu,
        this.Secondvaluestripes,
        this.Secondvaluetolerance,
        this.Secondvaluenumber,
        Date.now()
      );
    }
  },
  watch: {
    FirstValueWatchable() {
      console.log("FirstWatchable");
      var value = parseInt(this.color1) * 10 + parseInt(this.color2);
      if (this.number === "5") {
        console.log("5stripes");
        value = value * 10 + parseInt(this.color3);
      }
      value = value * parseFloat(this.color4);
      if (value > 1000000) {
        value = value / 1000000;
        this.u = "M";
      } else if (value > 1000) {
        value = value / 1000;
        this.u = "K";
      } else {
        this.u = "";
      }
      this.r = value;
    },
    SecondValueWatchable() {
      console.log("SecondR s-a schimbat");
      var value = parseFloat(this.Secondvaluenumber);
      if (
        isNaN(value) ||
        value > 99999999999 ||
        (value < 0.1 && this.Secondvaluestripes === "4") ||
        (value < 1 && this.Secondvaluestripes !== "4")
      ) {
        this.Secondr = 0; //bad value
        this.Secondu = "";
        this.Secondstripe1 = 0;
        this.Secondstripe2 = 0;
        this.Secondstripe3 = 0;
        this.Secondstripe4 = 0;
        console.log("if");
      } else {
        console.log("else");
        value *= 10000; //workaround for float
        var digit1 = 0;
        var digit2 = 0;
        var digit3 = 0;
        var multiplier = 0;
        if (this.Secondvaluestripes === "4") {
          while (Math.trunc(value / 100) !== 0) {
            multiplier += 1;
            value = Math.trunc(value / 10);
          }

          digit2 = value % 10;
          digit1 = Math.trunc(value / 10);

          multiplier -= 4; //workaround

          this.Secondr = (digit1 * 10 + digit2) * Math.pow(10, multiplier);
          this.Secondstripe3 = multiplier;
        } else {
          while (Math.trunc(value / 1000) !== 0) {
            multiplier += 1;
            value = Math.trunc(value / 10);
          }

          digit3 = value % 10;
          value = Math.trunc(value / 10);
          digit2 = value % 10;
          digit1 = Math.trunc(value / 10);

          multiplier -= 4; //workaround

          this.Secondr =
            ((digit1 * 10 + digit2) * 10 + digit3) * Math.pow(10, multiplier);
          this.Secondstripe3 = digit3;
          this.Secondstripe4 = multiplier;
        }

        this.Secondstripe1 = digit1;
        this.Secondstripe2 = digit2;

        //gold and silver stripes name match
        if (this.Secondstripe3 == -1) {
          this.Secondstripe3 = 11;
        }
        if (this.Secondstripe3 == -2) {
          this.Secondstripe3 = 22;
        }
        if (this.Secondstripe4 == -1) {
          this.Secondstripe4 = 11;
        }
        if (this.Secondstripe4 == -2) {
          this.Secondstripe4 = 22;
        }

        if (this.Secondr > 1000000) {
          this.Secondr = this.Secondr / 1000000;
          this.Secondu = "M";
        } else if (this.Secondu > 1000) {
          this.Secondu = "K";
        } else {
          this.Secondu = "";
        }
      }
    }
  },
  mounted() {
    this.$refs.reference.$el.focus();
  }, 
  methods: {
    esc() {
      this.close();
    },
    close() {
      this.$root.$emit('submit');
    }
  }
};
</script>