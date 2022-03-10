let form2 = document.getElementById("form");
let mytable = document.getElementsByTagName("tbody")[0];
let submit = document.getElementById("submit");
let savechanges = document.getElementById("savechanges");
let select = document.getElementById('select');
select.innerHTML = "<option selected>Developer</option>";
// ------------------------------pagination----------------------------
const pagemanage = document.getElementsByClassName('pagemanage');
const privious = document.getElementById('Previous');
const currentPrevious = document.getElementById('currentPrevious');
const current = document.getElementById('current');
const currentNext = document.getElementById('currentNext');
const Next = document.getElementById('Next');
privious.classList.add('hidden');
currentPrevious.classList.add('hidden');
// ----------------------------windows-load-function----------------------------------------
window.addEventListener('load', async (event) => {
	const details = await axios.get('/admin/alldetails')
	details.data.Result.filter(x => (x._id != "6210d0e1ab6574603b2ad791") && (x.userverification != false)).map(x => {
		return select.innerHTML += `<option value="${x.username}"> ${x.username}</option>`
	})
	display();
});

async function display() {
	const statusvalue = $('input[name="flexRadioDefault"]:checked').val();
	const value = statusvalue.split(" ")[2];
	pagination(0, value);
};
// -----------------------------status-change-function-------------------
$(document).ready(function () {
	$('.Task').change(async function () {
		let data = await $(this).val();
		const value = data.split(" ")[2];
		pagination(0, value);
	});
});
// ------------------pagination method-------------------------------
function pagination(defaultPage, status) {
	paginationPage(defaultPage, status)
	for (i = 0; i < pagemanage.length; i++) {
		pagemanage[i].addEventListener('click', async function (event) {
			const statusvalue = $('input[name="flexRadioDefault"]:checked').val();
			const value = statusvalue.split(" ")[2];
			event.preventDefault();
			let page;
			if (this.innerText != 'Previous' && this.innerText != 'Next') {
				page = this.innerText - 1;
			} else if (this.innerText == 'Previous') {
				page = current.innerText - 2;
			} else {
				page = current.innerText;
			}
			paginationPage(page, value)
		})
	}
}
// ----------------------paginatin page configuration method-------------------------
async function paginationPage(page, status) {
	let details;
	const size = 5;
	if (status != 'All' && status) {
		details = await axios.post(`/detail/findDetailByStatus?page=${page}&size=${size}`, {
			status: status
		});
	} else {
		details = await axios.get(`/detail/alluserdetails?page=${page}&size=${size}`);
	}
	show(details);
	const Result = details.data.Result;
	current.innerHTML = Result.page;
	if (Result.hasNextPage) {
		currentNext.classList.remove('hidden');
		Next.classList.remove('hidden');
		currentNext.innerHTML = Result.nextPage;
	}
	if (!Result.hasNextPage) {
		currentNext.classList.add('hidden');
		Next.classList.add('hidden');
		currentNext.innerHTML = Result.nextPage;
	}
	if (!Result.hasPrevPage) {
		privious.classList.add('hidden');
		currentPrevious.classList.add('hidden');
	}
	if (Result.hasPrevPage) {
		privious.classList.remove('hidden')
		currentPrevious.classList.remove('hidden')
		currentPrevious.innerHTML = Result.prevPage
	}
}
// --------------------------table-data---------------------------
function show(val) {
	const Result = val.data.Result.docs
	mytable.innerHTML = "";
	for (let i = 0; i < Result.length; i++) {
		if (Result.length) {
			mytable.innerHTML += `<tr>
								<td>${Result[i]._id}</td>
								<td>${Result[i].developer}</td>
								<td>${Result[i].Job}</td>
								<td>${Result[i].Projectname}</td>
								<td>${Result[i].Dateofassigned}</td>
								<td>${Result[i].Projectstatus}</td>
								<td>${Result[i].DateOfcompleted}</td>
								<td>
								<div class="d-flex" >
								<button type="button" style="padding: 8px; width:68px;" class="btn me-2 btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = "edit('${Result[i]._id}')">Edit</button>
								<button type="button" class="btn btn-danger" data-bs-target="#staticBackdrop" data-bs-toggle="modal" id="del" onclick = "del('${Result[i]._id}')">Delete</button>
								</div>
								</td> 
								</tr>`
		}
	}
}
// --------------------add-button---------------------------------
let addButton = document.getElementById("addButton")
addButton.addEventListener('click', async function () {
	select.disabled = false;
	form2.reset()
	savechanges.style.display = "none";
	submit.style.display = "block";
})
// -------------------------add button submit create details-----------------
async function detail() {
	'use strict'
	document.querySelectorAll('.needs-validation')
		.forEach(function (form) {
			form.addEventListener('submit', async function (event) {
				event.preventDefault();
				let obj = {
					developer: select.value,
					Job: document.getElementById('Job').value,
					Projectname: document.getElementById("Projectname").value,
					Dateofassigned: document.getElementById("Dateofassigned").value,
					Projectstatus: $("input[name='Projectstatus']:checked").val(),
					DateOfcompleted: document.getElementById("DateOfcompleted").value
				};
				await axios.post('/admin/create', obj)
				display();
				document.getElementById("close").click();
			}, false)
		})
};
detail();
// ----------------------------edit button fetch detail in form--------------
let user;
async function edit(userid) {
	submit.style.display = "none";
	savechanges.style.display = "block";
	const Result = await axios.post('/detail/GetoneDetail', {
		_id: userid
	});
	user = Result.data.Result;
	select.value = Result.data.Result[0].developer;
	select.disabled = true;
	document.getElementById('Job').value = Result.data.Result[0].Job;
	document.getElementById('Projectname').value = Result.data.Result[0].Projectname;
	document.getElementById('Dateofassigned').value = Result.data.Result[0].Dateofassigned;
	document.getElementById('DateOfcompleted').value = Result.data.Result[0].DateOfcompleted;
	let status = document.getElementsByName('Projectstatus')
	for (i = 0; i < status.length; i++) {
		if (status[i].value == Result.data.Result[0].Projectstatus) {
			status[i].checked = true;
		}
	}
};
// --------------------submit edited details-------------------------
async function edit2(event) {
	event.preventDefault();
	user[0].Projectname = document.getElementById('Projectname').value;
	user[0].Dateofassigned = document.getElementById('Dateofassigned').value;
	user[0].Projectstatus = $("input[name='Projectstatus']:checked").val();
	user[0].DateOfcompleted = document.getElementById('DateOfcompleted').value;
	user[0].Job = document.getElementById('Job').value
	const update = await axios.post('/detail/updateDetail', user[0])
	display();
	document.getElementById("close").click();
};
// -----------------------------delete detail----------------------------
function del(Detailid) {
	let confirm = document.getElementById('confirm')
	confirm.addEventListener('click', async () => {
		const deleted = await axios.delete(`/detail/DeleteDetail/${Detailid}`);
		display();
	})
};