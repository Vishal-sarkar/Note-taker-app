
const note = document.getElementById("notes");
const form = document.querySelector(".form-bdy")
const list = document.querySelector(".note-list");
const clearBtn = document.querySelector(".clear-btn");
const contnr = document.querySelector(".container");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
  


form.addEventListener("submit", addItem);



clearBtn.addEventListener("click", clearItems);

modal.addEventListener("click", outSideClick);

function count(){
    return list.getElementsByTagName("article").length;
}

function addItem(e){
    e.preventDefault();
    const value = note.value;
    const id = count() + 1;
    if(!value){
        alert("empty value");
    }else{
        createNote(id, value);
        contnr.classList.add("show-container");
    }
    setBackToDefault();
}

function clearItems(){
    const items = document.querySelectorAll(".note-con");
    if(count() > 0){
        items.forEach(function(item){
            list.removeChild(item);
        })
    }
    contnr.classList.remove("show-container");
}

function createNote(id, value){
    const element = document.createElement("article");

    element.classList.add("note-con");

    // const attr = document.createAttribute("data-id")

    element.innerHTML=
    `<h2 class = "note-hd">Note${id}</h2>
        <p class="note-stor">
            ${value}
        </p>
     <button type="button" class="view-btn">View Detail</button>`

    const viewBtn = element.querySelector(".view-btn");
    viewBtn.addEventListener("click", viewNote);
    list.appendChild(element);
    
}

function viewNote(e){
    modal.style.display = "block";
    const note_detail = e.currentTarget.previousElementSibling.innerHTML;
    const note_id = e.currentTarget.previousElementSibling.previousElementSibling.innerHTML;
    const el = document.createElement("article");
    el.classList.add("note-mod");
    el.innerHTML=
    `<h2 class="mod-head">${note_id}</h2>
    <p class = "mod_not">${note_detail}</p>
    <button class="close-btn">close</button>`

const closeBtn = el.querySelector(".close-btn");
    closeBtn.addEventListener("click", closeModal);
    modalContent.appendChild(el);
    
     
}

function setBackToDefault(){
    note.value = "";
}

function closeModal(){
    modal.style.display = "none";
    // modalContent.removeChild();
    removeModalElement();
}

function outSideClick(e){
    if(e.target == modal){
        modal.style.display = "none";
        removeModalElement();
    }
    
}

function removeModalElement(){
    const noteMod = document.querySelector(".note-mod");
    modalContent.removeChild(noteMod);
}