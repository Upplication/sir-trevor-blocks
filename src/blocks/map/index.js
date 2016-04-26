var _ = require('lodash');
var $ = require('jquery');
var i18n = require('i18n');
var SirTrevor = require('sir-trevor-js');

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