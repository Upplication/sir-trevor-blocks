(function() {
    "use strict";

    if (!SirTrevor)
        return console.error("SirTrevor.Blocks.Widget could not load because SirTrevor wasn't found");

    SirTrevor.Blocks.Widget = SirTrevor.Block.extend({

      type: "widget",
      title: "Widget",
      icon_name: "code",

      pastable: true,

      paste_options: {
        html: [
                '<div style="text-align: center;  padding:20px;">',
                '  <span>Paste your external widget html here</span>',
                '  <textarea class="st-paste-block" style="width: 100%; padding: 0.6em; border: 1px solid #D4D4D4;"  placeholder="Paste your code here"></textarea>',
                '</div>',
            ].join('\n')
      },

      _serializeData: function() {
        return {
            format: 'html',
            text: this.$el.find('textarea').val()
        }
      },

      loadData: function(data) {
        this.loadPastedContent(data.text);
      },

      onContentPasted: function(ev) {
        this.loadPastedContent($(ev.target).val());
      },

      loadPastedContent: function(code) {
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