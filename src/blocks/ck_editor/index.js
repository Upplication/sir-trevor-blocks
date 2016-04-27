var SirTrevor = require('sir-trevor-js');
var i18n = require('i18n');
var editorHTML = require('./editor.html');
var CKEDITOR = require('ckeditor');

module.exports = SirTrevor.Block.extend({

    type: 'ck_editor',
    icon_name: 'text',

    title:  function() {
        return i18n.t('blocks:ck_editor:title');
    },

    editorHTML: editorHTML,

    loadData: function(data) {
        this.$editor.val(data.text);
    },

    setupCkEditor: function(destroy) {

        if (!!destroy && this.ckeditor)
            this.ckeditor.destroy();

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
    },

    onBlockRender: function() {

        if (this.config && this.config.basePath) {
            CKEDITOR.basePath = this.config.basePath;
        }

        this.setupCkEditor();

        SirTrevor.EventBus.on('block:reorder:dropped', function(blockId) {
            if (blockId == this.blockID)
                this.setupCkEditor(true);
        }.bind(this));

        this.mediator.on('block:changePosition', function($block) {
            if ($block == this.$el)
                this.setupCkEditor(true);
        }.bind(this));
    },

    _serializeData: function() {
        return {
            format: 'html',
            text: this.ckeditor ? this.ckeditor.getData() : ''
        }
    }
})