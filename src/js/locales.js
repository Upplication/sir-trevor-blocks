(function() {
    var Locales = {
        en: {
            blocks: {
                button: {
                    title: "Button",
                    styles: {
                        backgroundColor: "Background Color",
                        borderWidth: "Border Width",
                        borderColor: "Border Color",
                        borderRadius: "Border Radius",
                        width: "Width",
                        height: "Height",
                        italic: "Italic",
                        bold: "Bold"
                    },
                    caption: "Caption",
                    href: "Link",
                    onclick: "On Click"
                },
                map: {
                    title: "Map",
                    hint: "Write an address here!"
                },
                widget: {
                    title: "Widget",
                    hint: "Paste your external Widget html here"
                }
            }
        }
    };

    jQuery.extend(SirTrevor.Locales, Locales);
})();