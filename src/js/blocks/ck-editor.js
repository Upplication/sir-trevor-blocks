(function() {
    "use strict";

    if (!SirTrevor)
        return console.error("SirTrevor.Blocks.CkEditor could not load because SirTrevor wasn't found");

    if (!CKEDITOR)
        return console.error("SirTrevor.Blocks.CkEditor could not load because CKEditor wasn't found");

    /**
     * CKEditor block with minimal toolbar.
     * Example Usage:
     * @example
     * SirTrevor.setBlockOptions('CkEditor', {
     *      ckeditor: {
     *          basePath: 'http://localhost:8080/dist/ckeditor/'
     *      }
     *  });
     *
     * ckeditor.basePath needed to set the location to load plugins and skins
     */
    SirTrevor.Blocks.CkEditor = SirTrevor.Block.extend({
        type: 'ck_editor',
        title:  function() { return i18n.t('blocks:ck_editor:title'); },
        icon_name: 'ckeditor',
        editorHTML: "<textarea class='st-text-block' rows='10' cols='80'></textarea>",
        loadData: function(data) {
            this.$editor.find('textarea').val(data.text);
        },

        onBlockRender: function(){
            //
            if (this.ckeditor && this.ckeditor.basePath) {
                CKEDITOR.basePath = this.ckeditor.basePath;
            }

            this._ckeditor = CKEDITOR.replace(this.getTextBlock()[0], {
                extraPlugins: 'colorbutton,colordialog,font,justify',
                // http://stackoverflow.com/questions/23538462/how-to-remove-buttons-from-ckeditor-4
                toolbarGroups: [
                    {"name":"basicstyles","groups":["basicstyles"]},
                    {"name":"links","groups":["links"]},
                    {"name":"paragraph","groups":["list","blocks", "align"]},
                    {"name":"insert", "groups": ['Table']},
                    {"name":"styles"},
                    {"name":"colors"}
                ],
                removeButtons: 'CreateDiv,Styles,Flash,Iframe,Image,HorizontalRule,Smiley,PageBreak,Anchor'
            });
            // FIXME: reorder problems :(
            this.$editor.parent().find('.st-block-ui-btn--reorder').hide();
        },

        _serializeData: function() {
            return {
                type: 'html',
                text: this._ckeditor ? this._ckeditor.getData() : ''
            }
        }
    });
})();