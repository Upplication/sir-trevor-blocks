(function() {
    "use strict";

    if (!SirTrevor)
        return console.error("SirTrevor.Blocks.Widget could not load because SirTrevor wasn't found");

    SirTrevor.Blocks.Widget = SirTrevor.Blocks.Text.extend({

        type: "widget",
        title: function() { return i18n.t('blocks:widget:title') },
        icon_name: "code",
        editorHTML: '@@include("widget.html")',

        loadData: function(data) {
            this.loadPastedContent(data.text);
        },

        onBlockRender: function() {
            var $textarea = this.$el.find('textarea');
            var textarea = $textarea[0];
            var $preview =  this.$el.find('.preview');

            var offset = textarea.offsetHeight - textarea.clientHeight;
         
            $preview.attr('title', i18n.t('blocks:widget:edit'))
            $textarea.attr('placeholder', i18n.t('blocks:widget:hint'));
            $textarea.on('keyup input', function() {
                $textarea
                    .css('height', 'auto')
                    .css('height', textarea.scrollHeight + offset);
            });
        },

        onContentPasted: function(ev) {
            // If there is any content means the user is editing on the textarea itself,
            // so dont trigger the paste event for preventing higlighting/formatting
            if (this.$el.find('textarea').val().length <= 0)
                this.loadPastedContent($(ev.target).val());
        },

        _serializeData: function() {
            return {
                format: 'html',
                text: this.$el.find('textarea').val()
            }
        },

        loadPastedContent: function(code) {
            code = code || "";

            var $find = this.$el.find.bind(this.$el);
            var $preview = $find('.preview');
            var $code = $preview.find('code');
            var $editor = $find('.editor');
            var $textarea = $find('textarea');
            var $icon = $editor.find('.st-icon');

            // First load the code into the text area
            $textarea.val(code);

            // Replace < / > for its html chars
            code = code.replace(/</g, '&lt;');
            code = code.replace(/>/g, '&gt;');

            // Add the code to the container and highlight it
            $code.html(code);
            hljs.highlightBlock($code[0]);

            // Hide the editor
            $icon.hide();
            $editor.hide();
            $preview.show();

            // Add listener for editing the content
            $preview.dblclick(function () {
                $editor.show();
                $preview.hide();
                $textarea.trigger('input');
            })
        }

    });
})();