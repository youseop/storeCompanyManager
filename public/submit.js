import { addCompaniesAndUpdate } from "./api.js";
import { getCategoriesModel } from "./category.js";
import { closeManageModal } from "./manageModal.js";

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

export function getInputFieldManager() {
  const korNameElem = document.getElementById("korNameInputField");
  const engNameElem = document.getElementById("engNameInputField");
  const brandUrlElem = document.getElementById("brandUrlInputField");
  const isBrandedCheckBox = document.getElementById("isBrandedCheckBox");
  return {
    getValues: () => {
      const korName = korNameElem.innerText;
      const engName = engNameElem.innerText;
      const brandUrl = brandUrlElem.innerText;
      const isBranded = isBrandedCheckBox.checked;
      const categories = getCategoriesModel().getCategories();
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
      getCategoriesModel().resetCategories();
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
