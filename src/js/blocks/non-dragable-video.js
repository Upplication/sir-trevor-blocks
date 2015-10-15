(function() {
    "use strict";

    if (!SirTrevor)
        return console.error("SirTrevor.Blocks.VideoNoDrag could not load because SirTrevor wasn't found");

    SirTrevor.Blocks.VideoNoDrag = SirTrevor.Blocks.Video.extend({
        droppable: false,
	});
})();