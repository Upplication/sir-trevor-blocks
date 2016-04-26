var _ = require('lodash');
var SirTrevor = require('sir-trevor-js');

module.exports = {
    mixinName: 'Clonable',

    initializeClonable: function() {
        // For this mixin to work we need to also have the controllable mixin available.
        // Lets do some security checks
        if ((this.controllable === true && !this.$control_ui) || // controllable is enabled here but not yet initialized
            !this.controllable) { // we were not even marked as controllable
            this.controls = this.controls || {};
            this.withMixin(SirTrevor.BlockMixins.Controllable);
            this.controllable = false; // This will prevent from double initing the controllable ui
        }

        var stInstance = SirTrevor.getInstance(this.instanceID);

        this.addUiControl('clone', function(e) {
            var blockData = _.cloneDeep(this.getData());
            var blocks = stInstance.block_manager.blocks;
            stInstance.block_controls.currentContainer = this.$el; // This will determine where the new block is added
            stInstance.block_manager.createBlock(blockData.type, blockData.data);
            SirTrevor.EventBus.trigger('block:cloned', blocks[blocks.length - 1]);
        }.bind(this))
    },
}