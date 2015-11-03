(function() {
    "use strict";

    if (!SirTrevor)
        return console.error("SirTrevor.Blocks.HeaderAlign could not load because SirTrevor wasn't found");

    SirTrevor.Blocks.HeadingAlign = SirTrevor.Blocks.Heading.extend({
        type: 'heading_align',
        alignable: true
    });
})();