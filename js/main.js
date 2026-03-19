
//  FUNCIÓN PARA CARGAR COMPONENTES

// Función asíncrona que carga un HTML dentro de un div
async function loadComponent(id, url) {
    try {
        // Hace una petición al archivo HTML
        const res = await fetch(url);

        // Verifica si la respuesta fue exitosa
        if (!res.ok) throw new Error(res.statusText);

        // Inserta el contenido HTML dentro del elemento con ese ID
        document.getElementById(id).innerHTML = await res.text();

    } catch (err) {
        // Muestra error en consola si falla
        console.error(`Error cargando ${id}:`, err);
    }
}



//  DETECTAR UBICACIÓN ACTUAL


// Verifica si la URL contiene '/views/'
// true → estás en una subpágina
// false → estás en index (raíz)
const isInViews = window.location.pathname.includes('/views/');



//  OBTENER RUTA DEL COMPONENTE


// Construye la ruta correcta dependiendo de dónde estés
function getComponentUrl(name) {

    // Si estás dentro de /views/
    // usa ../ para subir un nivel
    // Si estás en index usa ruta normal
    return isInViews
        ? `../views/${name}.html`
        : `views/${name}.html`;
}



//  ACTIVAR LINK DEL NAVBAR


// Marca el enlace activo según la página actual
function activateNavLink() {

    // Obtiene la ruta actual (ej: /views/services.html)
    const current = window.location.pathname;

    // Selecciona todos los links del navbar
    document.querySelectorAll('.nav-link').forEach(link => {

        // Obtiene el valor de data-page (ej: "services")
        const page = link.dataset.page;

        // Condición para activar el link:
        // 1. Si es inicio y estás en index
        // 2. Si la URL contiene el nombre de la página
        if (
            (page === 'inicio' && !isInViews) ||
            current.includes(`${page}.html`)
        ) {
            // Agrega clase active (esto aplica el estilo)
            link.classList.add('active');
        } else {
            // Quita la clase si no corresponde
            link.classList.remove('active');
        }
    });
}



//  INICIALIZACIÓN PRINCIPAL

// Se ejecuta cuando el HTML termina de cargar
document.addEventListener('DOMContentLoaded', async () => {

    // Componentes base (siempre se cargan)
    let components = ['navbar', 'footer'];

    // Si estás en index (no en /views/)
    if (!isInViews) {

        // Se cargan todas las secciones del home
        components = [
            'navbar',
            'hero',
            'features',
            'content',
            'portfolio',
            'contacto',
            'footer'
        ];
    }

    
    //  CARGA DE COMPONENTES EN PARALELO
    // Por cada componente:
    // 1. Construye la URL
    // 2. Lo carga dinámicamente
    // Promise.all espera que todos terminen
    await Promise.all(
        components.map(c => loadComponent(c, getComponentUrl(c)))
    );


    // ACTIVAR LINK DEL NAVBAR
    activateNavLink();

    // Mensaje en consola
    console.log('Componentes cargados');
});