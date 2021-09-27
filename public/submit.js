import { addCompaniesAndUpdate } from "./api.js";
import { closeManageModal, getInputFieldManager } from "./manageModal.js";

export function initSubmit() {
  const submitButton = document.getElementById("submit-button");
  submitButton.addEventListener("click", submit);
}

function submit() {
  const inputFieldManager = getInputFieldManager();
  const inputFieldValues = inputFieldManager.getValues();
  if (inputFieldValues) {
    inputFieldManager.resetValues();
    addCompaniesAndUpdate(inputFieldValues);
    closeManageModal();
  }
}