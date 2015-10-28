(function() {
    "use strict";

    if (!SirTrevor)
        return console.error("SirTrevor.Blocks.Alignable could not load because SirTrevor wasn't found");

    var Aligns = {
        LEFT: 'left',
        RIGHT: 'right',
        CENTER: 'center',
        JUSTIFY: 'justify'
    };

    var setTextAlign = function(align) {
        return function() {
            if (!this || !this.getTextBlock || !(this.getTextBlock instanceof Function))
                return;
            this.getTextBlock().find('> *').css('text-align', align)
        }
    };

    var makeAlignable = function(stBlockType, name) {
        var controls = {};
        Object.keys(Aligns).forEach(function (align) {
            controls['align-' + align] = setTextAlign(align);
        });
        return stBlockType.extend({
            type: name,
            controllable: true,
            controls: controls
        });
    };

    SirTrevor.Blocks.TextAlign = makeAlignable(SirTrevor.Blocks.Text, 'text_align');
    SirTrevor.Blocks.HeadingAlign = makeAlignable(SirTrevor.Blocks.Heading, 'heading_align');
})();