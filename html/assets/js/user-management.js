document
  .querySelector("#editUserModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#firstNameEdit").focus();
  });

document
  .querySelector("#addUserModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#firstName").focus();
  });

document.querySelectorAll(".delete-btn").forEach((btnConfirm) => {
  const id = btnConfirm.dataset.id;
  btnConfirm.addEventListener("click", (e) => {
    const options = {
      title: "Are you sure?",
      type: "danger",
      btnOkText: "Yes",
      btnCancelText: "No",
      onConfirm: () => {
        console.log("Confirm");
        deleteUser(id);
      },
      onCancel: () => {
        console.log("Cancel");
      },
    };
    const {
      el,
      content,
      options: confirmedOptions,
    } = bs5dialog.confirm("Do you really want to delete this user?", options);
  });
});

function showEditUserModal(btn){
  const {id, firstName, lastName, username, mobile, isAdmin} = btn.dataset;
  document.querySelector("#idEdit").value = id;
  document.querySelector("#firstNameEdit").value = firstName;
  document.querySelector("#lastNameEdit").value = lastName;
  document.querySelector("#usernameEdit").value = username;
  document.querySelector("#mobileEdit").value = mobile;
  document.querySelector("#isAdminEdit").checked = isAdmin ? true : false;
  console.log(id, firstName, lastName, username, mobile, isAdmin);
}

async function editUser(e){
  e.preventDefault();
  try{
    const formData = new FormData(document.querySelector('#editUserForm'));
    const data = Object.fromEntries(formData.entries());
    const res = await fetch('/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (res.ok){
      return location.reload();
    }
    const resText = await res.text();
    throw new Error(resText);
  }
  catch(err){
    document.querySelector('#errorMessageEdit').innerText = err.message;
    console.error(err);
  }
}

async function deleteUser(id){
  try{
    const res = await fetch(`/users/${id}`, {
      method: 'DELETE',
    });
    if (res.ok){
      return location.reload();
    }
    const resText = await res.text();
    throw new Error(resText);
  }
  catch(err){
    console.error(err);
    const toast = new bootstrap.Toast(document.querySelector('.toast'), {});
    document.querySelector('.toast-body').innerText = err.message;
    toast.show();
  }
}