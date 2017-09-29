/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// Webpack JS entry point
	var Utils = __webpack_require__(21);

	Utils.loadLocale('es', __webpack_require__(24));
	Utils.loadLocale('en', __webpack_require__(25));

	Utils.loadBlock(__webpack_require__(26));
	Utils.loadBlock(__webpack_require__(30));
	Utils.loadBlock(__webpack_require__(33));
	Utils.loadBlock(__webpack_require__(36));
	Utils.loadBlock(__webpack_require__(37));
	Utils.loadBlock(__webpack_require__(38));
	Utils.loadBlock(__webpack_require__(40));

	Utils.loadMixin(__webpack_require__(43));
	Utils.loadMixin(__webpack_require__(44));


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(22);
	var SirTrevor = __webpack_require__(23);

	module.exports = {

		loadLocale: function(localeName, locale) {
			SirTrevor.Locales[localeName] = SirTrevor.Locales[localeName] || {};
			$.extend(true, SirTrevor.Locales[localeName], locale);
		},

		loadMixin: function(mixin) {
		    SirTrevor.BlockMixins[this._classify(mixin.mixinName)] = mixin;
		    SirTrevor.Block.prototype.availableMixins.push(mixin.mixinName.toLowerCase());
		},

		loadBlock: function(block) {
			SirTrevor.Blocks[this._classify(block.prototype.type)] = block;
		},

		_titleize: function(str){
			if (str === null)
				return '';
			str  = String(str).toLowerCase();
			return str.replace(/(?:^|\s|-)\S/g, function(c){ return c.toUpperCase(); });
		},

		_classify: function(str){
			return this._titleize(String(str).replace(/[\W_]/g, ' ')).replace(/\s/g, '');
		},
	}

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = SirTrevor;

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = {
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
	                text: "¡Escribe aqui el texto de tu Boton!",
	                href: "Escribe aqui un email, un telefono o una web"
	            },
	            accept: "Aceptar",
	            cancel: "Cancelar"
	        },
	        image_edit: {
	            href: "Enlace o acción",
	            finish: "Confirma el recorte de la imagen para poder guardar"
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
	        },
	        columns: {
	            title: "Columnas"
	        }
	    }
	}

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = {
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
	                text: "Write here a caption for your button!",
	                href: "Write an email, phone number or web URL here"
	            },
	            accept: "Accept",
	            cancel: "Cancel"
	        },
	        image_edit: {
	            href: "Link or action",
	            finish: "Confirm the crop for being able to save"
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
	        },
	        columns: {
	            title: "Columns"
	        }
	    }
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27);
	var $ = __webpack_require__(22);
	var i18n = __webpack_require__(28);
	var SirTrevor = __webpack_require__(23);
	var editorHTML = __webpack_require__(29);

	module.exports = SirTrevor.Block.extend({

	    type: 'button',
	    icon_name: 'button',

	    clonable: true,

	    fonts: [
	        {
	            name: 'Open Sans',
	            url: 'https://fonts.googleapis.com/css?family=Open+Sans:400,400italic,700,700italic',
	            fallback: 'sans-serif'
	        },
	        {
	            name: 'Gloria Hallelujah',
	            url: 'https://fonts.googleapis.com/css?family=Gloria+Hallelujah',
	            fallback: 'cursive',
	        },
	        {
	            name: 'Anton',
	            url: 'https://fonts.googleapis.com/css?family=Anton',
	            fallback: 'fantasy',
	        },
	        {
	            name: 'Droid Serif',
	            url: 'https://fonts.googleapis.com/css?family=Droid+Serif:400,400italic,700,700italic',
	            fallback: 'serif',
	        },
	        {
	            name: 'Droid Sans Mono',
	            url: 'https://fonts.googleapis.com/css?family=Droid+Sans+Mono',
	            fallback: 'monospace',
	        },
	    ],

	    title: function() {
	        return i18n.t('blocks:button:title');
	    },

	    editorHTML: function() {
	        return _.template(editorHTML, { imports: { i18n: i18n }, fonts: this.fonts });
	    },

	    loadData: function(data) {
	        this.setTextBlockHTML(data.text);
	        Object.keys(data)
	        .forEach(function (key) {

	            // Ignore data._* fields
	            if (key.charAt(0) == '_')
	                return;

	            var val = data[key];

	            if (key.indexOf('font-family') >= 0) {
	                var font = _.find(this.fonts, { name: val });
	                var fontFallback = _.find(this.fonts, { fallback: val });
	                if (data._fontFallback)
	                    fontFallback = _.find(this.fonts, { fallback: data._fontFallback });
	                var defaultFont = this.fonts[0];
	                val = (font || fontFallback || defaultFont).name;
	            }

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
	        var content = this.getTextBlockHTML();

	        try { // Sometimes there will be a enclosing <p>, sometimes not :/
	            content = $(content).text() || content;
	        } catch (e) {} // Do nothing

	        if (content.length <= 0)
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

	        var font = _.find(this.fonts, { name: data['css-font-family'] });
	        var fontFamilyFallback = _.find(this.fonts, { fallback: data['css-font-family'] });
	        var fontDefaultFallback = this.fonts[0];

	        // Support for fallback
	        if (!font)
	            font = fontFamilyFallback || fontDefaultFallback

	        data._fontUrl = font.url;
	        data._fontFallback = font.fallback;
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

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = _;

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = i18n;

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = "<div class=\"st-editor\">\n\t<% _.forEach(fonts, function(font) { %>\n\t<link href='<%= font.url %>' rel='stylesheet' type='text/css'>\n\t<% }) %>\n\t<div class=\"st-preview st-margin-bottom-20\">\n\t\t<p class=\"st-required st-text-block\" contenteditable=\"true\"></p>\n\t</div>\n\n\t<div class=\"st-row st-margin-bottom-20\">\n\t\t<div class=\"st-column st-column-66 st-padding-right-25\">\n\t\t\t<div class=\"st-control\">\n\t\t\t\t<h4 class=\"st-field-name\"><%= i18n.t(\"blocks:button:controls:action\") %></h4>\n\t\t\t\t<div class=\"st-input-container st-input-container-resert\">\n\t\t\t\t\t<input name=\"href\" type=\"hidden\">\n\t\t\t\t\t<input class=\"st-input-long\" name=\"user-href\" type=\"text\">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"st-column st-column-33 st-padding-left-25\">\n\t\t\t<div class=\"st-control\">\n\t\t\t\t<h5 class=\"st-field-name st-align-name\"><%= i18n.t(\"blocks:button:controls:align\") %></h5>\n\t\t\t\t<div class=\"st-input-container st-select\">\n\t\t\t\t\t<select class=\"st-value\" name=\"css-float\">\n\t\t\t\t\t\t<option value=\"none\"><%= i18n.t(\"blocks:button:controls:center\") %></option>\n\t\t\t\t\t\t<option value=\"left\"><%= i18n.t(\"blocks:button:controls:left\") %></option>\n\t\t\t\t\t\t<option value=\"right\"><%= i18n.t(\"blocks:button:controls:right\") %></option>\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class=\"st-row\">\n\t\t<div class=\"st-column st-column-33 st-padding-right-25\">\n\t\t\t<h4><%= i18n.t(\"blocks:button:controls:dimensions\") %></h4>\n\t\t\t<div class=\"st-control\">\n\t\t\t\t<h5 class=\"st-field-name\"><%= i18n.t(\"blocks:button:controls:width\") %></h5>\n\t\t\t\t<div class=\"st-input-container st-range\">\n\t\t\t\t\t<input class=\"st-value\" name=\"css-width\" type=\"range\" value=\"100\" units=\"%\" step=\"1\" max=\"100\" min=\"10\">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"st-control\">\n\t\t\t\t<h5 class=\"st-field-name\"><%= i18n.t(\"blocks:button:controls:height\") %></h5>\n\t\t\t\t<div class=\"st-input-container st-range\">\n\t\t\t\t\t<input class=\"st-value\" name=\"css-padding\" type=\"range\" value=\"1\" units=\"em 0\" step=\"0.1\" max=\"5\" min=\"0.2\">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"st-control\">\n\t\t\t\t<h5 class=\"st-field-name\"><%= i18n.t(\"blocks:button:controls:background\") %></h5>\n\t\t\t\t<div class=\"st-input-container st-color\">\n\t\t\t\t\t<input class=\"st-value\" name=\"css-background-color\" type=\"color\" value=\"#00CA6B\">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"st-column st-column-33 st-padding-sides-25\">\n\t\t\t<h4><%= i18n.t(\"blocks:button:controls:border\") %></h4>\n\t\t\t<div class=\"st-control\">\n\t\t\t\t<h5 class=\"st-field-name\"><%= i18n.t(\"blocks:button:controls:width\") %></h5>\n\t\t\t\t<div class=\"st-input-container st-range\">\n\t\t\t\t\t<input class=\"st-value\" name=\"css-border-width\" type=\"range\" value=\"2\" units=\"px\" step=\"1\" max=\"6\" min=\"0\">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"st-control\">\n\t\t\t\t<h5 class=\"st-field-name\"><%= i18n.t(\"blocks:button:controls:radius\") %></h5>\n\t\t\t\t<div class=\"st-input-container st-range\">\n\t\t\t\t\t<input class=\"st-value\" name=\"css-border-radius\" type=\"range\" value=\"2\" units=\"px\" step=\"1\" max=\"100\" min=\"0\">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"st-control\">\n\t\t\t\t<h5 class=\"st-field-name\"><%= i18n.t(\"blocks:button:controls:color\") %></h5>\n\t\t\t\t<div class=\"st-input-container st-color\">\n\t\t\t\t\t<input class=\"st-value\" name=\"css-border-color\" type=\"color\" value=\"#4D4D4D\">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"st-column st-column-33 st-padding-left-25\">\n\t\t\t<h4><%= i18n.t(\"blocks:button:controls:font\") %></h4>\n\t\t\t<div class=\"st-control\">\n\t\t\t\t<h5 class=\"st-field-name\"><%= i18n.t(\"blocks:button:controls:size\") %></h5>\n\t\t\t\t<div class=\"st-input-container st-range\">\n\t\t\t\t\t<input class=\"st-value\" name=\"css-font-size\" type=\"range\" value=\"2\" units=\"em\" step=\"0.1\" max=\"5\" min=\"0.2\">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"st-control\">\n\t\t\t\t<h5 class=\"st-field-name\"><%= i18n.t(\"blocks:button:controls:type\") %></h5>\n\t\t\t\t<div class=\"st-input-container st-select\">\n\t\t\t\t\t<select class=\"st-value\" name=\"css-font-family\">\n\t\t\t\t\t\t<% _.forEach(fonts, function(font) { %>\n\t\t\t\t\t\t<option value=\"<%= font.name %>\"><%= font.name %></option>\n\t\t\t\t\t\t<% }) %>\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"st-control\">\n\t\t\t\t<h5 class=\"st-field-name\"><%= i18n.t(\"blocks:button:controls:color\") %></h5>\n\t\t\t\t<div class=\"st-input-container st-color\">\n\t\t\t\t\t<input class=\"st-value\" name=\"css-color\" type=\"color\" value=\"#4D4D4D\">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>";

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var SirTrevor = __webpack_require__(23);
	var i18n = __webpack_require__(28);
	var editorHTML = __webpack_require__(31);
	var CKEDITOR = __webpack_require__(32);

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

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = "<textarea class=\"st-text-block\" rows=\"10\" cols=\"80\"></textarea>";

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = CKEDITOR;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(22);
	var i18n = __webpack_require__(28);
	var SirTrevor = __webpack_require__(23);
	var editorHTML = __webpack_require__(34);
	var positionerFix = __webpack_require__(35);

	module.exports = SirTrevor.Block.extend({

	    type: "columns",
	    title: function() {
	        return i18n.t('blocks:columns:title')
	    },

	    _editorsSelectors: [
	        '.st-columns-editor-left > .editor',
	        '.st-columns-editor-right > .editor'
	    ],

	    editorHTML: editorHTML,

	    onBlockRender: function() {
	        var self = this;
	        var parentStEditor = SirTrevor.getInstance(self.instanceID);
	        var blockTypes = parentStEditor.options.blockTypes.filter(function(type) {
	            return type.toLowerCase() != self.type;
	        });

	        self._editors = self._editorsSelectors.map(function(selector, idx) {
	            return new SirTrevor.Editor({
	                el: self.$(selector),
	                blockTypes: blockTypes,
	                blockLimit: 1,
	            });
	        })

	        SirTrevor.EventBus.on('block:reorder:dropped', function(blockId) {
	            if (blockId == self.blockID)
	                self._triggerChangePositionOnChildModules();
	        });

	        self.mediator.on('block:changePosition', function($block) {
	            if ($block == self.$el)
	                self._triggerChangePositionOnChildModules();
	        });

	        // TODO: Fix me when reordirng a block column does not mess this it up
	        if ($('style#st-block-positioner-fix').length <= 0)
	            $('head').append(positionerFix);
	    },

	    loadData: function(data) {
	        var self = this;
	        data.columns.forEach(function(column, idx) {
	            var selector = self._editorsSelectors[idx];
	            self.$(selector).val(JSON.stringify( { data: column.blocks } ));
	        })
	    },

	    _serializeData: function() {
	        var self = this;
	        var result = {
	            columns: (self._editors || []).map(function(st) {
	                return {
	                    blocks: self._retrieveEditorData(st)
	                }
	            })
	        };

	        var isEmpty = result.columns.reduce(function(empty, column) {
	            return empty && column.blocks.length <= 0;
	        }, true);

	        if (!isEmpty)
	            return result;
	        else
	            return {};
	    },

	    _retrieveEditorData: function(editor) {
	        // Force SirTrevor to update its internal data store
	        editor.store.reset();
	        editor.validateBlocks(false);
	        return editor.store.retrieve().data;
	    },

	    _triggerChangePositionOnChildModules: function() {
	        this._editors.forEach(function(editor) {
	            editor.block_manager.blocks.forEach(function(block) {
	                block.mediator.trigger('block:changePosition', block.$el);
	            })
	        })
	    }
	})

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = "<div class=\"st-columns-block\">\n\t<div class=\"st-columns-editor st-columns-editor-left\">\n\t\t<textarea class=\"editor\"></textarea>\n\t</div>\n\t<div class=\"st-columns-editor st-columns-editor-right\">\n\t\t<textarea class=\"editor\"></textarea>\n\t</div>\n</div>";

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = "<style id=\"st-block-positioner-fix\">.st-block-positioner { display: none; }</style>";

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27);
	var $ = __webpack_require__(22);
	var i18n = __webpack_require__(28);
	var SirTrevor = __webpack_require__(23);

	module.exports = SirTrevor.Blocks.Image.extend({

	    type: "image_edit",
	    title: function() { return i18n.t('blocks:image:title') },
	    cropTimeout: 1000,

	    controllable: true,
	    controls: {
	        save: function() {
	            var data = {
	                name: this.filename + '.png',
	                folder: 'img',
	                base64content: this._getCroppedImageBlobUrl()
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

	        this.$href = $('<input>', {
	            class: 'image-href',
	            type: 'text',
	            placeholder: i18n.t('blocks:image_edit:href')
	        })
	        .val(data.href)
	        .appendTo(this.$editor);

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
	        var href = this.$href ? this.$href.val() : null;

	        if (this.$cropper && !(/^http/.test(url) || /^\/\//.test(url)))
	            url = this._getCroppedImageBlobUrl();

	        if (url && url.length > 0)
	            return  {
	                href: href,
	                file: { url: url }
	            };
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
	    },

	    _getCroppedImageBlobUrl: function() {
	        return this.$cropper('getCroppedCanvas').toDataURL('image/png');
	    },
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27);
	var $ = __webpack_require__(22);
	var i18n = __webpack_require__(28);
	var SirTrevor = __webpack_require__(23);

	module.exports = SirTrevor.Block.extend({

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

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27);
	var i18n = __webpack_require__(28);
	var SirTrevor = __webpack_require__(23);
	var editorHTML = __webpack_require__(39);

	module.exports = SirTrevor.Block.extend({

	  type: "spacer",
	  title: function() { return i18n.t('blocks:spacer:title') },
	  editorHTML: function() {
	      return _.template(editorHTML, { imports: { i18n: i18n } });
	  },

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

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = "<div class=\"st-control\">\n    <div class=\"st-value-container\">\n    \t<span><%= i18n.t(\"blocks:spacer:size\") %></span>\n        <input class=\"st-value\" name=\"height\" type=\"range\" value=\"5\" units=\"vw\" step=\"0.1\" max=\"50\" min=\"0\" />\n    </div>\n    <span class=\"st-output\"></span>\n</div>";

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(22);
	var i18n = __webpack_require__(28);
	var hljs = __webpack_require__(41)
	var SirTrevor = __webpack_require__(23);
	var editorHTML = __webpack_require__(42);

	module.exports = SirTrevor.Blocks.Text.extend({

	    type: "widget",
	    title: function() { return i18n.t('blocks:widget:title') },
	    icon_name: "code",
	    editorHTML: editorHTML,

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
	        var text = this.$el.find('textarea').val();

	        if (!text || text.length <= 0)
	            return {};

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

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = hljs;

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = "<div class=\"st-widget-editor-container\">\n    <div class=\"editor\">\n        <span class=\"st-icon\"></span>\n        <textarea name=\"text\"></textarea>\n    </div>\n    <div style=\"display: none\" class=\"preview\">\n        <pre><code class=\"lang-html\"></code></pre>\n    </div>\n</div>";

/***/ },
/* 43 */
/***/ function(module, exports) {

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

	module.exports = {
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
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(27);
	var SirTrevor = __webpack_require__(23);

	module.exports = {
	    mixinName: 'Clonable',

	    initializeClonable: function() {
	        // For this mixin to work we need to also have the controllable mixin available.
	        // Lets do some security checks
	        if ((this.controllable === true && !this.$control_ui) || // controllable is enabled here but not yet initialized
	            !this.controllable) { // we were not even marked as controllable
	            this.controls = this.controls || {};
	            this.withMixin(SirTrevor.BlockMixins.Controllable);
	            this.controllable = false; // This will prevent from double initing the controllable ui
	        }

	        var stInstance = SirTrevor.getInstance(this.instanceID);

	        this.addUiControl('clone', function(e) {
	            var blockData = _.cloneDeep(this.getData());
	            var blocks = stInstance.block_manager.blocks;
	            stInstance.block_controls.currentContainer = this.$el; // This will determine where the new block is added
	            stInstance.block_manager.createBlock(blockData.type, blockData.data);
	            SirTrevor.EventBus.trigger('block:cloned', blocks[blocks.length - 1]);
	        }.bind(this))
	    },
	}

/***/ }
/******/ ]);