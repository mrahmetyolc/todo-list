const ToDoForm = document.querySelector("#todo-form")
const ToDoList = document.querySelector(".todolar");
const ToDoEkleInput = document.querySelector("#todo");
const FiltrelemeInput = document.querySelector("#filter");
const TumunuTemizle = document.querySelector("#clear-todos");


ToDoForm.addEventListener("submit", ToDoEkleFonksiyon);
document.addEventListener("DOMContentLoaded", ToDoYukleFonksiyonu);
ToDoList.addEventListener("click", ToDoSilFonksiyonu);
FiltrelemeInput.addEventListener("keyup", FiltrelemeFonksiyonu);
TumunuTemizle.addEventListener("click", TumunuTemizleFonksiyonu);

function ToDoEkleFonksiyon(e){
    let YeniToDoYazi = "";
    YeniToDoYazi = ToDoEkleInput.value.trim();
    if (YeniToDoYazi === "") {
        const BosInputUyari = document.createElement("h2");
        BosInputUyari.innerHTML = "Boş Bırakmayın";
        BosInputUyari.style.color = "red";
        ToDoForm.appendChild(BosInputUyari);
        setTimeout(function(){
            BosInputUyari.remove();
        }, 1000)
    }else {
        addUI(YeniToDoYazi);
        AddToDoFromStorage(YeniToDoYazi);
    }
    ToDoEkleInput.value = "";
    e.preventDefault();
}

function addUI(YeniToDoYazi){
    const YeniToDo = document.createElement("div");
    const YeniToDoSil = document.createElement("a");
    YeniToDo.className = "todolar-oge";
    YeniToDoSil.href = "#";
    YeniToDoSil.innerHTML = "<img src='trash.svg' class='silbutonu' width='20px'>";
    YeniToDo.appendChild(document.createTextNode(YeniToDoYazi));
    YeniToDo.appendChild(YeniToDoSil);
    ToDoList.appendChild(YeniToDo);
}
function GetToDoFromStorage(YeniToDoYazi){
    let ToDoStorage;
    if (localStorage.getItem("ToDoStorage") === null){
        ToDoStorage = [];
    }else {
        ToDoStorage = JSON.parse(localStorage.getItem("ToDoStorage"));
    }
    return ToDoStorage; 
}
function AddToDoFromStorage(YeniToDoYazi){
    let ToDoStorage = GetToDoFromStorage();
    ToDoStorage.push(YeniToDoYazi);
    localStorage.setItem("ToDoStorage",JSON.stringify(ToDoStorage));
}

function ToDoYukleFonksiyonu(){
    let ToDoStorage = GetToDoFromStorage()
    ToDoStorage.forEach(function(todo){
        addUI(todo);
    })
}

function ToDoSilFonksiyonu(e){
    if (e.target.className === "silbutonu") {
        e.target.parentElement.parentElement.remove();
        ToDoSilFromStorageFonksiyon(e.target.parentElement.parentElement.textContent);
    }
}
function ToDoSilFromStorageFonksiyon(deletetodo){
    let ToDoStorage = GetToDoFromStorage();
    ToDoStorage.forEach(function(todo, index){
        if (todo === deletetodo){
            ToDoStorage.splice(index,1);
        }
    })
    localStorage.setItem("ToDoStorage",JSON.stringify(ToDoStorage));
}


function FiltrelemeFonksiyonu(e){
    let ArananMetin =  e.target.value.toLowerCase();
    let todolar = document.querySelectorAll(".todolar-oge");

    todolar.forEach(function(todo){
        const text = todo.textContent.toLowerCase();
        if (text.indexOf(ArananMetin) === -1){
            todo.setAttribute("style", "display: none");
        }else {
            todo.setAttribute("style", "display: flex");
        }
    })
    console.log(ArananMetin);
}


function TumunuTemizleFonksiyonu(e){
    if (confirm("Emin misin")) {
        if (ToDoList.textContent === ""){
            console.log("Boş");
        }else {
            console.log("Tümü Temizlendi");
            ToDoList.textContent = "";
            localStorage.removeItem("ToDoStorage");
        }
    }
}