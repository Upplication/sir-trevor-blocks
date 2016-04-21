(function() {
    "use strict";

    if (!SirTrevor)
        return console.error("SirTrevor.Blocks.Columns could not load because SirTrevor wasn't found");

    SirTrevor.Blocks.Columns = SirTrevor.Block.extend({

      type: "columns",
      title: function() { return i18n.t('blocks:columns:title') },

      _editorsSelectors: [
        '.st-columns-editor-left > .editor',
        '.st-columns-editor-right > .editor'
      ],

      editorHTML: '@@include("columns.html")',

      onBlockRender: function() {
        var self = this;
        var parentStEditor = SirTrevor.getInstance(this.instanceID);
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
        if (result.columns.length > 0)
            return result;
        else
            return {};
      },

      _retrieveEditorData: function(editor) {
        // Force SirTrevor to update its internal data store
        editor.store.reset();
        return editor.store.retrieve().data;
      }
    });
})();