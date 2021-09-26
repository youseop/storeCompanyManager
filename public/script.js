import { getCompaniesAndUpdate } from "./api.js";
import { setButtonEvent } from "./manageModal.js";
import { categoryInit } from "./category.js";
import { deleteCompany } from "./company.js";
import { initSubmit } from "./submit.js";

categoryInit();
initSubmit();

document.addEventListener("DOMContentLoaded", async () => {
  await getCompaniesAndUpdate();
  setEventDeligation();
  setButtonEvent();
});

function setEventDeligation() {
  const todoList = document.getElementById("company-list");
  todoList.addEventListener("click", (e) => {
    const target = e.target;
    const targetId = target.parentElement.id;
    switch (target.className) {
      case "text":
        // toggleTodo(targetId);
        break;
      case "delete":
        console.log("targetId", targetId);
        deleteCompany(targetId);
        break;
      default:
        break;
    }
  });
}
