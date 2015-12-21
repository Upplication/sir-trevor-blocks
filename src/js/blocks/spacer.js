(function() {
    "use strict";

    if (!SirTrevor)
        return console.error("SirTrevor.Blocks.Spacer could not load because SirTrevor wasn't found");

    SirTrevor.Blocks.Spacer = SirTrevor.Block.extend({

      type: "spacer",
      title: function() { return i18n.t('blocks:spacer:title') },
      editorHTML: function() {
          return _.template('@@include("spacer.html")', { imports: { i18n: i18n } });
      },

      loadData: function(data) {
        this.$height = this.$height || this.$editor.find('[name="height"]');
        this.$height.val(data.height);
        this.$height.attr('units', data.units);
      },

      onBlockRender: function() {
        this.$height = this.$height || this.$editor.find('[name="height"]');
        this.$height.on('change input', function(ev) {
          var $target = this.$(ev.target);
          var val = $target.val();
          this.$('.st-output').html(val);
        }.bind(this));
        this.$height.trigger('change');
      },

      _serializeData: function() {
        return {
          height: this.$height ? this.$height.val() : 0,
          units: this.$height ? this.$height.attr('units') : ''
        };
      }
    });
})();