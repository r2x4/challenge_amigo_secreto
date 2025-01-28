// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let amigos = [];

// Cargar los amigos desde localStorage al cargar la página
window.onload = function() {
    const amigosGuardados = localStorage.getItem('amigos');
    if (amigosGuardados) {
        amigos = JSON.parse(amigosGuardados);
    }
}

// Función para agregar amigos a la lista
function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombreCompleto = input.value.trim();

    // Verificar si el campo está vacío o si el nombre ya está en la lista
    if (nombreCompleto && !amigos.includes(nombreCompleto)) {
        amigos.push(nombreCompleto);
        localStorage.setItem('amigos', JSON.stringify(amigos)); // Guardar en localStorage

        // Limpiar el campo de entrada
        input.value = '';
    } else {
        alert("El nombre está vacío o ya existe en la lista.");
    }
}

// Función para asignar amigos secretos
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("¡Debe haber al menos dos personas para realizar el sorteo!");
        return;
    }

    // Hacer una copia de la lista de amigos y mezclarla
    let amigosSecretos = [...amigos];
    mezclarArray(amigosSecretos);

    // Asegurarse de que nadie se asigne a sí mismo
    let asignaciones = {};
    let intentos = 0;

    while (intentos < 100) {
        asignaciones = {}; // Reiniciar las asignaciones
        for (let i = 0; i < amigos.length; i++) {
            if (amigos[i] !== amigosSecretos[i]) {
                asignaciones[amigos[i]] = amigosSecretos[i];
            } else {
                // Si alguien se asigna a sí mismo, mezclar nuevamente
                break;
            }
        }
        // Si no hay nadie asignado a sí mismo, salimos del bucle
        if (Object.keys(asignaciones).length === amigos.length) {
            break;
        }
        intentos++;
    }

    // Mostrar el resultado
    mostrarResultadoIndividual();
}

// Función para mezclar los elementos de un array de manera aleatoria
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Intercambio de elementos
    }
}

// Función para mostrar un resultado individual
function mostrarResultadoIndividual() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = ''; // Limpiar cualquier resultado previo

    // Tomamos el primer amigo de la lista (por ejemplo)
    const persona = amigos[0];
    const amigoSecreto = asignaciones[persona];

    const li = document.createElement('li');
    li.textContent = `${persona}, tu amigo secreto es: ${amigoSecreto}`;
    resultado.appendChild(li);
}

// Función para mostrar el resultado para un amigo específico
function mostrarAmigoSecreto() {
    const nombreBuscar = document.getElementById('nombreBuscar').value.trim();
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = ''; // Limpiar cualquier resultado previo

    if (nombreBuscar && asignaciones[nombreBuscar]) {
        const amigoSecreto = asignaciones[nombreBuscar];
        const li = document.createElement('li');
        li.textContent = `${nombreBuscar}, tu amigo secreto es: ${amigoSecreto}`;
        resultado.appendChild(li);
    } else {
        alert("Nombre no encontrado o sorteo aún no realizado.");
    }
}


