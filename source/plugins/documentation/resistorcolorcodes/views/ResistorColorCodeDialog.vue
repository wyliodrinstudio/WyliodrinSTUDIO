<template>
  <v-layout row justify-center>
    <v-card width="640">
      <v-card-title>
        <span class="md-toolbar-tools">{{$t('TOOLBAR_RESISTOR_COLOR_CODE')}}</span>
      </v-card-title>
      <v-tabs left class="tabs-box">
        <v-tab @click="CtN=true">
          {{ $t('RESISTOR_COLORCODE_FROM_COLOR_TO_NUMBER')}}
        </v-tab>
        <v-tab @click="CtN=false">
          {{ $t('RESISTOR_COLORCODE_FROM_NUMBER_TO_COLOR')}}
        </v-tab>
      </v-tabs>
      <v-card-text v-if="CtN">
        <div>
          <v-container>
            <v-row>
              <v-col>
                <v-select
                  :label="$t('RESISTOR_COLORCODE_STRIPES')"
                  height="16"
                  v-model="number"
                  :items="numbers"
                  item-text="label"
                  item-value="value"
                  hide-details
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  :label="$t('RESISTOR_COLORCODE_STRIPE_ONE')"
                  height="16"
                  v-model="color1"
                  :items="colors"
                  item-text="color"
                  item-value="index"
                  hide-details
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  :label="$t('RESISTOR_COLORCODE_STRIPE_TWO')"
                  height="16"
                  v-model="color2"
                  :items="colors"
                  item-text="color"
                  item-value="index"
                  hide-details
                ></v-select>
              </v-col>
              <v-col v-show="number==5">
                <v-select
                  :label="$t('RESISTOR_COLORCODE_STRIPE_THREE')"
                  height="16"
                  v-show="number==5"
                  v-model="color3"
                  :items="colors"
                  item-text="color"
                  item-value="index"
                  hide-details
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  :label="$t('RESISTOR_COLORCODE_STRIPE_' + stripeNumber(4 - (5 - number)))"
                  height="16"
                  v-model="color4"
                  :items="multiplier"
                  item-text="color"
                  item-value="value"
                  hide-details
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  :label="$t('RESISTOR_COLORCODE_STRIPE_' + stripeNumber(5 - (5 - number)))"
                  height="16"
                  v-model="color5"
                  :items="tolerance"
                  item-text="color"
                  item-value="value"
                  hide-details
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </div>
        <div align="center" style="padding:50px 0">
          <img src="plugins/documentation/resistorcolorcodes/data/img/resistorcolorcode.png" />
        </div>
      </v-card-text>
      <v-card-text v-else>
        <div>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field autofocus hide-details :label="$t('RESISTOR_COLORCODE_RESISTANCE')" height="16" placeholder="Enter a number" v-model="Secondvaluenumber"></v-text-field>
              </v-col>
              <v-col>
                <v-select
                  :label="$t('RESISTOR_COLORCODE_STRIPES')"
                  height="16"
                  v-model="Secondvaluestripes"
                  :items="numbers"
                  item-text="label"
                  item-value="value"
                  hide-details
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  :label="$t('VALUE_TOLERANCE')"
                  height="16"
                  v-model="Secondvaluetolerance"
                  :items="Secondtolerance"
                  item-text="value"
                  item-value="color"
                  hide-details
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </div>
        <div style="text-align:center;">
          <img src="plugins/documentation/resistorcolorcodes/data/img/left.png"><img :src="'plugins/documentation/resistorcolorcodes/data/img/' + Secondstripe1 + '.png'"><img :src="'plugins/documentation/resistorcolorcodes/data/img/' + Secondstripe2 + '.png'"><img :src="'plugins/documentation/resistorcolorcodes/data/img/' + Secondstripe3 + '.png'"><img
            v-show="Secondvaluestripes==='5'"
            :src="'plugins/documentation/resistorcolorcodes/data/img/' + Secondstripe4 + '.png'"
          ><img src="plugins/documentation/resistorcolorcodes/data/img/none.png"><img
            :src="'plugins/documentation/resistorcolorcodes/data/img/' + Secondvaluetolerance + '.png'"
          ><img src="plugins/documentation/resistorcolorcodes/data/img/right.png">
        </div>
      </v-card-text>
      <v-card-actions>
        <div v-show="CtN" style="font-size:16px; margin-left:10px;">
          <b>{{ $t('VALUE_VALUE')}}:</b>
          {{r}} {{u}}&Omega;
          <span style="padding-left:10px;">&plusmn;{{color5}}%</span>
        </div>
        <div v-show="!CtN" style="font-size:16px; margin-left:10px;">
          <b>{{ $t('VALUE_VALUE') }}:</b>
          {{Secondr}} {{Secondu}}&Omega;
        </div>
        <v-spacer></v-spacer>
        <v-btn right text @click="close" ref="reference">{{$t('EXIT')}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
const mapGetters = require('vuex').mapGetters;
module.exports = {
	name: 'ColorCodeDialog',
	data() {
		return {
			CtN: true,
			numbers: [{ value: '4', label: 'Four' }, { value: '5', label: 'Five' }],
			colors: [
				{ index: 0, color: 'Black' },
				{ index: 1, color: 'Brown' },
				{ index: 2, color: 'Red' },
				{ index: 3, color: 'Orange' },
				{ index: 4, color: 'Yellow' },
				{ index: 5, color: 'Green' },
				{ index: 6, color: 'Blue' },
				{ index: 7, color: 'Violet' },
				{ index: 8, color: 'Gray' },
				{ index: 9, color: 'White' }
			],

			multiplier: [
				{
					color: 'Black',
					value: 1
				},
				{
					color: 'Brown',
					value: 10
				},
				{
					color: 'Red',
					value: 100
				},
				{
					color: 'Orange',
					value: 1000
				},
				{
					color: 'Yellow',
					value: 10000
				},
				{
					color: 'Green',
					value: 100000
				},
				{
					color: 'Blue',
					value: 1000000
				},
				{
					color: 'Violet',
					value: 10000000
				},
				{
					color: 'Gold',
					value: 0.1
				},
				{
					color: 'Silver',
					value: 0.01
				}
			],

			tolerance: [
				{
					color: 'Black',
					value: 0
				},
				{
					color: 'Brown',
					value: 1
				},
				{
					color: 'Red',
					value: 2
				},
				{
					color: 'Green',
					value: 0.5
				},
				{
					color: 'Blue',
					value: 0.25
				},
				{
					color: 'Violet',
					value: 0.1
				},
				{
					color: 'Gray',
					value: 0.05
				},
				{
					color: 'Gold',
					value: 5
				},
				{
					color: 'Silver',
					value: 10
				}
			],
			number: '4',
			color1: 0,
			color2: 0,
			color3: 0,
			color4: 1,
			color5: 0,
			r: 0,
			u: '',
			//END FIRST
			//BEGIN SECOND
			second: {},

			Secondvalue: {},

			Secondtolerance: [
				{
					color: 0,
					value: '0%'
				},
				{
					color: 1,
					value: '1%'
				},
				{
					color: 2,
					value: '2%'
				},
				{
					color: 5,
					value: '0.5%'
				},
				{
					color: 6,
					value: '0.25%'
				},
				{
					color: 7,
					value: '0.10%'
				},
				{
					color: 8,
					value: '0.05%'
				},
				{
					color: 11,
					value: '5%'
				},
				{
					color: 22,
					value: '10%'
				}
			],

			Secondvaluenumber: 220,
			Secondvaluestripes: '4',
			Secondvaluetolerance: 11, //last stripe

			Secondstripe1: 2,
			Secondstripe2: 2,
			Secondstripe3: 0,
			Secondstripe4: 0,
			Secondr: 220,
			Secondu: ''
		};
	},
	computed: {
		...mapGetters({
			show: 'windows/colorCodeDialog'
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
		},
	},
	watch: {
		FirstValueWatchable() {
			var value = parseInt(this.color1) * 10 + parseInt(this.color2);
			if (this.number === '5') {
				value = value * 10 + parseInt(this.color3);
			}
			value = value * parseFloat(this.color4);
			if (value > 1000000) {
				value = value / 1000000;
				this.u = 'M';
			} else if (value > 1000) {
				value = value / 1000;
				this.u = 'K';
			} else {
				this.u = '';
			}
			this.r = value;
		},
		SecondValueWatchable() {
			var value = parseFloat(this.Secondvaluenumber);
			if (
				isNaN(value) ||
        value > 99999999999 ||
        (value < 0.1 && this.Secondvaluestripes === '4') ||
        (value < 1 && this.Secondvaluestripes !== '4')
			) {
				this.Secondr = 0; //bad value
				this.Secondu = '';
				this.Secondstripe1 = 0;
				this.Secondstripe2 = 0;
				this.Secondstripe3 = 0;
				this.Secondstripe4 = 0;
			} else {
				value *= 10000; //workaround for float
				var digit1 = 0;
				var digit2 = 0;
				var digit3 = 0;
				var multiplier = 0;
				if (this.Secondvaluestripes === '4') {
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
					this.Secondu = 'M';
				} else if (this.Secondu > 1000) {
					this.Secondu = 'K';
				} else {
					this.Secondu = '';
				}
			}
		}
	},
	mounted() {
		this.$refs.reference.$el.focus();
	},
	updated() {
		if (this.CtN) {
			this.$refs.reference.$el.focus();
		}
	},
	methods: {
		esc() {
			this.close();
		},
		close() {
			this.$root.$emit('submit');
		},
		stripeNumber(number) {
			if (number == 3) {
				return 'THREE'; 
			} else if (number == 4) {
				return 'FOUR';
			} else {
				return 'FIVE';
			}
		}
	}
};
</script>