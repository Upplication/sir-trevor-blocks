var _ = require('lodash');
var $ = require('jquery');
var i18n = require('i18n');
var SirTrevor = require('sir-trevor-js');
var editorHTML = require('./editor.html');

var fonts = [
    {
        id: 'sans-serif',
        name: 'Sans Serif',
        fontName: 'Open Sans',
        url: 'https://fonts.googleapis.com/css?family=Open+Sans:400,400italic,700,700italic'
    },
    {
        id: 'cursive',
        name: 'Cursive',
        fontName: 'Gloria Hallelujah',
        url: 'https://fonts.googleapis.com/css?family=Gloria+Hallelujah'
    },
    {
        id: 'fantasy',
        name: 'Fantasy',
        fontName: 'Anton',
        url: 'https://fonts.googleapis.com/css?family=Anton'
    },
    {
        id: 'serif',
        name: 'Serif',
        fontName: 'Droid Serif',
        url: 'https://fonts.googleapis.com/css?family=Droid+Serif:400,400italic,700,700italic'
    },
    {
        id: 'monospace',
        name: 'Monospace',
        fontName: 'Droid Sans Mono',
        url: 'https://fonts.googleapis.com/css?family=Droid+Sans+Mono'
    },
];

module.exports = SirTrevor.Block.extend({

    type: 'button',
    icon_name: 'button',

    clonable: true,

    title: function() {
        return i18n.t('blocks:button:title');
    },

    editorHTML: function() {
        return _.template(editorHTML, { imports: { i18n: i18n }, fonts: fonts });
    },

    loadData: function(data) {
        this.setTextBlockHTML(data.text);
        Object.keys(data)
        .forEach(function (key) {

            // Ignore data._* fields
            if (key.charAt(0) == '_')
                return;

            var val = data[key];

            if (key.indexOf('color') >= 0 && val.indexOf('rgb') >= 0) // colors: rgb -> hex
                val = this._rgbToHex(val);

            var $ell = this.$el.find('[name="'+ key + '"]');

            if ($ell.attr('units') && $ell.attr('units').length > 0)
                val = val.replace($ell.attr('units'), '');

            this.$el.find('[name="'+ key + '"]').val(val);
        }.bind(this))
        var $preview = this.$el.find('.st-preview');
        var $rows = this.$el.find('.st-row');
        $rows.hide();
        $preview.attr('contenteditable', 'false');
        $preview.click(function() {
            $rows.show();
            $preview.attr('contenteditable', 'true');
            $preview.unbind('click');
        });
    },

    onBlockRender: function() {
        // Setup shortcuts
        this.$preview = this.$el.find('.st-preview'); 
        this.$css = this.$editor.find('[name^="css-"]'); 

        // setup spectrum
        this.$editor.find('[type="color"]').spectrum({
            showInput: true,
            preferredFormat: "hex",
            showButtons: true,
            chooseText: i18n.t('blocks:button:accept'),
            cancelText: i18n.t('blocks:button:cancel')
        });

        // Set the default button text
        if ($(this.getTextBlockHTML()).text().length <= 0)
            this.setTextBlockHTML(i18n.t("blocks:button:hint:text"));

        this.$editor.find('[name="user-href"]')
            .attr('placeholder', i18n.t("blocks:button:hint:href"))
            .on('change input', this._onHrefChange.bind(this));// Listen for suer href changes and update the actual href

        // Listen for css inputs changes to refresh the preview
        this.$css.on('change input', this._onCssPropertyChange.bind(this));
        // Listen for spectrum color changes (as they click on the color pallete)
        this.$css.filter('[name*="color"]').on('move.spectrum', this._onCssPropertyChange.bind(this));
        // Refresh the preview
        this.$css.trigger('change');
    },

    _serializeData: function() {
        var data = {};

        if (this.hasTextBlock()) {
            data.text = this.getTextBlockHTML();
            data.format = 'html';
        }

        this.$('input, select').each(function(index, input){
            if (input.getAttribute('name')) {
                var val = input.value;
                if (input.getAttribute('units'))
                    val += input.getAttribute('units');
                data[input.getAttribute('name')] = val;
            }
        });

        data._fontUrl = _.find(fonts, { fontName: data['css-font-family'] });
        return data;
    },

    _onHrefChange: function(ev) {
        var $source = $(ev.target);
        var value = $source.val();
        var $target = this.$editor.find('[name="href"]');

        // ref: http://www.regular-expressions.info/email.html
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) 
            $target.val('mailto:' + value);
        else if (/^\+?[0-9\-]+$/.test(value))
            $target.val('tel:' + value);
        else if (/^(ftp|http|https):\/\/[^ "]+$/.test(value))
            $target.val(value);
        else if (value.length > 0)
            $target.val('http://' + value);
        else
            $target.val(value);
    },

    _onCssPropertyChange: function (ev, value) {
        var $target = $(ev.target);
        // Get the css property from the name
        var props = $target.attr('name').replace(/^css\-/, '');
        var val = value ? value.toString() : $target.val();

        // This is used for number indicator in range input
        $target.parents('.st-input-container').attr('st-value', val);

        if (value)
            $target.val(value);

        if ($target.attr('type') == 'range') {
            var _after = $target.next();
            _after.css('content', val);
        }

        if ($target.attr('units') && $target.attr('units').length > 0)
            val += $target.attr('units');

        props.split('_').forEach(function (prop) {
            this.$preview.css(prop, val);
        }, this);
    },

    _rgbToHex: function(color) {
        color = String(color).trim();

        if (color.indexOf('rgb(') != 0 || color.charAt(color.length - 1) != ')') // Dont even know what is this, do nothing
            return color;

        var rgbVals = color
                        .replace(/^rgb\(/, '')
                        .replace(/\)$/, '')
                        .split(/[\s,]+/)
                        .filter(function(n) { return !isNaN(n) })

        if (rgbVals.length != 3) // Don't know what is this, return the original silently
            return color; 

        return rgbVals.reduce(function(c, val) {
            var hex = Number(val).toString(16);
            if (hex.length == 1)
                hex = '0' + hex
            return c + hex
        }, '#')
    }
})