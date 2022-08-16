
function createInput(event) {
  // remove event listener
  const targetElement = event.target || event.srcElement;
  targetElement.removeEventListener("input",createInput);

  // establish correct id number
  const parentList = document.getElementById("list"); 
  const numChildren = parentList.childElementCount;
  const newName = "option" + (numChildren+1);

  // create new input element to append
  const newInput = document.createElement("input");
  newInput.setAttribute("type", "text");
  newInput.setAttribute("placeholder", "Enter Option");
  newInput.setAttribute("class", "option-input noSelect");
  newInput.setAttribute("name", newName);
  newInput.setAttribute("id", newName);


  newInput.addEventListener("input", createInput)

  parentList.appendChild(newInput);
}

const element = document.getElementById("option3");
if (element) {
element.addEventListener("input", createInput);}

// dragging script
const draggables = document.querySelectorAll('.draggable')
const container = document.getElementById("options-container")

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', (e) => {
    e.preventDefault();
    draggable.classList.remove('dragging')

  })
  
})


  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })

function getDragAfterElement(y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}
