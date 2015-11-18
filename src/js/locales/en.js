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
                widget: {
                    title: "Widget",
                    hint: "Paste your external Widget html here"
                },
                ck_editor: {
                    title: "Text"
                }
            }
        }
    };

    jQuery.extend(true, SirTrevor.Locales, Locales);
})();