const formulario = document.querySelector('.container'); 
const inputForm = document.querySelector('#input-items');
const btnForm = document.querySelector('.btn-list');
const listForm = document.querySelector('.list');
const totalTasks = document.querySelector('#box-total');
const completedTasks = document.querySelector('#box-completed');
const uncompletedTasks = document.querySelector('#box-incompleted');
const INPUT_REGEX = /^[\S ]+[\S]$/;
const error = document.querySelector('#error')
//Validacion
let inputFormValidation = false;

//Funciones
const validateInput = () =>{
    if (inputFormValidation) {
        btnForm.disabled = false;
      } else {
        btnForm.disabled = true;
      }
}

const renderTasks = () =>{
    listForm.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.classList.add('item');
    li.classList.add('text-box');
    if(task.checked){
      li.classList.add('text-box-checked');
      li.classList.add('item-checked');
      // li.classList.add('btn-checked');
      // li.classList.remove('btn-check');
    }
    li.id = task.id;
    li.innerHTML = `
    <button class="btn-delete">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
    </button>
    <p>${task.task}</p>
    <button class="btn-check">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
    </button>
    `;
    // listForm.append(li);
    listForm.insertAdjacentElement("afterbegin",li);
  });
  renderCounters();
}

//Data
let tasks = [];

inputForm.addEventListener('input', e =>{
    inputFormValidation = INPUT_REGEX.test(inputForm.value);
    validateInput(inputForm);
});

form.addEventListener('submit', e => {
    e.preventDefault();
  // Verificar si las validaciones son verdaderas
  if (!inputFormValidation) {
    console.log(error);
  }
  // Crear contacto
  const newTask = {
    id: crypto.randomUUID(),
    task: inputForm.value,
    checked: false,
  }
  // Agregar el contacto al array
  tasks = tasks.concat(newTask);
  // Guardar en el navegador
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks ();
  form.reset();
  renderCounters();
});

listForm.addEventListener('click', e => {
  const deleteBtn = e.target.closest('.btn-delete');
  const checkBtn = e.target.closest('.btn-check');
  //Eliminar
  if (deleteBtn) {
    const id = deleteBtn.parentElement.id;
    tasks = tasks.filter(task => {
      if (task.id !== id) {
        return task;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    renderCounters();
  }
  //Checked
  if(checkBtn) {
    const li = checkBtn.parentElement;
    textTask = li.children[2];
    li.classList.add('text-box-checked');
    tasks = tasks.map(task =>{
      if (task.id === li.id) {
        return{... task, checked: !task.checked};
      } else {
        return task;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  } 
});

// Contadores

const renderCounters = () => {
  const total = tasks.length;
  totalTasks.innerHTML = `
  Total: ${total}
  `;

  const completadas = document.querySelectorAll('.text-box-checked').length;
  completedTasks.innerHTML = `
  Completas: ${completadas}
  `;

  const incompletas = total - completadas;
  uncompletedTasks.innerHTML = `
  Incompletas: ${incompletas}
  `;

}

(() => {
    const tasksLocal = localStorage.getItem('tasks');
    if (tasksLocal) {
      const tasksArray = JSON.parse(tasksLocal);
      tasks = tasksArray;
      renderTasks();
    }
  })();