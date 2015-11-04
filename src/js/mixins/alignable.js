(function() {
    var BlockMixins = SirTrevor.BlockMixins;
    var Block = SirTrevor.Block;
    Block.prototype.availableMixins.push('alignable');

    var defaultAlignConfig = {
        aligns : {
            left: true,
            center: true,
            justify: true,
            right: true
        },
        handler: function(align) {
            this.getTextBlock().removeClass(function(index, classes) {
                return classes.split(' ')
                                .filter(function(a) { return /^st\-align-/.test(a) })
                                .join(' ');
            });
            this.getTextBlock().addClass('st-align-' + align);
        }
    };

    BlockMixins.Alignable = {
        mixinName: 'Alignable',

        initializeAlignable: function() {
            // For this mixin to work we need to also have the controllable mixin available.
            // Lets do some security checks
            if ((this.controllable === true && !this.$control_ui) || // controllable is enabled here but not yet initialized
                !this.controllable) { // we were not even marked as controllable
                this.controls = this.controls || {};
                this.withMixin(BlockMixins.Controllable);
                this.controllable = false; // This will prevent from double initing the controllable ui
            }

            this.align_options = Object.assign({}, defaultAlignConfig, this.align_options);
            Object.keys(this.align_options.aligns).forEach(function (align) {
                /*
                 val might be:
                    * `false`: Meaning this align should NOT be shown in the align controls.
                    * `true`: Meaning this align will be shown on the align controls, but its behaviour will be handled by `align_options.handler` or the default `align_options.handler`.
                    * `function() { ... } ` : A function that will be responsible for handling the click. It will be passed the align in css format (left, right, center, justify)
                */
                var val = this.align_options.aligns[align];

                if (val === false) // Do not even show this on the control ui
                    return;

                var handler = this.align_options.handler;
                if (val instanceof Function)
                    handler = val;

                if (!handler || !(handler instanceof Function))
                    throw new Error('AlignableMixin: No valid handler function found for ' + align);

                if (val === true) {
                    this.addUiControl('align-' + align, function(e) {
                        this._getData().align = align;
                        (handler.bind(this))(align);
                        if (e.originalEvent) { // Check if we were triggered by a human or not
                            // If we were triggered by a human, raise the event, otherwise dont.
                            // This allows us to use the handler click event for setting the initial
                            // align in the block.
                            console.log("raising block:aligned event");
                            var ev = jQuery.Event();
                            ev.originalEvent = e;
                            ev.target = this.$el;
                            ev.align = align;
                            this.mediator.trigger('block:aligned', ev);
                        }
                    }.bind(this));
                }
            }.bind(this));

            var data = this._getData();
            if (data && data.align)
                this.$control_ui.find('[class*="align-' + data.align + '"]').click();
        },
    }
})();