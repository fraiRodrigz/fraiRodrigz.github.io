let contenedor = document.getElementById('tareas');
let check = contenedor.querySelectorAll('input')
let text = contenedor.querySelectorAll('label');

check.forEach((checked, index) =>{
    checked.addEventListener('change', e=>{
        if(e.target.checked === true){
            text.forEach((texto, itexto) =>{
                if(itexto === index){
                    texto.className = 'tachar';
                }
            })
            alert(`La tarea ${index + 1 }  fue realizada`);
        }else{
            text.forEach((texto, itexto) =>{
                if(itexto === index){
                    texto.className = 'tachado';
                }
            })
        }
        console.log(e)
    })
} )