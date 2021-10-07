import { addCompaniesAndUpdate, editComapniesAndUpdate } from "./api.js";
import { EDIT } from "./constant.js";
import { closeManageModal, getInputFieldManager } from "./manageModal.js";
import { checkEng, checkKor } from "./word.js";

export function initSubmitBrand() {
  const submitButton = document.getElementById("submit-button");
  submitButton.addEventListener("click", (e)=>submitBrand(e));
}

function submitBrand(e) {
  const targetClassList = e.target.classList;
  const inputFieldManager = getInputFieldManager();
  const inputFieldValues = inputFieldManager.getValues();
  if (inputFieldValues === undefined) {
    return;
  }
  if (!checkKor(inputFieldValues.korName[0])){
    alert('한글 표기가 잘못되었습니다.')
    return;
  }
  if (!checkEng(inputFieldValues.engName[0])){
    alert('영어 표기가 잘못되었습니다.')
    return;
  }
  inputFieldManager.resetValues();
  if(targetClassList.contains(EDIT)){
    const targetIdField = document.getElementById('id-for-edit');
    const targetId = targetIdField.innerHTML;
    editComapniesAndUpdate(inputFieldValues, targetId);
  } else {
    addCompaniesAndUpdate(inputFieldValues);
  }
  closeManageModal();
}