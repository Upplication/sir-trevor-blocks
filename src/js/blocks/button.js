(function() {
    "use strict";

    if (!SirTrevor)
        return console.error("SirTrevor.Blocks.Button could not load because SirTrevor wasn't found");


    SirTrevor.Blocks.Button = SirTrevor.Block.extend({
        type: 'button',
        title: function() { return i18n.t('blocks:button:title'); },
        icon_name: 'button',

        /**
            The indexes should be valid css property names.
            The values can be:
                - A fixed value, which will be asigned to the given property
                - An object containing the config for the input needed for its customization

            NOTE: CSS Properties can be either way the name between ' or ", or its camelized version.
        */
        cssProperties: {
            // a-Tag fixes
            display: 'block',
            textDecoration: 'none',
            // Static styles
            margin: '0 auto',
            border: '2px solid',
            textAlign: 'center',
            // Dynamic Styles
            backgroundColor: {
                label:  function() { return i18n.t('blocks:button:styles:backgroundColor') },
                input: { type: 'color' }
            },
            borderWidth: {
                label:  function() { return i18n.t('blocks:button:styles:borderWidth') },
                input: {
                    type: 'range',
                    min: 0,
                    max: 6,
                    step: 1,
                    units: 'px'
                },
            },
            borderColor: {
                label:  function() { return i18n.t('blocks:button:styles:borderColor') },
                input: { type: 'color' }
            },
            borderRadius: {
                label:  function() { return i18n.t('blocks:button:styles:borderRadius') },
                input: {
                    type: 'range',
                    min: 0,
                    max: 100,
                    step: 1,
                    units: 'px'
                },
            },
            width: {
                label:  function() { return i18n.t('blocks:button:styles:width') },
                input: {
                    type: 'range',
                    min: 10,
                    max: 100,
                    step: 1,
                    units: '%'
                },
            },
            lineHeight: {
                label:  function() { return i18n.t('blocks:button:styles:height') },
                input: {
                    type: 'range',
                    min: 0,
                    max: 500,
                    step: 1,
                    units: '%'
                },
            },
            fontStyle: {
                label:  function() { return i18n.t('blocks:button:styles:italic') },
                input: {
                    type: 'checkbox',
                    value: 'italic'
                }
            },
            fontWeight: {
                label:  function() { return i18n.t('blocks:button:styles:bold') },
                input: {
                    type: 'checkbox',
                    value: 'bold'
                }
            }
        },

        _namePrepend: 'st-button',
        _cssInputNamePrepend: 'css_',

        // Dynamic generation of the editor layout
        editorHTML: function() {
            var self = this;
            var component = $('<div>', { class: 'st-button' }); 
            var editor = $('<div>', { class: 'st-button-editor' });
            var preview = $('<div>', { class: 'st-button-preview' });

            var staticProperties = [
                {
                    property: 'caption',
                    text: i18n.t('blocks:button:caption'),
                },
                {
                    property: 'href',
                    text: i18n.t('blocks:button:href'),
                },
                {
                    property: 'onclick',
                    text: i18n.t('blocks:button:onclick'),
                }
            ];

            staticProperties.forEach(function (p) {
                var propDiv = $('<div>');
                propDiv.addClass(self._namePrepend + '-style');
                propDiv.addClass(self._namePrepend + '-style-' + p.property);
                propDiv.append($('<input>', { type: 'text', name: p.property, placeholder: p.text }));
                editor.append(propDiv);
            });

            Object.keys(self.cssProperties).forEach(function (cssProperty) {
                var div = $('<div>');
                var cssConfig = self.cssProperties[cssProperty];
                cssProperty = self._decamelize(cssProperty);
                div.addClass(self._namePrepend + '-style');
                div.addClass(self._namePrepend + '-style-' + cssProperty);

                if (_.isObject(cssConfig)) {
                    // We have an object instead of a direct value for the css property
                    // This means this css property can be edited, and we need to parse the
                    // given config. Each key represents an html tag needed in the css prop DOM editor
                    Object.keys(cssConfig).forEach(function (htmlTag) {
                        var propertyEditorConfig = cssConfig[htmlTag];

                        if (_.isFunction(propertyEditorConfig))
                            propertyEditorConfig = propertyEditorConfig();

                        var divTag = $('<' + htmlTag + '>');

                        // Here propertyEditorConfig might be a string or an object.
                        // If it is a string is added as the inner html of to the given htmlTag
                        // otherwise is parsed as attributes for the given html tag
                        if (_.isObject(propertyEditorConfig)) {
                            Object.keys(propertyEditorConfig).forEach(function (htmlTagAttr) {
                                var htmlTagValue = propertyEditorConfig[htmlTagAttr];
                                if (htmlTagAttr != 'html')
                                    divTag.attr(htmlTagAttr, htmlTagValue);
                                else
                                    divTag.html(htmlTagValue);
                            });

                            if (!divTag.attr('name') || divTag.attr('name').length <= 0)
                                divTag.attr('name', self._cssInputNamePrepend + cssProperty);
                        } else
                            divTag.html(propertyEditorConfig);

                        div.append(divTag);
                    })
                } else // Its not a config object, its a direct css value
                    div.append($('<input>', { type: 'hidden', name: self._cssInputNamePrepend + cssProperty, value: cssConfig}));

                editor.append(div);
            })

            component.append(editor);
            self.$preview = component.append(preview);;

            return component.html();
        },

        // http://stackoverflow.com/questions/11867545
        _getBackgroundColorForForegroundColor: function (hexcolor) {
            hexcolor = hexcolor.substr(1);
            var r = parseInt(hexcolor.substr(0,2), 16);
            var g = parseInt(hexcolor.substr(2,2), 16);
            var b = parseInt(hexcolor.substr(4,2), 16);
            var yiq = ((r*299) + (g*587) + (b*114)) / 1000;
            return (yiq >= 128) ? 'black' : 'white';
        },

        loadData: function(data) {
            var self = this;

            // Ignore these fields on the rebuild
            delete data.text;
            delete data.format;

            Object.keys(data).forEach(function (key) {
                var value = data[key];

                if (_.isObject(value)) {
                    Object.keys(value).forEach(function (childKey) {
                        var childValue = value[childKey];
                        var selector = '[class*="' + self._namePrepend + '-' +  key + '-' + childKey + '"] > input';
                        var valueEditor = self.$editor.find(selector);
                        if (valueEditor.attr('type') == 'range')
                            valueEditor.val(parseInt(childValue));
                        else if (valueEditor.attr('type') == 'checkbox')
                            valueEditor.prop('checked', valueEditor.val() == childValue);
                        else
                            valueEditor.val(childValue);
                    })
                } else
                    self.$editor.find('[name="' + key + '"]').val(value);
            })

            // Force the render call
            self._renderPreview(self)();
        },

        onBlockRender: function() {
            this.$editor.on('change', this._renderPreview(this));
            this.$editor.on('input', this._renderPreview(this));
        },

        _renderPreview: function(self) {
            return function (event) {
                var previewHTML = self.toHTML();
                self.$el.find('.st-button-preview').html(previewHTML);
            }
        },

        _decamelize: function(str) {
            return str.replace(/([A-Z])/g, '-' + '$1').toLowerCase();
        },

        // Override SirTrevor.Block default serialization of blocks for avoiding redundant data
        _serializeData: function() {
            var self = this;

            var result = {};
            result.caption = self.$el.find('input[name="caption"]').val();
            result.href = self.$el.find('input[name="href"]').val();
            result.onclick = self.$el.find('input[name="onclick"]').val();
            result.style = {};

            // Process the styles
            var styles = self.$el.find('input[name^="' + self._cssInputNamePrepend + '"]');
            styles.each(function (idx, elem) {
                elem = $(elem);
                var rgxCssPropName = new RegExp('^' + self._cssInputNamePrepend, 'i');
                var name = elem.attr('name');
                var units = elem.attr('units');
                var property = name.replace(rgxCssPropName, '');

                if (rgxCssPropName.test(name) && property.length > 0) {
                    var cssValue = elem.val();

                    if (!isNaN(cssValue)) { // If it is a number
                        if (units && units.length > 0) // Check if we were given any options
                            cssValue += units; 
                        else // asume its a fixed px value
                            cssValue += 'px';                
                    }

                    if ((elem.attr('type') == 'checkbox' || elem.attr('type') == 'radio') && !elem.is(':checked'))
                        cssValue = "";
                    
                    result.style[property] = cssValue;
                }
            })

            result.text = self.toHTML(result);
            result.format = 'html';

            return result;
        },

        toHTML: function(data) {
            var self = this;
            data = data || self.getBlockData();
            var preview = $('<a>');

            preview.attr('onclick', data.onclick);
            preview.attr('href', data.href);
            preview.html(data.caption);

            Object.keys(data.style).forEach(function (key) {
                preview.css(key, data.style[key]);
            });

            if (data.style['background-color'])
                preview.css('color', self._getBackgroundColorForForegroundColor(data.style['background-color']));

            return preview[0].outerHTML;
        }
    })
})();