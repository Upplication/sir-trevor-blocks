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
                        text: '¡Escribe aqui el texto de tu Boton!',
                        href: 'Write an email, phone number or web URL here'
                    },
                    accept: 'Accept',
                    cancel: 'Cancel'
                },
                image_edit: {
                    finish: 'Confirm the crop for being able to save'
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
                }
            }
        }
    };

    jQuery.extend(true, SirTrevor.Locales, Locales);
})();