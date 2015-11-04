(function() {
    var Locales = {
        en: {
            blocks: {
                button: {
                    title: "Button",
                    styles: {
                        backgroundColor: "Background Color",
                        borderWidth: "Border Width",
                        borderColor: "Border Color",
                        borderRadius: "Border Radius",
                        width: "Width",
                        height: "Height",
                    },
                    hint: {
                        text: '¡Escribe aqui el texto de tu Boton!',
                        href: 'Write an email, phone number or web URL here'
                    },
                    accept: 'Accept',
                    cancel: 'Cancel'
                },
                image_edit: {
                    finish: 'Confirm the crop for being able to save'
                },
                map: {
                    title: "Map",
                    hint: "Write an address here"
                },
                widget: {
                    title: "Widget",
                    hint: "Paste your external Widget html here"
                }
            }
        }
    };

    jQuery.extend(true, SirTrevor.Locales, Locales);
})();
(function() {
    var Locales = {
        es: {
            blocks: {
                button: {
                    title: "Botón",
                    styles: {
                        backgroundColor: "Color de fondo",
                        borderWidth: "Ancho del borde",
                        borderColor: "Color del borde",
                        borderRadius: "Radio del borde",
                        width: "Ancho",
                        height: "Alto"
                    },
                    hint: {
                        text: '¡Escribe aqui el texto de tu Boton!',
                        href: 'Escribe aqui un email, un telefono o una web'
                    },
                    accept: 'Aceptar',
                    cancel: 'Cancelar'
                },
                image_edit: {
                    finish: 'Confirma el recorte de la imagen para poder guardar'
                },
                map: {
                    title: "Mapa",
                    hint: "Escribe una direccion aquí"
                },
                widget: {
                    title: "Widget",
                    hint: "Pega el html de tu widget externo aquí"
                }
            }
        }
    };

    jQuery.extend(true, SirTrevor.Locales, Locales);
})();
(function() {
    "use strict";

    if (!SirTrevor)
        return console.error("SirTrevor.Blocks.Button could not load because SirTrevor wasn't found");

    SirTrevor.Blocks.Button = SirTrevor.Block.extend({
        type: 'button',
        title: function() { return i18n.t('blocks:button:title'); },
        icon_name: 'button',

        editorHTML: function() {
            return '<div class="st-editor"><div class="st-preview"><p class="st-required st-text-block" contenteditable="true"></p></div><div class="st-row"><div class="st-control"><div class="st-icon st-icon-link"></div><div class="st-input-container"> <input name="href" type="hidden"> <input name="user-href" type="text"></div></div></div><div class="st-row"><div class="st-column"><div class="st-control"><div class="st-icon st-icon-color"></div><div class="st-input-container"> <input class="st-value" name="css-background-color" type="color" value="#00CA6B"></div></div><div class="st-control"><div class="st-icon st-icon-width"></div><div class="st-input-container"> <input class="st-value" name="css-width" type="range" value="100" units="%" step="1" max="100" min="10"></div></div><div class="st-control"><div class="st-icon st-icon-height"></div><div class="st-input-container"> <input class="st-value" name="css-line-height" type="range" value="100" units="%" step="1" max="500" min="10"></div></div></div><div class="st-column"><div class="st-control"><div class="st-icon st-icon-color"></div><div class="st-input-container"> <input class="st-value" name="css-border-color" type="color" value="#4D4D4D"></div></div><div class="st-control"><div class="st-icon st-icon-border"></div><div class="st-input-container"> <input class="st-value" name="css-border-width" type="range" value="2" units="px" step="1" max="6" min="0"></div></div><div class="st-control"><div class="st-icon st-icon-radius"></div><div class="st-input-container"> <input class="st-value" name="css-border-radius" type="range" value="2" units="px" step="1" max="100" min="0"></div></div></div></div></div>';
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
            // Listen for the background-color changes to refresh the foreground color
            this.$css.filter('[name="css-background-color"]').on('change input', this._onBackgroundColorChange.bind(this))
            this.$css.filter('[name="css-background-color"]').on('move.spectrum', this._onBackgroundColorChange.bind(this));
            // Refresh the preview
            this.$css.trigger('change');
        },

        loadData: function(data) {
            this.setTextBlockHTML(data.text);
            Object.keys(data)
            .forEach(function (key) {
                var val = data[key];
                var $ell = this.$el.find('[name="'+ key + '"]');

                if ($ell.attr('units') && $ell.attr('units').length > 0)
                    val = val.replace($ell.attr('units'), '');

                this.$el.find('[name="'+ key + '"]').val(val);
            }.bind(this))
            // Hide controls and disable edit
            this.$el.find('.st-control').hide();
            this.$el.find('.st-text-block').attr('contenteditable', 'false');
        },

        _serializeData: function() {
            var data = {};

            if (this.hasTextBlock()) {
                data.text = this.getTextBlockHTML();
                data.format = 'html';
            }

            this.$('input').each(function(index, input){
                if (input.getAttribute('name')) {
                    var val = input.value;
                    if (input.getAttribute('units'))
                        val += input.getAttribute('units');
                    data[input.getAttribute('name')] = val;
                }
            });

            // Save also the color
            if (this.$preview)
                data['css-color'] = this.$preview.css('color');

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
            else
                $target.val('http://' + value);
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

            var r = parseInt(color.substr(0,2), 16);
            var g = parseInt(color.substr(2,2), 16);
            var b = parseInt(color.substr(4,2), 16);

            var yiq = ((r*299) + (g*587) + (b*114)) / 1000;
            return (yiq >= 128) ? '#000000' : '#FFFFFF';
        },

        alignable: true,
        align_options: {
            justify: false,
            handler: function(align) {
                if (align == 'center')
                    align = 'none';
                this.$preview.css('float', align);
            },
        },
    })
})();
(function() {
    "use strict";

    if (!SirTrevor)
        return console.error("SirTrevor.Blocks.HeaderAlign could not load because SirTrevor wasn't found");

    SirTrevor.Blocks.HeadingAlign = SirTrevor.Blocks.Heading.extend({
        type: 'heading_align',
        alignable: true
    });
})();
(function() {
    "use strict";

    if (!SirTrevor)
        return console.error("SirTrevor.Blocks.ImageEdit could not load because SirTrevor wasn't found");

    SirTrevor.Blocks.ImageEdit = SirTrevor.Blocks.Image.extend({

        type: "image_edit",
        title: function() { return i18n.t('blocks:image:title') },
        cropTimeout: 1000,

        controllable: true,
        controls: {
            save: function() {
                var data = {
                    name: this.filename + '.png',
                    folder: 'img',
                    base64content: this.$cropper('getCroppedCanvas').toDataURL()
                };

                this.resetErrors();
                this.$editor.html($('<img>', { src: data.base64content })).show();

                var handleError = function(err) {
                    if (err && err.cause !== undefined)
                        this.setError(this.$inputs, err.cause);
                    else
                        this.setError(this.$inputs, err);
                }.bind(this);

                $.ajax({
                    method: 'POST',
                    url: SirTrevor.config.defaults.uploadUrl,
                    data: data,
                    beforeSend: function() {
                        this.$control_ui.hide();
                        this.loading();
                    }.bind(this),
                    complete: function() {
                        this.ready();
                        this.performValidations();
                    }.bind(this)

                })
                .then(function (res) {
                    if (res.result == 'success') {
                        this.setAndLoadData({ file: { url: res.url } });
                        // event
                        var eventType = 'blocks:image_edit:uploaded';
                        var ev = jQuery.Event(ev);
                        ev.target = this.$editor.find('>img')[0];
                        this.mediator.trigger(eventType, ev);
                    } else
                        handleError(res);
                }.bind(this))
                .fail(handleError);
            }
        },

        validations: [ '_checkCropFinished' ],

        _isImageUploaded: function() {
            var data = this._getData();
            if (data && data.file && data.file.url.length > 0)
                return !/^data:image\/png;base64/.test(data.file.url);
            else
                return false;
        },

        _checkCropFinished: function() {
            if (!this.isEmpty() && !this._isImageUploaded())
                this.setError(this.$inputs, i18n.t('blocks:image_edit:finish'));
        },

        loadData: function(data){
            // Create our image tag
            this.$editor.html($('<img>', { src: data.file.url })).show();
            this.$control_ui.hide();
        },

        remove: function() {
            if (this.ajaxable) {
                this.resolveAllInQueue();
            }

            var data = this._getData();
            if (this._isImageUploaded()) {
                var ev = 'block:image_edit:remove';
                if (this.mediator._events[ev] && this.mediator._events[ev].length > 0) {
                    this.mediator.trigger(ev, data.file.url);
                } else {
                    $.ajax({
                        method: 'POST',
                        url: SirTrevor.config.defaults.imageDeleteUrl,
                        data: {
                            url: data.file.url
                        }
                    });
                }
            }

            this.$el.remove();
        },

        onBlockRender: function() {
            // Remove the default dropzone (from the dropable mixin)
            this.$dropzone
                .noDropArea()
                .unbind('drop');

            // Make the whole element a dropable zone
            this.$inner
                .dropArea()
                .bind('drop', this.__handleDrop.bind(this));

            /* Setup the upload button */
            this.$inputs.find('button')
                .bind('click', function (ev){ ev.preventDefault(); });
            this.$inputs.find('input')
                .on('change', (function (ev) { this.onDrop(ev.currentTarget); }).bind(this));

            // By default, hide the confirm crop button
            this.$control_ui.hide();
        },

        onDrop: function(transferData) {
            var file = transferData.files[0],
                urlAPI = (typeof URL !== "undefined") ? URL : (typeof webkitURL !== "undefined") ? webkitURL : null;

            if (/image/.test(file.type)) {
                this.filename = file.name;
                this.$control_ui.show();
                this.$inputs.hide();
                this.$el.noDropArea();
                this.$editor.html($('<img>', { src: urlAPI.createObjectURL(file) })).show();
                this.loading();
                var timerCache = null;
                var $img = this.$editor.find('>img');
                $img.cropper({
                    built: function () {
                        // Expose the $cropper at block level
                        this.$cropper = function() {
                            return $img.cropper.apply($img, arguments);
                        };
                        this.ready();
                    }.bind(this),
                    crop: function(e) {
                        // If we have a timer cache means user is cropping, cancel the previous timer
                        if (timerCache)
                            clearTimeout(timerCache);
                        else {
                            var e2 = jQuery.Event('crop:start');
                            e2.originalEvent = e;
                            this.$el.triggerHandler(e2, [this.$inputs.first()]);
                        }

                        timerCache = setTimeout(function () {
                            timerCache = null;
                            var e2 = jQuery.Event('crop:finish');
                            e2.originalEvent = e;
                            this.$el.triggerHandler(e2, [this.$inputs.first()]);
                        }.bind(this), this.cropTimeout);
                    }.bind(this)
                });
            }
        },

        isEmpty: function() {
            return this.$editor.find('img').length <= 0 || _.isEmpty(this._getData());
        },

        _serializeData: function() {
            var url = this.$editor.find('img').attr('src');

            if (this.$cropper && !/^http/.test(url))
                url = this.$cropper('getCroppedCanvas').toDataURL();

            if (url && url.length > 0)
                return  { file: { url: url } };
            else
                return null;
        },

        /*
            Fix for FFox upload.
            These two methods should be removed when updated to a new version of ST (current 0.5.0)
            ST fixed it on : d612cd6ce4b267677c40fd1ceea88820b382f5e4
         */
        // https://github.com/madebymany/sir-trevor-js/commit/d612cd6ce4b267677c40fd1ceea88820b382f5e4
        __handleDrop: function(e) {
            e.preventDefault();
            e = e.originalEvent;

            var el = $(e.target),
            types = this._toArray(e.dataTransfer.types);
            el.removeClass('st-dropzone--dragover');

            /*
            Check the type we just received,
            delegate it away to our blockTypes to process
            */
            if (types && types.some(function(type) { return this.valid_drop_file_types.includes(type) }, this))
                this.onDrop(e.dataTransfer);

            SirTrevor.EventBus.trigger('block:content:dropped', this.blockID);
        },

        // https://github.com/madebymany/sir-trevor-js/commit/d612cd6ce4b267677c40fd1ceea88820b382f5e4
        _toArray: function(obj) {
            if (Array.isArray(obj))
                return obj;

            var array = [];

            // iterate backwards ensuring that length is an UInt32
            for (var i = obj.length >>> 0; i--;)
                array[i] = obj[i];

            return array;
        }
    });
})();
(function() {
    "use strict";

    if (!SirTrevor)
        return console.error("SirTrevor.Blocks.Map could not load because SirTrevor wasn't found");

    SirTrevor.Blocks.Map = SirTrevor.Block.extend({

        type: "map",
        title: function() { return i18n.t('blocks:map:title') },
        icon_name: "map",

        default_width: 600,
        default_height: 300,
        default_zoom: 15,
        map_static_img: "https://maps.googleapis.com/maps/api/staticmap?size=<%= width %>x<%= height %>&center=<%= address %>&markers=|<%= address %>&zoom=<%= zoom %>&scale=2",
        map_link: "http://maps.google.com/maps?q=<%= address %>",

        editorHTML: function() {
            var address = $('<input>', { type: 'text', name:'address', placeholder: i18n.t('blocks:map:hint') });
            var zoom = $('<input>', { type: 'hidden', name:'zoom', value: this.default_zoom });
            var width = $('<input>', { type: 'hidden', name:'width', value: this.default_width });
            var height = $('<input>', { type: 'hidden', name:'height', value: this.default_height });
            var map = $('<div>', { class: 'map' });
            var container = $('<div>');
            container.append(address);
            container.append(zoom);
            container.append(width);
            container.append(height);
            container.append(map);
            map.css({
                'border-radius': '5px',
                'background-color': '#DDD',
                'background-position': 'center',
                'background-size': 'cover',
                'height': this.default_height + 'px',
                'width': '100%'
            });
            map.hide();
            return container.html();
        },

        inputTimeoutAmount: 1000,
        inputTimeoutId: null,
        onBlockRender: function() {
            this.$map = this.$el.find('.map');
            this.$zoom = this.$el.find('[name="zoom"]');

            var openGmaps = function() {
                window.open(this._getGmapsLink());
            }.bind(this);

            var zoomOnScroll = function (e) {

                if (!this.$map.is(':hover'))
                    return;
                e.preventDefault();

                var oEvent = e.originalEvent,
                    delta  = oEvent.deltaY || oEvent.wheelDelta;

                if (delta > 0)
                    this.$zoom.val(Math.max(0, Number(this.$zoom.val()) - 1));
                else
                    this.$zoom.val(Number(this.$zoom.val()) + 1);

                this._reloadMap();
            }.bind(this);

            // Prevent submit on enter
            this.$editor.bind('keypress keydown keyup', function (e){
                if(e.keyCode == 13) e.preventDefault();
            });

            this.$map.on('click', openGmaps);

            // If edition is enabled, zoom should be too
            if (this.$editor.is(":visible")) {
                this.$map.on('wheel mousewheel', zoomOnScroll);
                this.$editor.on('keyup change', this._reloadMap.bind(this));
            }
        },

        loadData: function(data) {
            Object.keys(data).forEach(function (key) {
                this.$el.find('[name="' + key + '"]').val(data[key]);
            }.bind(this));
            this.$editor.hide();
            this._reloadMap();
        },

        isEmpty: function() {
            return !(this.$el && this.$el.find('[name="address"]').length > 0 && this.$el.find('[name="address"]').val().length > 0);
        },

        _serializeData: function() {
            var address = this.$el.find('[name="address"]').val();

            if (!address || address.length <= 0)
                return null;

            return {
                address: address,
                zoom: this.$el.find('[name="zoom"]').val(),
                width: this.$el.find('[name="width"]').val(),
                height: this.$el.find('[name="height"]').val()
            }
        },

        _safeData: function(data) {
            var result = {};
            Object.keys(data).forEach(function(e) {
                result[e] = encodeURIComponent(data[e]);
            });
            return result;
        },

        _reloadMap: function() {
            var $map = this.$map || this.$el.find('.map');

            // Show the map if not visible
            if (!($map.is(':visible')))
                $map.show();

            // Set the UI variables for the loading effect
            if (!this.$el.hasClass('st--is-loading')) {
                this.loading();
                $map.css('opacity', '0.7');
            }

            clearTimeout(this.inputTimeoutId);
            this.inputTimeoutId = setTimeout(function() {
                this.ready();
                $map.css('opacity', '1');
                $map.css('background-image', 'url(' + (this._getGmapsStaticImage()) + ')');
            }.bind(this), this.inputTimeoutAmount);
        },

        _getGmapsLink: function() {
            return _.template(this.map_link, this._safeData(this.getData().data));
        },

        _getGmapsStaticImage: function() {
            return _.template(this.map_static_img, this._safeData(this.getData().data));
        }
    });
})();

