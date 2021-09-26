import { getInputFieldManager } from "./submit.js";

export function setButtonEvent() {
  const addButton = document.getElementById("add-button");
  const cancelButton = document.getElementById("cancel-button");

  addButton.addEventListener("click", () => {
    displayManageModal();
  });
  cancelButton.addEventListener("click", () => {
    closeManageModal();
  });
}

function displayManageModal() {
  const manageModal = document.getElementById("manage-modal");
  manageModal.classList.remove("closed");
}

export function closeManageModal() {
  const manageModal = document.getElementById("manage-modal");
  if (!manageModal.classList.contains("closed")) {
    manageModal.classList.add("closed");
  }
  getInputFieldManager().resetValues();
}
