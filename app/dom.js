const formulario = document.querySelector('.container'); 
const inputForm = document.querySelector('#input-items');
const btnForm = document.querySelector('.btn-list');
const listForm = document.querySelector('.list');
const totalTasks = document.querySelector('#box-total');
const completedTasks = document.querySelector('#box-completed');
const uncompletedTasks = document.querySelector('#box-incompleted');
const INPUT_REGEX = /^[\S ]+[\S]$/;
let error = document.querySelector('#error');
//Validacion
let inputFormValidation = false;
error = false;

//Funciones
const validateInput = () =>{
    if (!inputFormValidation) {
      error.hidden = false;
        btnForm.disabled = true;
      } else {
        error.hidden = true;
        btnForm.disabled = false;
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
    }
    li.id = task.id;
    li.innerHTML = `
    <button class="btn-delete">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
    </button>
    <p class="parrafo1">${task.task}</p>
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
  const divError = document.querySelector('#error-div');
  // if (inputFormValidation){
  //   divError.innerHTML = `
  //   <div id="error-div">
  //   </div>
  //     `;
  //   }
    if (!inputFormValidation) {
      // divError.innerHTML = `
      // <div id="error-div">
      // <h4 id="error">a task must be provided...</h4>
      // </div>
      // `;
      alert('Recuerda que no debes dejar espacios al final y debes escribir más de una letra')
      return;
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
  Checked: ${completadas}
  `;

  const incompletas = total - completadas;
  uncompletedTasks.innerHTML = `
  Incomplete: ${incompletas}
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
