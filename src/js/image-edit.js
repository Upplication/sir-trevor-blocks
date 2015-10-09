(function() {
    "use strict";

    if (!SirTrevor)
        return console.error("SirTrevor.Blocks.ImageEdit could not load because SirTrevor wasn't found");

    SirTrevor.Blocks.ImageEdit = SirTrevor.Blocks.Image.extend({

        type: "image_edit",
        cropTimeout: 1000,

        loadData: function(data){
            // Create our image tag
            this.$editor.html($('<img>', { src: data.file.url })).show();
        },

        onDrop: function(transferData) {
            var file = transferData.files[0],
                urlAPI = (typeof URL !== "undefined") ? URL : (typeof webkitURL !== "undefined") ? webkitURL : null;

            if (/image/.test(file.type)) {
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
                        else
                            SirTrevor.EventBus.trigger('image_edit:crop:start', [e]);

                        timerCache = setTimeout(function () {
                            timerCache = null;
                            SirTrevor.EventBus.trigger('image_edit:crop:finish', [e]);
                        }.bind(this), this.cropTimeout);
                    }.bind(this)
                });
            }
        },

        isEmpty: function() {
            return this.$editor.find('img').length <= 0;
        },

        _serializeData: function() {
            var url = null;

            if (this.$cropper)
                url = this.$cropper('getCroppedCanvas').toDataURL()
            else
                url = this.$editor.find('img').attr('src');

            if (url && url.length > 0)
                return  { file: { url: url } };
            else
                return null;
        },
    });
})();