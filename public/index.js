
async function adduser(event){
 event.preventDefault();
const name = event.target.name.value;
const email = event.target.email.value;
const mobile = event.target.mobile.value;
const obj = {
    name,
    email,
    mobile
}
axios.post('http://localhost:5000/add-user',obj)
.then((res)=>{
console.log(res.data.newuser)
showUserOnScreen(res.data.newuser)
})
.catch((err)=>{
  console.log(err)
})
};
// Show user on screen
 function showUserOnScreen(data){
  console.log("name "+data.name)
  document.getElementById("for-name").value = "";
  document.getElementById("for-email").value = "";
  document.getElementById("for-number").value = "";
  const parentNode=document.getElementById("list-of-user");
  const childHTML= `<li id="${data.id}">Name:-${data.name}-Email:-${data.email}-Mobile:-${data.mobile}
  <button onclick=editUserDetails('${data.name}','${data.email}','${data.mobile}','${data.id}')>Edit</button>
  <button onclick=deleteUser('${data.id}')> Delete</button> </li> `
  parentNode.innerHTML= parentNode.innerHTML+childHTML;
};

// Display User from the server
window.addEventListener('DOMContentLoaded',()=>{
  axios.get('http://localhost:5000/get-user').then((res)=>{
    for(let i=0;i<res.data.alluser.length;i++){
      showUserOnScreen(res.data.alluser[i])
    }
  }).catch((err)=>{
    console.log(err)
  })
});

function deleteUser(data){
  axios.delete(`http://localhost:5000/delete-user${data}`)
  .then((res)=>{
    removeUserFromScreen(data);
    console.log(data+"akshay")
  }).catch((err)=>{
    console.log(err)
  })
 };


function removeUserFromScreen(data) {
  const parentNode = document.getElementById("list-of-user");
  const childNodeToBeDeleted = document.getElementById(data);
if(childNodeToBeDeleted){
      parentNode.removeChild(childNodeToBeDeleted);

}
}
function editUserDetails(name, email, mobile,id) {
  document.getElementById("for-name").value = name;
  document.getElementById("for-email").value = email;
  document.getElementById("for-number").value = mobile;

  deleteUser(id);
};  

