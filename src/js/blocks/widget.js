(function() {
    "use strict";

    if (!SirTrevor)
        return console.error("SirTrevor.Blocks.Widget could not load because SirTrevor wasn't found");

    SirTrevor.Blocks.Widget = SirTrevor.Block.extend({

      type: "widget",
      title: function() { return i18n.t('blocks:widget:title') },
      icon_name: "code",

      pastable: true,

      paste_options: {
        html: '@@include("widget.html")'
      },

      _serializeData: function() {
        return {
            format: 'html',
            text: this.$el.find('textarea').val()
        }
      },

      isEmpty: function() {
        return !(this.$el && this.$el.find('textarea').length > 0 && this.$el.find('textarea').val().length > 0);
      },

      loadData: function(data) {
        this.loadPastedContent(data.text);
      },

      onContentPasted: function(ev) {
        // If there is any content means the user is editing on the textarea itself,
        // so dont trigger the paste event for preventing higlighting/formatting
        if (this.$el.find('textarea').val().length <= 0)
          this.loadPastedContent($(ev.target).val());
      },

      loadPastedContent: function(code) {
        code = code || "";

        // First load the code into the text area
        this.$el.find('textarea').val(code);

        // Replace < / > for its html chars
        code = code.replace(/</g, '&lt;');
        code = code.replace(/>/g, '&gt;');
        // Prepare the containers
        var preTag = $('<pre>');
        var codeTag = $('<code>', { class: 'lang-html' });
        // Add the code to the container and highlight it
        codeTag.html(code);
        hljs.highlightBlock(codeTag.get()[0]);
        preTag.append(codeTag);
        // Add the highlighted code to the editor and remove the input box
        this.$editor.html(preTag);
        this.$inputs.hide();
      }

    });
})();