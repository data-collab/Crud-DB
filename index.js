const input = document.querySelector('#email')
const error = document.querySelector('.error')
const passInput = document.querySelector('#password')
const passError = document.querySelector('.passError')

input.onblur = function () {
    if (!input.value.includes('@')) {
        input.classList.add('error')
        error.innerHTML = 'Please enter correct email'
        input.focus()
    }else{
        input.classList.remove('error')
        error.innerHTML = ''
    }
}
passInput.onblur = function () {
    if (passInput.value.length < 8) {
        passError.classList.add('error')
        passError.innerHTML = 'password must contain min 8 symbols'
        passInput.focus()
    }else if (passInput.value.length > 20){
        passError.classList.add('error')
        passError.innerHTML = 'password must contain max 20 symbols'
        passInput.focus()
    }else{
        passInput.classList.remove('error')
    }

}

// 

let myTodoList = document.getElementsByTagName('LI')

for (let i = 0;i < myTodoList.length;i++){
    let span = document.createElement('SPAN')
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myTodoList[i].appendChild(span);
}

let close = document.getElementsByClassName('close')

for (let i = 0;i < close.length;i++){
    close[i].onclick = function() {
        let div = this.parentElement;
        div.style.display = "none";
    }
}

let list = document.querySelector('ul');
list.addEventListener('click', function(onClicked) {
    if (onClicked.target.tagName === 'LI') {
        onClicked.target.classList.toggle('checked');
    }
}, false);


function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("todoListID").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("todoListID").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}

