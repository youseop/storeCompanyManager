import { getCompaniesAndUpdate, recordViewCompany } from "./api.js";
import {
  displayManageModal,
  setButtonEventOfManageModal,
} from "./manageModal.js";
import { categoryInit } from "./category.js";
import { initSubmitBrand } from "./submitBrand.js";
import { DELETE, EDIT } from "./constant.js";
import { initSearchForm } from "./search.js";

categoryInit();
initSubmitBrand();
initSearchForm();

document.addEventListener("DOMContentLoaded", async () => {
  await getCompaniesAndUpdate();
  setEventDeligation();
  setButtonEventOfManageModal();
});

document.getElementById("go-to-top").addEventListener('click',()=>{
  window.scrollTo(0,0)
})

function setEventDeligation() {
  const todoList = document.getElementById("company-list");
  const deleteModal = document.getElementById("delete-admin-container");
  const deleteButton = document.getElementById("delete-admin-container-button");

  todoList.addEventListener("click", (e) => {
    const target = e.target;
    const targetClassName = target.className
    const brandId = target.parentElement.id;
    const korName = target.parentElement.dataset['korname'];
    if(targetClassName.indexOf('company-link-nonadmin')>=0){
      recordViewCompany({korName});
    }
    switch (target.className) {
      case EDIT:
        const dataForEdit = e.target.parentNode.dataset;
        displayManageModal(dataForEdit, brandId);
        break;
      case DELETE:
        deleteModal.classList.remove("closed");
        deleteButton.className = brandId;
        const brandName = target.parentElement.dataset.korname;
        document.getElementById('brand-will-delete').innerText = brandName
        break;
      default:
        break;
    }
  });
}
