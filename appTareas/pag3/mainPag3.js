document.addEventListener('DOMContentLoaded', function () {
    let tarjetasContainer = document.getElementById('tarjetasContainer');
    let borrarTodo = document.getElementById('borrar');
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modalText');
    const modalConfirm = document.getElementById('modal-confirm');
    const modalCancel = document.getElementById('modal-cancel');

    //llamar a la función.
    obtenerLocalStorage();

    //Función para verificar si hay información en local storage.
    function obtenerLocalStorage(){

        // verificar que los datos no sean null o undefined.
        if( localStorage.getItem('tarea')){
            // Recuperar los valores del Local Storage
            let data = JSON.parse(localStorage.getItem('tarea'));

            // Crear y agregar tarjetas por cada conjunto de datos
            data.forEach(item => {
                let tarjeta = document.createElement('section');
                tarjeta.className = 'tarjeta';

                

                let info = document.createElement('span');
                let imgTarea = document.createElement('img');
                imgTarea.src = item.srcImagen;
                imgTarea.alt = item.altImagen;
                let txtTarea = document.createElement('p');
                txtTarea.textContent = item.info;
                let botonBorrar = document.createElement('button');
                botonBorrar.textContent = 'x';
                info.appendChild(imgTarea);
                info.appendChild(txtTarea);
                info.appendChild(botonBorrar);

                let alerta = document.createElement('span');
                let text = document.createElement('p');
                let semaforo = document.createElement('div');
                let button = document.createElement('button');
                button.textContent = 'Reanudar';
                alerta.appendChild(semaforo);
                alerta.appendChild(text);
                alerta.appendChild(button);

                tarjeta.appendChild(info);
                tarjeta.appendChild(alerta);
                tarjetasContainer.appendChild(tarjeta);

                function calcularTemporizador(item) {
                    const fecha = new Date(parseInt(item.inicio));
                    const tiempo = Date.now();
                    const tiempoTranscurrido = tiempo - fecha;
                    const pasaronminutos = parseInt(tiempoTranscurrido / 1000 / 60);
                    const pasaronHoras = parseInt(tiempoTranscurrido / 1000 / 60 / 60);
                    const pasarondias = parseInt(tiempoTranscurrido / 1000 / 60 / 60 / 24);
                    const cuantosDias = parseInt(item.tiempo);
                    const dia = 1000 * 60 * 60 * 24;
                    const avisoEn = cuantosDias * dia;
                    const tiempoFalta = avisoEn - tiempoTranscurrido;
                    const faltanDias = parseInt(tiempoFalta / 1000 / 60 / 60 / 24);
                    const faltanHoras = parseInt(tiempoFalta / 1000 / 60 / 60);
                    const faltanSeg = parseInt(tiempoFalta / 1000);
                
                    /*console.log(`en cuanto tiempo quiere que le avise: ${cuantosDias} días`);
                    console.log(`el dato exacto de tiempo transcurrido en milisegundo es: ${tiempoTranscurrido}`);
                    console.log(`Pasaron ${pasaronminutos} minutos`);
                    console.log(`Pasaron ${pasaronHoras} horas`);
                    console.log(`Pasaron ${pasarondias} dias`);
                    console.log(`Me avisa en: ${avisoEn} milisegundos`);
                
                    console.log(`Faltan: ${faltanDias} dias`);
                    console.log(`Faltan: ${faltanHoras} horas`);
                    console.log(`Faltan: ${faltanSeg} seg`);*/
                
                    //Notificación de dias pendientes
                    let amarillo = cuantosDias / 2;
                    let rojo = cuantosDias / 3;
                
                    if (faltanSeg < 0) {
                        let vencido = new Date(avisoEn);
                        let dia = vencido.getDate();
                        let mes = vencido.getMonth() + 1;
                        let anio = vencido.getFullYear() % 100;
                        console.log(`Me avisa el: ${vencido}`);
                        text.textContent = `Tarea Vencida el ${dia}/${mes}/${anio}`;
                        semaforo.style.backgroundColor = 'red';  
                    } else {
                        if (faltanHoras <= 24) {
                            text.textContent = `Hacer tarea en ${faltanHoras} horas`;
                        } else {
                            if(faltanDias === 1){
                                text.textContent = `Hacer tarea en ${faltanDias} día`;
                            }else{
                                text.textContent = `Hacer tarea en ${faltanDias} días`;
                            }
                        }
                
                        if (faltanDias <= amarillo) {
                            semaforo.style.backgroundColor = 'yellow';
                        }
                
                        if (faltanDias <= rojo) {
                            semaforo.style.backgroundColor = 'red';
                        }
                    }
                }
                
                // Llamada a la función
                calcularTemporizador(item);

                //reiniciar temporizador de tarea
                button.addEventListener('click', (e)=>{
                    e.preventDefault();
                    item.inicio = Date.now();
                    const index = data.findIndex(dataItem => dataItem.info === item.info);
                    data[index] = item;
                    localStorage.setItem('tarea', JSON.stringify(data));
                    text.textContent = `Hacer tarea en ${item.tiempo} días`;

                })

                // Función para darle función al botón x
                botonBorrar.addEventListener('click', () =>{
                    let mensaje1 = `¿Deseas borrar la tarea "${item.info}"?`;
                    mostrarModalConfirmacion(item, mensaje1);
                    return botonBorrar;
                })


                // Función para mostrar el modal de confirmación
                function mostrarModalConfirmacion(item, mensaje1) {
                    modal.style.display = 'flex';
                    modalText.textContent = mensaje1;
                    modalConfirm.addEventListener('click', () => {
                        cerrarModal();
                        borrarTarjeta(item);
                    });
                    modalCancel.addEventListener('click', () => cerrarModal());
                }

                // Función para borrar una tarjeta
                function borrarTarjeta(item) {
                    const index = data.findIndex(dataItem => dataItem.info === item.info);
                    if (index !== -1) {
                        data.splice(index, 1); // Eliminar el elemento del array
                        localStorage.setItem('tarea', JSON.stringify(data)); // Actualizar el Local Storage
                        actualizarTarjetas(); // Actualizar el DOM
                    }
                }

                // Función para actualizar las tarjetas en el DOM
                function actualizarTarjetas() {
                    tarjetasContainer.innerHTML = ''; // Limpiar el contenedor
                    obtenerLocalStorage(); // Generar las tarjetas nuevamente
                }

                

            });
        }
    }

    function abrirModal(mensaje) {
        modal.style.display = 'flex';
        modalText.textContent = mensaje;
    }

    function cerrarModal() {
        modal.style.display = 'none';
    }

    function borrarTodasLasTareas() {
        localStorage.clear();
        tarjetasContainer.innerHTML = '';
    }

    modalConfirm.addEventListener('click', () => {
        cerrarModal();
        borrarTodasLasTareas();
    });

    modalCancel.addEventListener('click', cerrarModal);

    borrar.addEventListener('click', () => {
        const mensaje = "¿Quieres borrar todas las tareas?"; 
        abrirModal(mensaje);
    });

    console.log(tarjetasContainer);

});