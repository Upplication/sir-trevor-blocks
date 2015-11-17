(function() {
    var Locales = {
        es: {
            blocks: {
                button: {
                    title: "Botón",
                    styles: {
                        backgroundColor: "Color de fondo",
                        borderWidth: "Ancho del borde",
                        borderColor: "Color del borde",
                        borderRadius: "Radio del borde",
                        width: "Ancho",
                        height: "Alto"
                    },
                    hint: {
                        text: '¡Escribe aqui el texto de tu Boton!',
                        href: 'Escribe aqui un email, un telefono o una web'
                    },
                    accept: 'Aceptar',
                    cancel: 'Cancelar'
                },
                image_edit: {
                    finish: 'Confirma el recorte de la imagen para poder guardar'
                },
                map: {
                    title: "Mapa",
                    hint: "Escribe una direccion aquí"
                },
                widget: {
                    title: "Widget",
                    hint: "Pega el html de tu widget externo aquí"
                },
                ck_editor: {
                    title: "Texto"
                }
            }
        }
    };

    jQuery.extend(true, SirTrevor.Locales, Locales);
})();