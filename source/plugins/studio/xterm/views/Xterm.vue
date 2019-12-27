<template>
	<div class="fill-height">
		<div class="terminal-actions">
			<span>{{currentTerminalTitle}}</span>
			<div class="terminal-btns">
				<v-tooltip top>
					<template v-slot:activator="{ on }">
						<v-btn small @click="clear" v-on="on">
							<v-img src="plugins/studio/xterm/data/img/icons/clear-icon.svg"></v-img>
						</v-btn>
					</template>
					<span>Clear Terminal</span>
				</v-tooltip>
				<v-tooltip top>
					<template v-slot:activator="{ on }">
						<v-btn small @click="reset" v-on="on">
							<v-img src="plugins/studio/xterm/data/img/icons/reset-icon.svg"></v-img>
						</v-btn>
					</template>
					<span>Reset Terminal</span>
				</v-tooltip>
			</div>
		</div>
		<div v-show="!id" class="xterm-warning">
			<v-img src="plugins/studio/xterm/data/img/icons/no-shell-icon.svg"></v-img>
			<span>{{$t(noShell)}}</span>
		</div>
		<div ref="shell" class="bottom-shell-box"></div>
	</div>
</template>

<style lang="less" scoped>
	@import '../style/xterm.less';
</style>

<script>

var $ = require ('jquery');
var xterm = require ('xterm');

// var fit = require ('xterm/lib/addons/fit/fit');
// xterm.Terminal.applyAddon (fit);

xterm.Terminal.prototype.proposeGeometry = function () {
    if (!this.element.parentElement) {
        return null;
	}
    var parentElementStyle = window.getComputedStyle(this.element.parentElement);
    var parentElementHeight = parseInt(parentElementStyle.getPropertyValue('height'));
    var parentElementWidth = Math.max(0, parseInt(parentElementStyle.getPropertyValue('width')));
    var elementStyle = window.getComputedStyle(this.element);
    var elementPadding = {
        top: parseInt(elementStyle.getPropertyValue('padding-top')),
        bottom: parseInt(elementStyle.getPropertyValue('padding-bottom')),
        right: parseInt(elementStyle.getPropertyValue('padding-right')),
        left: parseInt(elementStyle.getPropertyValue('padding-left'))
    };
    var elementPaddingVer = elementPadding.top + elementPadding.bottom;
    var elementPaddingHor = elementPadding.right + elementPadding.left;
    var availableHeight = parentElementHeight - elementPaddingVer;
    var availableWidth = parentElementWidth - elementPaddingHor - this._core.viewport.scrollBarWidth;
    var geometry = {
        cols: Math.floor(availableWidth / (this._core._renderCoordinator.dimensions.actualCellWidth || 9)),
        rows: Math.floor(availableHeight / (this._core._renderCoordinator.dimensions.actualCellHeight || 17))
    };
    return geometry;
};

xterm.Terminal.prototype.fit = function () {
    var geometry = this.proposeGeometry();
    if (geometry) {
        if (this.rows !== geometry.rows || this.cols !== geometry.cols) {
            this._core._renderCoordinator.clear();
            this.resize(geometry.cols, geometry.rows);
        }
    }
}

export default {
	name: 'Xterm',
	props: ['active', 'noShell'],
	data ()
	{
		return {
			shell: null,
			id: null,
			currentTerminalTitle: '',
			buffers: {
				
			},
			shouldResize: true,
		};
	},
	mounted () {
		this.$nextTick (() => {
			this.start ();
		});
	},
	methods: {
		start ()
		{
			let shell = new xterm.Terminal ({cols: 80, rows: 24});
			this.shell = shell;
			shell.open (this.$refs.shell);
			$(window).resize(this.resize);
			this.update ();
			shell.on('title', (title) => {
				try
				{
					if (this.id)
					{
						this.ensureBuffer (this.id);
						this.buffers[this.id].title = title;
						this.currentTerminalTitle = this.buffers[this.id].title;
					}
				}
				catch(e)
				{
					console.log(e.message);
				}
				
			});
			shell.on ('data', (data) =>{
				if (this.id !== null)
				{
					this.$emit ('data', this.id, data);
				}
			});
		},
		select (id)
		{
			this.write (id, '');
			this.update ();
		},

		write (id, data)
		{
			if(this.id != id)
			{	
				if (this.id !== null)
				{
					this.shell.selectAll ();
					this.buffers[this.id] = {
						title: this.shell.title,
						data: this.shell.getSelection (),
						x: this.shell.buffer.cursorX,
						y: this.shell.buffer.cursorY,
						// title: (this.buffers[this.id]?this.buffers[this.id].title:'')
					};
				}
				this.id = id;
				this.shell.reset();
				if(this.buffers[id] && this.buffers[id].data)
				{
					// shell.write (this.buffers[id].title);
					this.shell.write (this.buffers[id].data);
					this.shell.write ('\x1b['+this.buffers[id].y+';'+this.buffers[id].x+'f');
					this.currentTerminalTitle = this.buffers[id].title;
				}
			}
			// console.log('undefined');
			this.shell.write (data);
		},

		getSize ()
		{
			return {cols: this.shell.cols, rows: this.shell.rows};
		},

		ensureBuffer (id)
		{
			if (!this.buffers[id]) this.buffers[id] = {};
		},
		resize ()
		{
			this.shouldResize = true;
			this.update ();
		},
		update() 
		{
			if (this.active && this.shouldResize)
			{
				this.shouldResize = false;
				if (this.shell)
				{
					let geometry = this.shell.proposeGeometry ();
					if (geometry.rows !== Infinity && geometry.rows > 0 && geometry.cols > 0)
					{
						this.shell.fit ();
						this.$emit ('resize', this.id, this.shell.cols, this.shell.rows);
					}
				}
			}
		},
		clear()
		{
			this.shell.clear();
		},
		reset()
		{
			this.shell.reset();
		}
	},

	watch: {
		id ()
		{
			this.update ();
		},
		active ()
		{
			setTimeout (() => this.update(), 10);
		}
	},
	
	destroyed ()
	{
		$(window).off('resize', this.resize);
		this.exit ();
	}
}

</script>

<style lang="less">
@import '../../../../../node_modules/xterm/dist/xterm.css';
</style>
