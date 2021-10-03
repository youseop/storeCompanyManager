import { getCategoriesModel } from "./category.js";
import { EDIT } from "./constant.js";
import { pwd } from "./env.js";

export function setButtonEventOfManageModal() {
  const addButton = document.getElementById("add-button");
  const cancelButton = document.getElementById("cancel-button");
  const adminButton = document.getElementById("admin-button");
  const checkAdminButton = document.getElementById(
    "check-admin-container-button"
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

  const closeAdminButton = document.getElementById(
    "close-admin-container-button"
  );
  const adminContainer = document.getElementById("check-admin-container");
  const adminBackground = document.getElementById("check-admin-background");
  closeAdminButton.addEventListener("click", () => {
    closeAdminContainerButton();
  });
  adminContainer.addEventListener("click", () => {
    closeAdminContainerButton();
  });
  adminBackground.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  checkAdminButton.addEventListener("click", async () => {
    const passwordElem = document.getElementById("check-admin-input-field");
    if (passwordElem.innerText === pwd) {
      const outerContainer = document.getElementById("outer-container");
      outerContainer.className = "admin-mode";
      closeAdminContainerButton();
    } else {
      alert("잘못된 비밀번호 입니다.");
    }
    passwordElem.innerText = "";
  });
}

export function displayManageModal(dataForEdit, targetId) {
  const manageModal = document.getElementById("manage-modal");
  manageModal.classList.remove("closed");
  if (dataForEdit) {
    const submitButton = document.getElementById("submit-button");
    submitButton.classList.add("edit");
    getInputFieldManager().setValues(dataForEdit, targetId);
  }
}

export function closeManageModal() {
  const manageModal = document.getElementById("manage-modal");
  const submitButton = document.getElementById("submit-button");
  manageModal.classList.add("closed");
  submitButton.classList.remove(EDIT);
  getInputFieldManager().resetValues();
}

function toggleAdminMode() {
  const adminButton = document.getElementById("admin-button");
  const outerContainer = document.getElementById("outer-container");
  const checkAdminContainer = document.getElementById("check-admin-container");
  if (outerContainer.classList.contains("non-admin-mode")) {
    checkAdminContainer.classList.remove("closed");
  } else {
    outerContainer.className = "non-admin-mode";
  }

  const adminButtonClassName = adminButton.className;
  if (adminButtonClassName === "logout") {
    adminButton.className = "login";
  } else {
    adminButton.className = "logout";
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
    setValues: (dataForEdit, targetId) => {
      const { korname, engname, brandurl, isbranded, tags } = dataForEdit;
      korNameElem.innerText = korname;
      engNameElem.innerText = engname;
      brandUrlElem.innerText = brandurl;
      isBrandedCheckBox.checked = isbranded === "true";

      const categoryIds = tags.split(",");
      categoriesModel.resetCategories();
      for (const categoryId of categoryIds) {
        if (categoryId.length > 0) {
          categoriesModel.addCompany(categoryId);
        }
      }

      if (targetId) {
        const targetIdField = document.getElementById("id-for-edit");
        targetIdField.innerText = targetId;
      }
    },
  };
}

function checkValue(text) {
  if (text.length < 1) {
    alert("정보를 모두 입력해주세요.");
    return false;
  }
  return true;
}
