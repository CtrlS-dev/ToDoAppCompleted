const formulario = document.querySelector('.container'); 
const inputForm = document.querySelector('#input-items');
const btnForm = document.querySelector('.btn-list');
const listForm = document.querySelector('.list');
const totalTasks = document.querySelector('#box-total');
const completedTasks = document.querySelector('#box-completed');
const uncompletedTasks = document.querySelector('#box-incompleted');
const INPUT_REGEX = /^(?!\s*$)(?!^.$).+$/;

//Validaciones
let inputFormValidation = false;
error = false;

// Agregar ITEMS
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

let tasks = [];

// DATOS DE REGEX
inputForm.addEventListener('input', e =>{
    inputFormValidation = INPUT_REGEX.test(inputForm.value);
});

form.addEventListener('submit', e => {
  // ELIMINAR EVENTO POR DEFECTO  
  e.preventDefault();

// COMPROBAR VALOR INGRESADO EN INPUT 
const divError = document.querySelector('#error-div');
  if (inputForm.value === '') {
    inputFormValidation = false;
    btnForm.disabled = true;
  }
    if (!inputFormValidation) {
      divError.innerHTML = `
      <div id="error-div">
      <h4 id="error">[ERROR]: debes escribir al menos más de una letra...</h4>
      </div>
      `;
      return;
  }
  if (inputFormValidation) {
    divError.innerHTML = `
    <div id="error-div">
    </div>
    `;
}
// CREAR ITEM
  const newTask = {
    id: crypto.randomUUID(),
    task: inputForm.value,
    checked: false,
  }
  // AGREGAR ITEM AL ARRAY
  tasks = tasks.concat(newTask);
  // GUARDAR EN EL NAVEGADOR
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

// COUNTADORES
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
