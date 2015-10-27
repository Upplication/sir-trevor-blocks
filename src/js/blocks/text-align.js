(function() {
    "use strict";

    if (!SirTrevor)
        return console.error("SirTrevor.Blocks.TextAlign could not load because SirTrevor wasn't found");

    SirTrevor.Blocks.TextAlign = SirTrevor.Blocks.Text.extend({
        controllable: true,
        controls: {
            alignLeft: function() {
                
            }
        }
    });
})();