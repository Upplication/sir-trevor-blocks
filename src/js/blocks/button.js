(function() {
    "use strict";

    if (!SirTrevor)
        return console.error("SirTrevor.Blocks.Button could not load because SirTrevor wasn't found");

    var defaults = {
        "background-color": "#00CA6B".
        "width": "100%",
        "line-height": "initial",
        "border-color": "#4D4D4D",
        "border-radius": "2px",
        "border-width": "2px"
    };

    SirTrevor.Blocks.Button = SirTrevor.Block.extend({
        type: 'button',
        title: function() { return i18n.t('blocks:button:title'); },
        icon_name: 'button',

        editorHTML: function() {
            return '@@include("button/editor.html")';
        },

        onBlockRender: function() {
            // Setup shortcuts
            this.$preview = this.$el.find('.st-preview'); 
            this.$css = this.$editor.find('[name^="css-"]');

            // Set the default button text
            this.$preview.find('[contenteditable="true"]').html(i18n.t("blocks:button:hint:text"));

            // Listen for css inputs changes to refresh the preview
            this.$css.on('change input', this._onCssPropertyChange.bind(this));
            // Listen for the background-color changes to refresh the foreground color
            this.$css.filter('[name="css-background-color"]').on('change input', this._onBackgroundColorChange.bind(this));

            // Add the default class and a self destroying listener for removing it
            this.$preview.addClass('default');
            this._loadDefaultProperties();
        },

        _loadDefaultProperties: function() {
            this.$css.each(function (i, el) {
                var $el = $(el);
                var property = $el.attr('name').replace(/^css\-/, '');

                var rawValue = $el.val();
                var units = $el.attr('units') || "";
                var value = rawValue + units;

                var defaultValue = defaults[property];
                var defaultValueRaw = defaultValue.replace(units, '');

                $el.val(defaultValueRaw);
            }.bind(this));
        },

        _onCssPropertyChange: function (ev) {
            var $target = $(ev.target);
            // Get the css property from the name
            var prop = $target.attr('name').replace(/^css\-/, '');
            var val = $target.val();

            if ($target.attr('units') && $target.attr('units').length > 0)
                val += $target.attr('units');

            this.$preview.css(prop, val);
        },

        _onBackgroundColorChange: function() {
            this.$preview.css('color', (this._getFontColor.bind(this))());
        },

        _getFontColor: function (hexc) {
            var hexPattern = /^#/;
            var rgbPattern = /^rgb\(.*([0-9]+).*,.*([0-9]+),.*([0-9]+).*\)/;

            var hexcolor = (hexc || this.$preview.css('background-color'));
            var r, g, b;
            if (hexPattern.test(hexcolor)) {
                hexcolor = hexcolor.substr(1);
                r = parseInt(hexcolor.substr(0,2), 16);
                g = parseInt(hexcolor.substr(2,2), 16);
                b = parseInt(hexcolor.substr(4,2), 16);
            } else if (rgbPattern.test(hexcolor)) {
                var rgbMatch = rgb.exec();
                r = parseInt(rgbMatch[1]);
                g = parseInt(rgbMatch[2]);
                b = parseInt(rgbMatch[3]);
            }

            var yiq = ((r*299) + (g*587) + (b*114)) / 1000;
            return (yiq >= 128) ? 'inherit' : '#FFFFFF';
        },
    })
})();