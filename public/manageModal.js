import { getInputFieldManager } from "./submit.js";

export function setButtonEvent() {
  const addButton = document.getElementById("add-button");
  const cancelButton = document.getElementById("cancel-button");
  const adminButton = document.getElementById("admin-button");
  const checkAdminButton = document.getElementById(
    "check-admin-container-button"
  );
  const closeAdminButton = document.getElementById(
    "close-admin-container-button"
  );

  addButton.addEventListener("click", () => {
    displayManageModal();
  });
  cancelButton.addEventListener("click", () => {
    closeManageModal();
  });
  adminButton.addEventListener("click", () => {
    toggleAdminMode();
  });
  console.log("closeAdminButton", closeAdminButton);
  closeAdminButton.addEventListener("click", () => {
    closeAdminContainerButton();
  });
  checkAdminButton.addEventListener("click", () => {
    const passwordElem = document.getElementById("check-admin-input-field");
    if (passwordElem.innerText !== "aaaa") {
      passwordElem.innerText = "";
      alert("잘못된 비밀번호 입니다.");
      return;
    }
    passwordElem.innerText = "";
    const outerContainer = document.getElementById("outer-container");
    outerContainer.classList.remove("non-admin-mode");
    closeAdminContainerButton();
  });
}

export function displayManageModal() {
  const manageModal = document.getElementById("manage-modal");
  manageModal.classList.remove("closed");
}

export function closeManageModal() {
  const manageModal = document.getElementById("manage-modal");
  manageModal.classList.add("closed");
  getInputFieldManager().resetValues();
}

function toggleAdminMode() {
  const outerContainer = document.getElementById("outer-container");
  const checkAdminContainer = document.getElementById("check-admin-container");
  if (outerContainer.classList.contains("non-admin-mode")) {
    checkAdminContainer.classList.remove("closed");
  } else {
    outerContainer.classList.add("non-admin-mode");
  }
}

function closeAdminContainerButton() {
  const checkAdminContainer = document.getElementById("check-admin-container");
  checkAdminContainer.classList.add("closed");
}