(function() {
    "use strict";

    if (!SirTrevor)
        return console.error("SirTrevor.Blocks.TextAlign could not load because SirTrevor wasn't found");

    SirTrevor.Blocks.TextAlign = SirTrevor.Blocks.Text.extend({
        type: 'text_align',
        alignable: true
    });
})();
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
        html: '<div class="st-widget-editor-container"><span class="st-icon"></span><textarea class="st-paste-block" placeholder="<%= i18n.t("blocks:widget:hint") %>"></textarea></div>'
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
(function() {
    var BlockMixins = SirTrevor.BlockMixins;
    var Block = SirTrevor.Block;
    Block.prototype.availableMixins.push('alignable');

    var defaultAlignConfig = {
        aligns : {
            left: true,
            center: true,
            justify: true,
            right: true
        },
        handler: function(align) {
            this.getTextBlock().removeClass(function(index, classes) {
                return classes.split(' ')
                                .filter(function(a) { return /^st\-align-/.test(a) })
                                .join(' ');
            });
            this.getTextBlock().addClass('st-align-' + align);
        }
    };

    BlockMixins.Alignable = {
        mixinName: 'Alignable',

        initializeAlignable: function() {
            // For this mixin to work we need to also have the controllable mixin available.
            // Lets do some security checks
            if ((this.controllable === true && !this.$control_ui) || // controllable is enabled here but not yet initialized
                !this.controllable) { // we were not even marked as controllable
                this.controls = this.controls || {};
                this.withMixin(BlockMixins.Controllable);
                this.controllable = false; // This will prevent from double initing the controllable ui
            }

            this.align_options = Object.assign({}, defaultAlignConfig, this.align_options);
            Object.keys(this.align_options.aligns).forEach(function (align) {
                /*
                 val might be:
                    * `false`: Meaning this align should NOT be shown in the align controls.
                    * `true`: Meaning this align will be shown on the align controls, but its behaviour will be handled by `align_options.handler` or the default `align_options.handler`.
                    * `function() { ... } ` : A function that will be responsible for handling the click. It will be passed the align in css format (left, right, center, justify)
                */
                var val = this.align_options.aligns[align];

                if (val === false) // Do not even show this on the control ui
                    return;

                var handler = this.align_options.handler;
                if (val instanceof Function)
                    handler = val;

                if (!handler || !(handler instanceof Function))
                    throw new Error('AlignableMixin: No valid handler function found for ' + align);

                if (val === true) {
                    this.addUiControl('align-' + align, function(e) {
                        this._getData().align = align;
                        (handler.bind(this))(align);
                        if (e.originalEvent) { // Check if we were triggered by a human or not
                            // If we were triggered by a human, raise the event, otherwise dont.
                            // This allows us to use the handler click event for setting the initial
                            // align in the block.
                            console.log("raising block:aligned event");
                            var ev = jQuery.Event();
                            ev.originalEvent = e;
                            ev.target = this.$el;
                            ev.align = align;
                            this.mediator.trigger('block:aligned', ev);
                        }
                    }.bind(this));
                }
            }.bind(this));

            var data = this._getData();
            if (data && data.align)
                this.$control_ui.find('[class*="align-' + data.align + '"]').click();
        },
    }
})();