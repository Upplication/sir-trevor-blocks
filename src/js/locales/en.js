(function() {
    var Locales = {
        en: {
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
    };

    jQuery.extend(true, SirTrevor.Locales, Locales);
})();
