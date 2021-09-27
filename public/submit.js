import { addCompaniesAndUpdate, editComapniesAndUpdate } from "./api.js";
import { EDIT } from "./constant.js";
import { closeManageModal, getInputFieldManager } from "./manageModal.js";

export function initSubmit() {
  const submitButton = document.getElementById("submit-button");
  submitButton.addEventListener("click", (e)=>submit(e));
}

function submit(e) {
  const targetClassList = e.target.classList;
  const inputFieldManager = getInputFieldManager();
  const inputFieldValues = inputFieldManager.getValues();
  if (inputFieldValues === undefined) {
    return
  }
  inputFieldManager.resetValues();
  if(targetClassList.contains(EDIT)){
    const targetIdField = document.getElementById('id-for-edit');
    const targetId = targetIdField.innerHTML;
    editComapniesAndUpdate(inputFieldValues, targetId);
  } else {
    addCompaniesAndUpdate(inputFieldValues);
  }
  closeManageModal();
}