(function() {
    "use strict";

    if (!SirTrevor)
        return console.error("SirTrevor.Blocks.HeaderAlign could not load because SirTrevor wasn't found");

    SirTrevor.Blocks.HeaderAlign = SirTrevor.Blocks.Header.extend({
        type: 'header_align',
        alignable: true
    });
})();