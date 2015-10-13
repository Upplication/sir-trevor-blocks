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
                        height: "Alto",
                        italic: "Cursiva",
                        bold: "Negrita"
                    },
                    caption: "Texto",
                    href: "Enlace",
                    onclick: "On Click"
                },
                map: {
                    title: "Mapa",
                    hint: "Escribe una direccion aquí"
                },
                widget: {
                    title: "Widget",
                    hint: "Pega el html de tu widget externo aquí"
                }
            }
        }
    };

    jQuery.extend(true, SirTrevor.Locales, Locales);
})();