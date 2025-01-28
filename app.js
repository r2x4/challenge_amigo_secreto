// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let amigos = [];
let asignaciones = {};

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
    const nombreCompleto = input.value.trim();

    
    if (nombreCompleto && !amigos.includes(nombreCompleto)) {
        amigos.push(nombreCompleto);
        localStorage.setItem('amigos', JSON.stringify(amigos)); 
        input.value = '';
    } else {
        alert("El nombre está vacío o ya existe en la lista.");
    }
}

// Función para asignar amigos secretos de manera aleatoria
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("¡Debe haber al menos dos personas para realizar el sorteo!");
        return;
    }

    // Hacer una copia de la lista de amigos y mezclarla
    let amigosSecretos = [...amigos];
    mezclarArray(amigosSecretos);

    // Asegurarse de que nadie se asigne a sí mismo
    asignaciones = {}; 
    for (let i = 0; i < amigos.length; i++) {
        if (amigos[i] === amigosSecretos[i]) {
            
            mezclarArray(amigosSecretos);
            i = -1; 
        } else {
            asignaciones[amigos[i]] = amigosSecretos[i];
        }
    }

    mostrarResultadoIndividual();
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

    
    const persona = amigos[Math.floor(Math.random() * amigos.length)];
    const amigoSecreto = asignaciones[persona];

    const li = document.createElement('li');
    li.textContent = `${persona}, tu amigo secreto es: ${amigoSecreto}`;
    resultado.appendChild(li);
}



