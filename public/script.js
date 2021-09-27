import { getCompaniesAndUpdate } from "./api.js";
import { displayManageModal, setButtonEventOfManageModal } from "./manageModal.js";
import { categoryInit } from "./category.js";
import { deleteCompany } from "./company.js";
import { initSubmit } from "./submit.js";
import { DELETE, EDIT } from "./constant.js";

categoryInit();
initSubmit();

document.addEventListener("DOMContentLoaded", async () => {
  await getCompaniesAndUpdate();
  setEventDeligation();
  setButtonEventOfManageModal();
});

function setEventDeligation() {
  const todoList = document.getElementById("company-list");
  todoList.addEventListener("click", (e) => {
    const target = e.target;
    const targetId = target.parentElement.id;
    switch (target.className) {
      case EDIT:
        const dataForEdit = e.target.parentNode.dataset;
        displayManageModal(dataForEdit, targetId);
        break;
      case DELETE:
        if (confirm("정말 삭제 하시겠습니까?")) {
          deleteCompany(targetId);
        }
        break;
      default:
        break;
    }
  });
}
