document.addEventListener('DOMContentLoaded', function () {
    let texto = document.getElementById('tarea');
    let boton = document.getElementById('btnImg');
    let mostrar = document.getElementById('imagenes');
    let img = mostrar.querySelectorAll('img');
    let cerrar = this.getElementById('cerrar');
    let añadir = document.getElementById('add');
    let recordatorio = document.getElementById('recordatorio');
    let errorMensaje = document.getElementById('error-message');
    let  infoRecolectada = JSON.parse(localStorage.getItem('tarea')) || [];

    //Mostrar catalogo de imagenes
    boton.addEventListener('click', (e) => {
        e.preventDefault(); 
        mostrar.style.display = 'flex';
    });

    //Mostrar la imagen seleccionada
    img.forEach(imagen => {
        imagen.addEventListener('click', (e) => {
            let seleccionado = e.target.getAttribute('src');
            img.forEach(imgElement => {
                if (imgElement.getAttribute('src') !== seleccionado) {
                    imgElement.style.display = 'none';
                    cerrar.style.display = 'inline-block'
                }
            });
        });
    });

    //Funcionalidad del botón cerrar imagen seleccionada
    cerrar.addEventListener('click', (e)=>{
        e.preventDefault(); 
        mostrar.style.display = 'none';
        cerrar.style.display = 'none'; 
        img.forEach(imagen => {
            imagen.style.display = 'flex'; 
        });
    })

    //Retornar imagene visible
    function imgVisible() {
        let visible = false;
        img.forEach(imagen => {
            if (imagen.style.display !== 'none') {
                visible = true;
            }
        });
        return visible;
    }

    //Obtener atributo src de la imagen seleccionada
    function getSelectedImageSrc() {
        let selectedImage = null;
        img.forEach(imagen => {
            if (imagen.style.display !== 'none') {
                selectedImage = imagen.getAttribute('src');
            }
        });
        return selectedImage;
    }

    //Obtener atributo alt de la imagen seleccionada
    function getSelectedImageAlt() {
        let selectedImage = null;
        img.forEach(imagen => {
            if (imagen.style.display !== 'none') {
                selectedImage = imagen.getAttribute('alt');
            }
        });
        return selectedImage;
    }

    //Verificar que los datos esten completos. En caso afirmativo guardar los datos y redirigir a la pag3, en caso negativo mostrar error.
    añadir.addEventListener('click', (e)=> {
        e.preventDefault();
        if (texto.value === '' || imgVisible() === false || mostrar.style.display === 'none') {
            errorMensaje.style.display = 'block';
        } else {
            errorMensaje.style.display = 'none';
            
            let info = texto.value;
            let srcImagen = getSelectedImageSrc();
            let altImagen = getSelectedImageAlt();
            let tiempo = recordatorio.value;
            let inicio = Date.now().toString();

            infoRecolectada.push(
                {
                    info, srcImagen, altImagen, tiempo, inicio
                },
            );

            console.log(infoRecolectada);
            localStorage.setItem('tarea', JSON.stringify(infoRecolectada));
            window.location.href = '../pag3/pag3.html';
        }
    });

});
