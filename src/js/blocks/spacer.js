(function() {
    "use strict";

    if (!SirTrevor)
        return console.error("SirTrevor.Blocks.Spacer could not load because SirTrevor wasn't found");

    SirTrevor.Blocks.Spacer = SirTrevor.Block.extend({

      type: "spacer",
      title: function() { return i18n.t('blocks:spacer:title') },
      editorHTML: '@@include("spacer.html")',

      onBlockRender: function() {
        this.$editor.on('change input', function(ev) {
          var $target = this.$(ev.target);
          var val = $target.val();
          this.$('.st-output').html(val);
        }.bind(this));
        this.$editor.trigger('change');
      },

      _serializeData: function() {
        return {
          height: this.$editor.val(),
          units: this.$editor.attr('units')
        };
      }
    });
})();