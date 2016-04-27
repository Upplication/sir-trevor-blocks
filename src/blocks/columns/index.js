var $ = require('jquery');
var i18n = require('i18n');
var SirTrevor = require('sir-trevor-js');
var editorHTML = require('./editor.html');
var positionerFix = require('./positioner-fix.html');

module.exports = SirTrevor.Block.extend({

    type: "columns",
    title: function() {
        return i18n.t('blocks:columns:title')
    },

    _editorsSelectors: [
        '.st-columns-editor-left > .editor',
        '.st-columns-editor-right > .editor'
    ],

    editorHTML: editorHTML,

    onBlockRender: function() {
        var self = this;
        var parentStEditor = SirTrevor.getInstance(self.instanceID);
        var blockTypes = parentStEditor.options.blockTypes.filter(function(type) {
            return type.toLowerCase() != self.type;
        });

        self._editors = self._editorsSelectors.map(function(selector, idx) {
            return new SirTrevor.Editor({
                el: self.$(selector),
                blockTypes: blockTypes,
                blockLimit: 1,
            });
        })

        SirTrevor.EventBus.on('block:reorder:dropped', function(blockId) {
            if (blockId == self.blockID)
                self._triggerChangePositionOnChildModules();
        });

        self.mediator.on('block:changePosition', function($block) {
            if ($block == self.$el)
                self._triggerChangePositionOnChildModules();
        });

        // TODO: Fix me when reordirng a block column does not mess this it up
        if ($('style#st-block-positioner-fix').length <= 0)
            $('head').append(positionerFix);
    },

    loadData: function(data) {
        var self = this;
        data.columns.forEach(function(column, idx) {
            var selector = self._editorsSelectors[idx];
            self.$(selector).val(JSON.stringify( { data: column.blocks } ));
        })
    },

    _serializeData: function() {
        var self = this;
        var result = {
            columns: (self._editors || []).map(function(st) {
                return {
                    blocks: self._retrieveEditorData(st)
                }
            })
        };

        var isEmpty = result.columns.reduce(function(empty, column) {
            return empty && column.blocks.length <= 0;
        }, true);

        if (!isEmpty)
            return result;
        else
            return {};
    },

    _retrieveEditorData: function(editor) {
        // Force SirTrevor to update its internal data store
        editor.store.reset();
        editor.validateBlocks(false);
        return editor.store.retrieve().data;
    },

    _triggerChangePositionOnChildModules: function() {
        this._editors.forEach(function(editor) {
            editor.block_manager.blocks.forEach(function(block) {
                block.mediator.trigger('block:changePosition', block.$el);
            })
        })
    }
})