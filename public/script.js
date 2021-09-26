import { getCompaniesAndUpdate } from "./api.js";
import { displayManageModal, setButtonEvent } from "./manageModal.js";
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
      case "edit":
        const targetData = e.target.parentNode.dataset;
        console.log(targetData);

        //submit 이랑 다른 edit페이지 만들어야함!
        // if (targetData) {
        //   const { korname, engname, brandurl, isbranded, tags } = targetData;
        //   const korName = korname;
        //   const engName = engname;
        //   const brandUrl = brandurl;
        //   const isBranded = isbranded === "true";
        //   const categories = tags.split(",");
        //   console.log(korName, engName, brandUrl, isBranded, categories);

        // }
        break;
      case "delete":
        if (confirm("정말 삭제 하시겠습니까?")) {
          deleteCompany(targetId);
        }
        break;
      default:
        break;
    }
  });
}
