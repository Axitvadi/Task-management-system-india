//get cookie function
function getCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split('; ');
  let res;
  cArr.forEach(val => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  })
  return res
}

//get user detail 
let main;
async function getuser() {
  let userid = getCookie('id')
  const detailofuser = await axios.post('/user/detail', {
    _id: userid
  });
  main = detailofuser.data.Result;
  $('.detail').text(main.username);
  $('.email').text(main.email);
  $('.id').text(main._id);
  $('.job').text(main.Job);
  return main;
};

//function run when windows load
let user;
window.addEventListener('load', async function (event) {
  const info = await getuser();
  user = info.username;
  display();
})

let form2 = document.getElementById("form");
let mytable = document.getElementsByTagName("tbody")[0];
let entervalues = document.getElementById("values");
let submit = document.getElementById("submit");
let savechanges = document.getElementById("savechanges");

//display all detail of user
let info;
async function display() {
  const detailofuser = await axios.post('/detail/findByName', {
    developer: user
  });
  info = detailofuser.data.Result;
  let array = detailofuser.data.Result;
  mytable.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    mytable.innerHTML += `<tr>
										<td>${array[i].Projectname}</td>
										<td>${array[i].Dateofassigned}</td>
										<td>${array[i].Projectstatus}</td>
										<td>${array[i].DateOfcompleted}</td>
										<td class=" d-flex justify-content-center">
											<button type="button" style="padding: 8px; width:75px;"
												class=" me-2 btn btn-primary" data-bs-toggle="modal"
												data-bs-target="#exampleModal" onclick = "edit('${array[i]._id}')" >Edit</button>
										</td>
									</tr>`
  }
}

// function run after user click on edit button 
let obj;
async function edit(val) {
  $(".DU").hide();
  $(".DE").show();
  $('#submit').hide();
  $("#savechanges").show();
  savechanges.style.display = "block";
  obj = info.find(function (el) {
    return el._id == val
  })
  let x = document.querySelectorAll(".tvalue");
  for (let key of x) {
    document.getElementById(key.id).value = obj[key.id];
    document.getElementById('Projectname').disabled = true;
    document.getElementById('Dateofassigned').disabled = true;
  }
  let status = document.getElementsByName('Projectstatus')
  for (i = 0; i < status.length; i++) {
    if (status[i].value == obj.Projectstatus) {
      status[i].checked = true;
    }
  }
}

//function call when user click on save detail
async function edit2() {
  let x = document.querySelectorAll(".tvalue");
  for (let key of x) {
    obj[key.id] = document.getElementById(key.id).value;
  }
  obj.Projectstatus = $("input[name='Projectstatus']:checked").val();
  await axios.post('/detail/updateDetail', obj)
  display();
  document.getElementById("close").click();
}


let useredit = document.getElementById('useredit');
useredit.addEventListener('click', userchange)
//function call when user click on edit profile button
async function userchange() {
  $("#submit").show();
  $("#savechanges").hide();
  $(".DE").hide();
  $('.DU').show(); 
  $('#Job').val(`${main.Job}`)
}
//function call when user click on save changes for profile update
$('#form').submit(async function (event) {
  event.preventDefault();
  let job = $('#Job').val();
  let data = {
    Job: job,
    developer: main.username
  }
  const updated = await axios.post('/user/updateUser',data);
  document.getElementById("close").click();
  await getuser();
  document.getElementById('form').reset();
});