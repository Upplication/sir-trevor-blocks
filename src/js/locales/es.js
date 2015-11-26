(function() {
    var Locales = {
        es: {
            blocks: {
                button: {
                    title: "Botón",
                    controls: {
                        action: "Acción",
                        dimensions: "Dimensiones",
                        border: "Borde",
                        font: "Fuente",
                        width: "Ancho",
                        height: "Alto",
                        radius: "Radio",
                        size: "Tamaño",
                        type: "Tipo",
                        background: "Fondo",
                        color: "Color",
                        align: "Alineado",
                        center: "Centro",
                        left: "Izquierda",
                        right: "Derecha"
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
                spacer: {
                    title: "Separador"
                },
                widget: {
                    title: "Widget",
                    hint: "Pega el html de tu widget externo aquí",
                    edit: "Haz doble clic para editar"
                },
                ck_editor: {
                    title: "Texto"
                }
            }
        }
    };

    jQuery.extend(true, SirTrevor.Locales, Locales);
})();