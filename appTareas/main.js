document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    let msj = document.getElementById('msj');
    let carita = document.getElementById('carita');

    // Llamada a la función para verificar y mostrar las tareas
    obtenerLocalStorage();

    // Función para verificar si hay información en Local Storage.
    function obtenerLocalStorage() {
        if (localStorage.getItem('tarea')) {
            // Si hay datos en el Local Storage
            msj.style.display = 'none';
            carita.style.display = 'none';
            container.style.display = 'block';

            // Recuperar los valores del Local Storage
            let data = JSON.parse(localStorage.getItem('tarea'));

            container.innerHTML = '';

            const tareasPendientes = data.length;

            const imgTareas = document.createElement('img');
            imgTareas.src = 'imagenes/tarea.png';
            imgTareas.alt = 'tarea';
            container.appendChild(imgTareas);
            
            const mensajeTareasPendientes = document.createElement('p');
            mensajeTareasPendientes.textContent = `Tienes ${tareasPendientes} tareas pendientes`;
            container.appendChild(mensajeTareasPendientes);

            // Crear y agregar el botón para ir a tareas pendientes
            const botonIrATareas = document.createElement('button');
            botonIrATareas.textContent = 'Ver listado';
            botonIrATareas.addEventListener('click', () => {
                window.location.href = 'pag3/pag3.html';
            });
            container.appendChild(botonIrATareas);

        } else {
            // Si no hay datos en el Local Storage
            msj.style.display = 'block';
            carita.style.display = 'block';
            container.style.display = 'none';
        }

        console.log(container)
    }
});