(function() {
    "use strict";

    if (!SirTrevor)
        return console.error("SirTrevor.Blocks.Button could not load because SirTrevor wasn't found");

    var defaults = {
        "background-color": "#00CA6B",
        "width": "100%",
        "line-height": "100%",
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

            // load the defaults
            this._loadProperties();

            // setup spectrum
            this.$editor.find('[type="color"]').spectrum({
                showInput: true,
                showButtons: false,
                preferredFormat: "hex",
            });

            // Set the default button text
            this.$preview.find('[contenteditable="true"]').html(i18n.t("blocks:button:hint:text"));

            // Listen for css inputs changes to refresh the preview
            this.$css.on('change input', this._onCssPropertyChange.bind(this));
            // Listen for spectrum color changes (as they click on the color pallete)
            this.$css.filter('[name*="color"]').on('move.spectrum', this._onCssPropertyChange.bind(this));
            // Listen for the background-color changes to refresh the foreground color
            this.$css.filter('[name="css-background-color"]').on('change input', this._onBackgroundColorChange.bind(this))
            this.$css.filter('[name="css-background-color"]').on('move.spectrum', this._onBackgroundColorChange.bind(this));
        },

        loadData: function(data) {
            console.log("load data");
            console.log(data);
            this._loadedData = true;
        },

        _loadProperties: function() {
            console.log("load default");
            this.$css.each(function (i, el) {
                var $el = $(el);
                var property = $el.attr('name').replace(/^css\-/, '');

                var rawValue = $el.val();
                var units = $el.attr('units') || "";
                var value = rawValue + units;

                var defaultValue = defaults[property];
                var defaultValueRaw = defaultValue.replace(units, '');

                var currentValue = this._loadedData === true > 0 ? value : defaultValue;

                console.log(property + " -----------------------")
                console.log("rawValue" + rawValue);
                console.log("defaultValue" + defaultValue);
                console.log("value" + value);
                console.log("currentValue" + currentValue);

                this.$preview.css(property, currentValue);
                $el.val(currentValue);
            }.bind(this));
        },

        _onCssPropertyChange: function (ev, value) {
            var $target = $(ev.target);
            // Get the css property from the name
            var prop = $target.attr('name').replace(/^css\-/, '');
            var val = value ? value.toString() : $target.val();

            if (value)
                $target.val(value);

            if ($target.attr('units') && $target.attr('units').length > 0)
                val += $target.attr('units');

            this.$preview.css(prop, val);
        },

        _onBackgroundColorChange: function(c) {
            this.$preview.css('color', (this._getFontColor.bind(this))(c));
        },

        _getFontColor: function (c) {
            var hexPattern = /^#/;
            var rgbPattern = /^rgb\(.*([0-9]+).*,.*([0-9]+),.*([0-9]+).*\)/;

            var color = $(c.target).spectrum('get').toHex();
            console.log(c);
            console.log(color);

            var r = parseInt(color.substr(0,2), 16);
            var g = parseInt(color.substr(2,2), 16);
            var b = parseInt(color.substr(4,2), 16);

            var yiq = ((r*299) + (g*587) + (b*114)) / 1000;
            return (yiq >= 128) ? 'inherit' : '#FFFFFF';
        }
    })
})();