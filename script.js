let todoArray = [];
let todoId = 0;
let currentFilter = 'all';

const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const todoFilters = document.querySelectorAll("input[name='filter']");
const btnClear = document.getElementById('clear-completed');
const themeSwitch = document.getElementById('theme-toggle');
const themeLogos = document.querySelectorAll('.btn--theme img');


btnClear.addEventListener('click', () => {
   const toRemove = todoArray.filter((obj) => obj.active === false);

   if (toRemove.length > 0 &&  confirm(`You are about to remove ${toRemove.length} completed task. Are you sure?`)) {
      toRemove.forEach((elem) => {
         removeElem(elem.DOMelem);
      });
   }
});

themeSwitch.addEventListener('click', themeSwitcher);

todoInput.addEventListener("keyup", (e) => {
   if (e.key === "Enter") {
      if (e.target.value !== "") {
         addTodoElem(e.target.value);
         todoInput.value = "";
         refreshFilters();
      }
   }
});

todoFilters.forEach((filter) => {
   filter.addEventListener('change', filterCallback);
});



function themeSwitcher(e) {
   themeLogos.forEach(logo => logo.classList.toggle("todo__elem--hide"));
   if (!document.body.dataset.theme) {
      document.body.dataset.theme = "darkTheme";
   } else {
      document.body.dataset.theme = "";
   }

}

function filterCallback(e) {
   currentFilter = e.target.value;
   refreshFilters();
   
}

 function refreshFilters() {
   if (currentFilter === 'completed') {
      completedCB();
  } else if (currentFilter === 'all') {
   allCB();
  } else { 
   activeCB();
  }
}

function completedCB() {
   todoArray.forEach(function (arrayObj)  {
      if (!arrayObj.active && arrayObj.DOMelem.classList.contains("todo__elem--hide")) {
         arrayObj.DOMelem.classList.remove("todo__elem--hide");
      }
      else if (arrayObj.active && !arrayObj.DOMelem.classList.contains("todo__elem--hide")) {
         arrayObj.DOMelem.classList.add("todo__elem--hide");      
   }
});
}


function allCB() {
   todoArray.forEach(function (arrayObj)  {
      if (arrayObj.DOMelem.classList.contains("todo__elem--hide")) {
         arrayObj.DOMelem.classList.remove("todo__elem--hide");
      }
   });

}


function activeCB() {
   todoArray.forEach(function (arrayObj)  {
      if (arrayObj.active && arrayObj.DOMelem.classList.contains("todo__elem--hide")) {
         arrayObj.DOMelem.classList.remove("todo__elem--hide");
      }
      else if (arrayObj.active === false && !arrayObj.DOMelem.classList.contains("todo__elem--hide")) {
         arrayObj.DOMelem.classList.add("todo__elem--hide");
   
      }
   });
}


function updateActiveCount() {
   let count = todoArray.reduce((count, todoObj) => {
      if (todoObj.active) count++;
      return count;
   }, 0);
   itemsLeft.innerText = count;
}

function updateCurrentId() {
   if (!todoArray.length) {
      todoId = 0;
   } else {
      todoId = todoArray[todoArray.length - 1].id + 1;
   }
}

function changeActiveStatus(elem) {
   elem.classList.toggle("todo__elem--checked");
   let isActive = true;


   if (elem.classList.contains("todo__elem--checked")) {
      isActive = false;
   }

   todoArray.forEach((arrayObj) => {
      if (arrayObj.id === +elem.id) arrayObj.active = isActive;
   });
}

function removeElem(element) {
   removeElemfromDom(element);
   updateCurrentId();
   updateActiveCount();
   refreshFilters();
}

function removeElemfromDom(elem) {
   elem.remove();
}

function addTodoElem(todoText, isNew = true) {
   const todoEl = document.createElement("li");
   todoEl.classList.add("todo__elem");
   todoEl.id = "" + todoId;
   todoEl.innerHTML = `
   <button class=" btn todo__check">
      <img src="./img/icon-check.svg" alt="" class="" />
   </button>
   <p>${todoText}</p>
   <button class="btn todo__delete"><img src="./img/icon-cross.svg" alt=""/></button>
   `;


   if (isNew) {
      todoArray.push({
         active: true,
         content: todoText,
         DOMelem: todoEl,
         id: todoId++,
      });
   } else {
      todoArray.forEach((arrayObj) => {
         if (arrayObj.id === todoId  ) {
            arrayObj.DOMelem = todoEl;
            if (!arrayObj.active) {
               todoEl.classList.add("todo__elem--checked");
            }
         }
      });
   }

   todoList.appendChild(todoEl);

   
   const todo_delete = todoEl.querySelector(".todo__delete");

   todo_delete.addEventListener("click", function()  {
      removeElem(todoEl);
   });

   

   const todo_check = todoEl.querySelector(".todo__check");

   todo_check.addEventListener("click", function ()  {
      changeActiveStatus(todoEl);
       refreshFilters();
   });

   updateActiveCount();
}


function init() {
   const starterList = [];
}

init();
