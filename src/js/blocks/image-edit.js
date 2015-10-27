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
                        this.setError(err.cause);
                    else
                        this.setError(err);
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
            var data = this._getData();
            if (!this._isImageUploaded())
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
                var ev = 'block:image:remove';
                if (this.mediator._events[ev] && this.mediator._events[ev].length > 0) {
                    this.mediator.trigger('block:image:remove', data.file.url);
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
            /* Setup the upload button */
            this.$inputs.find('button').bind('click', function(ev){ ev.preventDefault(); });
            this.$inputs.find('input').on('change', (function(ev) {
                this.onDrop(ev.currentTarget);
            }).bind(this));
            this.$control_ui.hide();
        },

        onDrop: function(transferData) {
            var file = transferData.files[0],
                urlAPI = (typeof URL !== "undefined") ? URL : (typeof webkitURL !== "undefined") ? webkitURL : null;

            if (/image/.test(file.type)) {
                this.filename = file.name;
                this.$control_ui.show();
                this.$inputs.hide();
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
            return this.$editor.find('img').length <= 0;
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
    });
})();