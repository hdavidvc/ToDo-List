const form = document.getElementById('formulario');
const lista = document.getElementById('lista-tareas');
const template = document.getElementById('template').content;
const fragment = document.createDocumentFragment();

let tareas = {};

form.addEventListener('submit', (e) => {
    setData();
    e.preventDefault();
});

lista.addEventListener('click', (e) => {
    accions(e);
});

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('task')) {
        tareas = JSON.parse(localStorage.getItem('task'));
        pintarTarea();
    }
});

const setData = () => {
    const item = document.getElementsByClassName('form-control')[0];
    const task = {
        id: Date.now(),
        texto: item.value,
        estado: false
    };

    tareas[task.id] = task;
    pintarTarea();
    item.value = '';

};

const pintarTarea = () => {
    lista.innerHTML = '';
    if (Object.values(tareas).length === 0) {
        lista.innerHTML = `<div class="alert alert-dark">
                            Sin tareas pendientes 😍
                           </div>`;

    } else {

        Object.values(tareas).forEach(item => {

            const clone = template.cloneNode(true);
            clone.querySelector('p').textContent = item.texto;
            clone.querySelector('.text-success').dataset.id = item.id;
            clone.querySelector('.text-danger').dataset.id = item.id;

            if (item.estado) {
                console.log('entre');
                clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt');
                clone.querySelector('.alert').classList.replace('alert-warning', 'alert-info');
                clone.querySelector('p').style.textDecoration = 'line-through';
            }

            fragment.appendChild(clone);
        });
    }

    lista.appendChild(fragment);
    localStorage.setItem('task', JSON.stringify(tareas));
};

const accions = (e) => {
    if (e.target.classList.contains('text-danger')) {
        delete tareas[e.target.dataset.id];
    }
    if (e.target.classList.contains('fa-check-circle')) {
        tareas[e.target.dataset.id].estado = true;
    }
    if (e.target.classList.contains('fa-undo-alt')) {
        tareas[e.target.dataset.id].estado = false;
    }

    pintarTarea();
};