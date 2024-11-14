// Seleccionar elementos del DOM
const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');
let editIndex = null; // Variable para almacenar el índice del contacto en edición

// Función para cargar contactos desde localStorage
function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contactList.innerHTML = ''; // Limpiar la lista antes de mostrar
    contacts.forEach((contact, index) => {
        const contactItem = document.createElement('div');
        contactItem.classList.add('contact-item');
        contactItem.innerHTML = `
            <div class="informacion">
                <h1>${contact.name}</h1>
                <p>Télefono: ${contact.phone}</p>
                <p>Email: ${contact.email}</p>
                <p>Dirección: ${contact.address}</p>
            </div>
            <div class="interaccion">
                <button class="editar" data-index="${index}">Editar</button>
                <button class="eliminar" data-index="${index}">Eliminar</button>
            </div>
        `;
        contactList.appendChild(contactItem);
    });

    // Agregar eventos a los botones de eliminar
    const deleteButtons = document.querySelectorAll('.eliminar');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deleteContact(index);
        });
    });

    // Agregar eventos a los botones de editar
    const editButtons = document.querySelectorAll('.editar');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            editContact(index);
        });
    });
}

// Función para eliminar un contacto
function deleteContact(index) {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    loadContacts();
}

// Función para editar un contacto
function editContact(index) {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contact = contacts[index];
    document.getElementById('name').value = contact.name;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('email').value = contact.email;
    document.getElementById('address').value = contact.address;
    editIndex = index; 
}

// Evento para manejar el envío del formulario
contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener valores del formulario
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    if (editIndex !== null) {
        // Actualizar el contacto existente
        contacts[editIndex] = { name, phone, email, address };
        editIndex = null; 
    } else {
        // Crear un nuevo contacto
        const contact = { name, phone, email, address };
        contacts.push(contact);
    }

    // Guardar en localStorage
    localStorage.setItem('contacts', JSON.stringify(contacts));

    // Limpiar el formulario
    contactForm.reset();

    // Cargar y mostrar los contactos actualizados
    loadContacts();
});

// Cargar contactos al iniciar la página
loadContacts();