// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let amigos = [];
let asignaciones = [];
let indiceSorteo = 0; 
let sorteoRealizado = false; 

// Cargar los amigos desde localStorage al cargar la página
window.onload = function () {
    const amigosGuardados = localStorage.getItem('amigos');
    if (amigosGuardados) {
        amigos = JSON.parse(amigosGuardados);
    }
}

// Función para agregar amigos a la lista
function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombreCompleto = input.value.trim().toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()); // Capitaliza correctamente

    if (nombreCompleto && !amigos.includes(nombreCompleto)) {
        amigos.push(nombreCompleto);
        localStorage.setItem('amigos', JSON.stringify(amigos));
        input.value = ''; 
    } else {
        alert("El nombre está vacío o ya existe en la lista.");
    }
}

// Función para eliminar amigos de la lista
function eliminarAmigo() {
    const input = document.getElementById('amigoEliminar');
    const nombreCompleto = input.value.trim().toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()); 

    if (nombreCompleto && amigos.includes(nombreCompleto)) {
        
        amigos = amigos.filter((amigo) => amigo !== nombreCompleto);

        
        localStorage.setItem('amigos', JSON.stringify(amigos));

        input.value = ''; 
    } else {
        alert("El nombre no se encuentra en la lista.");
    }
}

// Función para asignar amigos secretos de manera aleatoria
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("¡Debe haber al menos dos personas para realizar el sorteo!");
        return;
    }
    let amigosSecretos = [...amigos];
    mezclarArray(amigosSecretos);

    asignaciones = [];
    for (let i = 0; i < amigos.length; i++) {
        if (amigos[i] === amigosSecretos[i]) {
            mezclarArray(amigosSecretos);
            i = -1; // Reiniciar el ciclo
        } else {
            asignaciones.push({ persona: amigos[i], amigoSecreto: amigosSecretos[i] });
        }
    }

   
    sorteoRealizado = true;
    indiceSorteo = 0; 

    // Cambiar el mensaje y los botones
    document.getElementById("resultado").innerHTML = "¡Sorteo realizado!";
    document.getElementById("boton-sortear").style.display = "none"; 
    document.getElementById("boton-ver").style.display = "inline-block"; 
}

// Función para mezclar los elementos de un array de manera aleatoria
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Función para mostrar una asignación individual (una persona y su amigo secreto)
function mostrarResultadoIndividual() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = ''; 
    if (sorteoRealizado && indiceSorteo < asignaciones.length) {
        const asignacion = asignaciones[indiceSorteo];
        const li = document.createElement('li');
        li.textContent = `${asignacion.persona}, tu amigo secreto es: ${asignacion.amigoSecreto}`;
        resultado.appendChild(li);

        indiceSorteo++; 
    } else if (indiceSorteo >= asignaciones.length) {
        resultado.innerHTML = "¡Termino Sorteo! Hacer uno nuevo, haz clic en 'Sortear amigo'.";

        document.getElementById("boton-ver").style.display = "none"; 
        document.getElementById("boton-sortear").style.display = "inline-block"; 
    }
}

// Función para ver todas las asignaciones
function verSorteo() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = ''; 

    if (sorteoRealizado) {
        mostrarResultadoIndividual(); 
    } else {
        alert("¡Realiza un sorteo primero!");
    }
}












