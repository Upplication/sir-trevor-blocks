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
     *      config: {
     *          basePath: 'http://localhost:8080/dist/ckeditor/'
     *      }
     *  });
     *
     * ckeditor.basePath needed to set the location to load plugins and skins
     */
    SirTrevor.Blocks.CkEditor = SirTrevor.Block.extend({
        type: 'ck_editor',
        title:  function() { return i18n.t('blocks:ck_editor:title'); },
        icon_name: 'text',
        editorHTML: '@@include("ck-editor.html")',
        loadData: function(data) {
            this.$editor.val(data.text);
        },

        onBlockRender: function(){
            //
            if (this.config && this.config.basePath) {
                CKEDITOR.basePath = this.config.basePath;
            }

            this.ckeditor = CKEDITOR.replace(this.getTextBlock()[0], {
                allowedContent: true, // Do not filter any html tags or styles(see CkEditor docs)
                extraPlugins: 'colorbutton,colordialog,font,justify',
                // http://stackoverflow.com/questions/23538462/how-to-remove-buttons-from-ckeditor-4
                toolbarGroups: [
                    {'name':'basicstyles','groups':['basicstyles']},
                    {'name':'links','groups':['links']},
                    {'name':'paragraph','groups': [ 'list', 'blocks', 'align' ]},
                    {'name':'insert', 'groups': ['Table']},
                    {'name':'styles'},
                    {'name':'colors'},
                    {'name':'document', 'groups': [ 'mode', 'document', 'doctools' ] },
                ],
                removeButtons: 'CreateDiv,Styles,Flash,Iframe,Image,HorizontalRule,Smiley,PageBreak,Anchor'
            });

            this.loading();
            // hide the loadign effect
            this.ckeditor.on('instanceReady', function(ckEvent) {
                this.ready();
            }.bind(this));

            // block event on change ckeditor
            this.ckeditor.on('change', function(ckEvent) {
                // event
                var eventType = 'blocks:ck_editor:change';
                var ev = jQuery.Event(ckEvent);
                ev.target = this.$editor[0];
                this.mediator.trigger(eventType, ev);
            }.bind(this));

            // FIXME: reorder problems :(
            this.$editor.parent().find('.st-block-ui-btn--reorder').hide();
        },

        _serializeData: function() {
            return {
                format: 'html',
                text: this.ckeditor ? this.ckeditor.getData() : ''
            }
        }
    });
})();