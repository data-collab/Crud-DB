let addPostForm=document.querySelector(".add-post-form");
let name=document.querySelector("#name-value")
let lastname=document.querySelector("#last-name-value")
let phone=document.querySelector("#number-value")
let address=document.querySelector("#address-value")
let btn=document.querySelector(".btn")
let cardBody = document.querySelector(".card")
let content=document.querySelector(".content")
let option=document.querySelector(".option")
let output = '';
let url="http://localhost:3000/users";


function renderPosts(posts){
    posts.forEach(post => {
        output += `
            <div class="card mt-4 col-md-6 bg-light">
            <div class="card-body" data-id="${post.id}">
                <h5 class="card-title" id="name-value">${post.firstName}</h5>
                <h5 class="card-subtitle mb-2 text-muted" id="last-name-value">${post.lastName}</h5>
                <h5 class="card-text" id="number-value">${post.phoneNumber}</h5>
                <h5 class="card-text" id="address-value">${post.address}</h5>
                <h5 class="card-text" id="gender">${post.gender}</h5>
                <button class="edit-link" id="edit-post">Edit</button>
                <button class="delete-link" id="delete-post">Delete</button>
            </div>
        </div>
            `;
        content.innerHTML = output
    })
}
async function api(){
    let response= await fetch("http://localhost:3000/genders");
    let data=await response.json();
    data.map(item=>{
        let gender=`
     <option class="gender" value=${item.value}>${item.value}</option>
    `
        option.innerHTML+=gender;
    })
}
api()



fetch("  http://localhost:3000/users")
    .then(res => res.json())
    .then(data => renderPosts(data))

content.addEventListener('click', (e) => {
    e.preventDefault();
    let delButtonIsPressed = e.target.id === 'delete-post';
    let editButtonIsPressed = e.target.id === 'edit-post';
    let id = e.target.parentElement.dataset.id;
    if (delButtonIsPressed) {
        fetch(`${url}/${id}`,{
            method: "DELETE"
        })
            .then(res => res.json())
            .then(() => location.reload())

    }
    if (editButtonIsPressed){
        let parent = e.target.parentElement;
        let nameContent=parent.querySelector("#name-value").textContent;
        let lastNameContent=parent.querySelector("#last-name-value").textContent;
        let phoneContent=parent.querySelector("#number-value").textContent;
        let addressContent=parent.querySelector("#address-value").textContent;
        let genderContent=parent.querySelector("#gender").textContent;

        name.value=nameContent;
        lastname.value=lastNameContent;
        phone.value=phoneContent;
        address.value=addressContent;
        option.value=genderContent;
        if (genderContent === "1"){
            genderContent = "მამრობითი"
        }else if (genderContent === "2"){
            genderContent = "მდედრობითი"
        }
        console.log(genderContent)
    }

    btn.addEventListener('click', (e)=> {
        e.preventDefault();
        fetch(`${url}/${id}`,{
            method: 'PUT',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                firstName:name.value,
                lastName:lastname.value,
                phoneNumber: phone.value,
                address: address.value,
                gender: option.value,
            })
        })
            .then(res => res.json())
            .then(() => location.reload())
    })

})


addPostForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch("  http://localhost:3000/users",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            firstName:name.value,
            lastName:lastname.value,
            phoneNumber: phone.value,
            address: address.value,
            gender: option.value,
        })
    })
        .then(res => res.json())
        .then(data => {
            const dataArr = [];
            dataArr.push(data)
            renderPosts(dataArr)
        })

    // reset input field
    name.value="";
    lastname.value="";
    phone.value="";
    address.value="";
})

