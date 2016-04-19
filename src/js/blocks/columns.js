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

      _editors: [],

      editorHTML: '@@include("columns.html")',

      onBlockRender: function() {
      	console.log('onBlockRender: Passed!')
      	var self = this;
      	var parentStEditor = SirTrevor.getInstance(this.instanceID);
      	var blockTypes = parentStEditor.options.blockTypes.filter(function(type) {
      		return type.toLowerCase() != self.type;
      	});

      	self._editorsSelectors.forEach(function(selector, idx) {
      		self._editors[idx] = new SirTrevor.Editor({
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
        return {
        	columns: self._editors.map(function(st) {
        		return {
        			blocks: self._retrieveEditorData(st)
        		}
        	})
        };
      },

      _retrieveEditorData: function(editor) {
        // Force SirTrevor to update its internal data store
        editor.store.reset();
        editor.validateBlocks(false);
        return editor.store.retrieve().data;
      }
    });
})();