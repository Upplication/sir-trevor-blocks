(function() {
    var Locales = {
        en: {
            blocks: {
                button: {
                    title: "Button",
                    controls: {
                        action: "Action",
                        dimensions: "Dimensions",
                        border: "Border",
                        font: "Font",
                        width: "Width",
                        height: "Height",
                        radius: "Radius",
                        size: "Size",
                        type: "Type",
                        background: "Background",
                        color: "Color",
                        align: "Align",
                        center: "Center",
                        left: "Left",
                        right: "Right"
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
                spacer: {
                    title: "Spacer",
                    size: "Size"
                },
                widget: {
                    title: "Widget",
                    hint: "Paste your external Widget html here",
                    edit: "Double click for edit"
                },
                ck_editor: {
                    title: "Text"
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
                    controls: {
                        action: "Acción",
                        dimensions: "Dimensiones",
                        border: "Borde",
                        font: "Fuente",
                        width: "Ancho",
                        height: "Alto",
                        radius: "Radio",
                        size: "Tamaño",
                        type: "Tipo",
                        background: "Fondo",
                        color: "Color",
                        align: "Alineado",
                        center: "Centro",
                        left: "Izquierda",
                        right: "Derecha"
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
                spacer: {
                    title: "Separador",
                    size: "Tamaño"
                },
                widget: {
                    title: "Widget",
                    hint: "Pega el html de tu widget externo aquí",
                    edit: "Haz doble clic para editar"
                },
                ck_editor: {
                    title: "Texto"
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
            return _.template('<div class="st-editor"><div class="st-preview st-margin-bottom-20"><p class="st-required st-text-block" contenteditable="true"></p></div><div class="st-row st-margin-bottom-20"><div class="st-column st-column-66 st-padding-right-25"><div class="st-control"><h4 class="st-field-name"><%= i18n.t("blocks:button:controls:action") %></h4><div class="st-input-container st-input-container-resert"> <input name="href" type="hidden"> <input class="st-input-long" name="user-href" type="text"></div></div></div><div class="st-column st-column-33 st-padding-left-25"><div class="st-control"><h5 class="st-field-name st-align-name"><%= i18n.t("blocks:button:controls:align") %></h5><div class="st-input-container st-select"> <select class="st-value" name="css-float"><option value="none"><%= i18n.t("blocks:button:controls:center") %></option><option value="left"><%= i18n.t("blocks:button:controls:left") %></option><option value="right"><%= i18n.t("blocks:button:controls:right") %></option></select></div></div></div></div><div class="st-row"><div class="st-column st-column-33 st-padding-right-25"><h4><%= i18n.t("blocks:button:controls:dimensions") %></h4><div class="st-control"><h5 class="st-field-name"><%= i18n.t("blocks:button:controls:width") %></h5><div class="st-input-container"> <input class="st-value" name="css-width" type="range" value="100" units="%" step="1" max="100" min="10"></div></div><div class="st-control"><h5 class="st-field-name"><%= i18n.t("blocks:button:controls:height") %></h5><div class="st-input-container"> <input class="st-value" name="css-padding" type="range" value="1" units="em 0" step="0.1" max="5" min="0.2"></div></div><div class="st-control"><h5 class="st-field-name"><%= i18n.t("blocks:button:controls:background") %></h5><div class="st-input-container st-color"> <input class="st-value" name="css-background-color" type="color" value="#00CA6B"></div></div></div><div class="st-column st-column-33 st-padding-sides-25"><h4><%= i18n.t("blocks:button:controls:border") %></h4><div class="st-control"><h5 class="st-field-name"><%= i18n.t("blocks:button:controls:width") %></h5><div class="st-input-container"> <input class="st-value" name="css-border-width" type="range" value="2" units="px" step="1" max="6" min="0"></div></div><div class="st-control"><h5 class="st-field-name"><%= i18n.t("blocks:button:controls:radius") %></h5><div class="st-input-container"> <input class="st-value" name="css-border-radius" type="range" value="2" units="px" step="1" max="100" min="0"></div></div><div class="st-control"><h5 class="st-field-name"><%= i18n.t("blocks:button:controls:color") %></h5><div class="st-input-container st-color"> <input class="st-value" name="css-border-color" type="color" value="#4D4D4D"></div></div></div><div class="st-column st-column-33 st-padding-left-25"><h4><%= i18n.t("blocks:button:controls:font") %></h4><div class="st-control"><h5 class="st-field-name"><%= i18n.t("blocks:button:controls:size") %></h5><div class="st-input-container"> <input class="st-value" name="css-font-size" type="range" value="2" units="em" step="0.1" max="5" min="0.2"></div></div><div class="st-control"><h5 class="st-field-name"><%= i18n.t("blocks:button:controls:type") %></h5><div class="st-input-container st-select"> <select class="st-value" name="css-font-family"><option value="sans-serif">Sans Serif</option><option value="cursive">Cursive</option><option value="fantasy">Fantasy</option><option value="serif">Serif</option><option value="monospace">Monospace</option></select></div></div><div class="st-control"><h5 class="st-field-name"><%= i18n.t("blocks:button:controls:color") %></h5><div class="st-input-container st-color"> <input class="st-value" name="css-color" type="color" value="#4D4D4D"></div></div></div></div></div>', { imports: { i18n: i18n } });
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
            var props = $target.attr('name').replace(/^css\-/, '');
            var val = value ? value.toString() : $target.val();

            // This is used for number indicator in range input
            $target.attr('st-value', val);

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
        }
    })
})();
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
        editorHTML: '<textarea class="st-text-block" rows="10" cols="80"></textarea>',
        loadData: function(data) {
            this.$editor.val(data.text);
        },

        onBlockRender: function(){
            //
            if (this.config && this.config.basePath) {
                CKEDITOR.basePath = this.config.basePath;
            }

            this.ckeditor = CKEDITOR.replace(this.getTextBlock()[0], {
                extraPlugins: 'colorbutton,colordialog,font,justify',
                // http://stackoverflow.com/questions/23538462/how-to-remove-buttons-from-ckeditor-4
                toolbarGroups: [
                    {"name":"basicstyles","groups":["basicstyles"]},
                    {"name":"links","groups":["links"]},
                    {"name":"paragraph","groups":["list","blocks", "align"]},
                    {"name":"insert", "groups": ['Table']},
                    {"name":"styles"},
                    {"name":"colors"},
                    {"name":"source", "groups": ['Source'] }
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
                type: 'html',
                text: this.ckeditor ? this.ckeditor.getData() : ''
            }
        }
    });
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
                    base64content: this.$cropper('getCroppedCanvas').toDataURL(this.type)
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
                return !/^data:image\/[a-z]{1,};base64/.test(data.file.url);
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
                this.type = file.type;
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
                url = this.$cropper('getCroppedCanvas').toDataURL(this.type);

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
        return console.error("SirTrevor.Blocks.Spacer could not load because SirTrevor wasn't found");

    SirTrevor.Blocks.Spacer = SirTrevor.Block.extend({

      type: "spacer",
      title: function() { return i18n.t('blocks:spacer:title') },
      editorHTML: '<div class="st-control"><div class="st-value-container"> <span><%= i18n.t("blocks:spacer:size") %></span> <input class="st-value" name="height" type="range" value="5" units="vw" step="0.1" max="50" min="0" /></div><span class="st-output"></span></div>',

      loadData: function(data) {
        this.$height = this.$height || this.$editor.find('[name="height"]');
        this.$height.val(data.height);
        this.$height.attr('units', data.units);
      },

      onBlockRender: function() {
        this.$height = this.$height || this.$editor.find('[name="height"]');
        this.$height.on('change input', function(ev) {
          var $target = this.$(ev.target);
          var val = $target.val();
          this.$('.st-output').html(val);
        }.bind(this));
        this.$height.trigger('change');
      },

      _serializeData: function() {
        return {
          height: this.$height ? this.$height.val() : 0,
          units: this.$height ? this.$height.attr('units') : ''
        };
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

    SirTrevor.Blocks.Widget = SirTrevor.Blocks.Text.extend({

        type: "widget",
        title: function() { return i18n.t('blocks:widget:title') },
        icon_name: "code",
        editorHTML: '<div class="st-widget-editor-container"><div class="editor"><span class="st-icon"></span><textarea name="text" class="st-required"></textarea></div><div style="display: none" class="preview"><pre><code class="lang-html"></code></pre></div></div>',

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

            this.align_options = jQuery.extend(true, {}, defaultAlignConfig, this.align_options);
            Object.keys(this.align_options.aligns).forEach(function (align) {
                /*
                 val might be:
                    * `false`: Meaning this align should NOT be shown in the align controls.
                    * `true`: Meaning this align will be shown on the align controls, but its behaviour will be handled by `align_options.handler` or the default `align_options.handler`.
                    * `function() { ... } ` : A function that will be responsible for handling the click. It will be passed the align in css format (left, right, center, justify)
                */
                var val = this.align_options.aligns[align];

                if (val == false) // Do not even show this on the control ui
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