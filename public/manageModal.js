import { getCategoriesModel } from "./category.js";

export function setButtonEventOfManageModal() {
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

export function displayManageModal(dataForEdit) {
  const manageModal = document.getElementById("manage-modal");
  manageModal.classList.remove("closed");
  if(dataForEdit){
    const { korname, engname, brandurl, isbranded, tags } = dataForEdit;
    const submitButton = document.getElementById('submit-button');
    
    submitButton.classList.add("edit");
    getInputFieldManager().setValues(dataForEdit);
  }
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

export function getInputFieldManager() {
  const korNameElem = document.getElementById("korNameInputField");
  const engNameElem = document.getElementById("engNameInputField");
  const brandUrlElem = document.getElementById("brandUrlInputField");
  const isBrandedCheckBox = document.getElementById("isBrandedCheckBox");
  
  const categoriesModel = getCategoriesModel();
  
  return {
    getValues: () => {
      const korName = korNameElem.innerText;
      const engName = engNameElem.innerText;
      const brandUrl = brandUrlElem.innerText;
      const isBranded = isBrandedCheckBox.checked;
      const categories = categoriesModel.getCategories();
      if (checkValue(korName) && checkValue(engName) && checkValue(brandUrl)) {
        return { korName, engName, brandUrl, isBranded, tags: categories };
      } else {
        return;
      }
    },
    resetValues: () => {
      korNameElem.innerText = "";
      engNameElem.innerText = "";
      brandUrlElem.innerText = "https://";
      isBrandedCheckBox.checked = false;
      categoriesModel.resetCategories();
    },
    setValues: (dataForEdit)=>{
      const { 
        korname, 
        engname, 
        brandurl, 
        isbranded, 
        tags 
      } = dataForEdit;
      korNameElem.innerText = korname;
      engNameElem.innerText = engname;
      brandUrlElem.innerText = brandurl;
      isBrandedCheckBox.checked = isbranded === 'true';
      
      const categories = tags.split(",");
      categoriesModel.resetCategories();

      for (const category of categories){
        categoriesModel.addCompany(category);
      }
    }
  };
}

function checkValue(text) {
  if (text.length < 1) {
    alert("정보를 모두 입력해주세요.");
    return false;
  }
  return true;
}
