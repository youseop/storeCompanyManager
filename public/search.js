import { companyManager } from "./company.js";

const formTag = document.querySelector("#search-form");
const inputTag = document.querySelector("#search-input");
const searchIcon = document.querySelector("#search-icon");
const searchContainer = document.querySelector("#search-container");
const deleteInputTextButton = document.querySelector('#delete-input-text');

export function initSearchForm() {
  formTag.addEventListener("submit", (e) => submitEvent(e));
  searchIcon.addEventListener("click", (e) => submitEvent(e));
  searchContainer.addEventListener("click", () => {
    inputTag.focus();
  });
  inputTag.addEventListener('focusout',focusoutInputTag)
  inputTag.addEventListener('focusin',focusinInputTag)
  deleteInputTextButton.addEventListener('click',(e)=>{
    e.stopPropagation()
    inputTag.value="";
    inputTag.blur();
  })
}

function submitEvent(e) {
  e.preventDefault();
  const searchKeyword = inputTag.value;
  if (searchKeyword.length <= 0) {
    return;
  }
  inputTag.value = "";
  companyManager.searchCompany(searchKeyword);
  inputTag.blur();
}


function focusinInputTag () {
  deleteInputTextButton.className="display"
  setTimeout(()=>{
    const deleteInputTextButton = document.querySelector('#delete-input-text');
    deleteInputTextButton.addEventListener('click',(e)=>{
      inputTag.value="";
      inputTag.blur();
      e.stopPropagation()
    } )
  },100)
}

function focusoutInputTag () {
  deleteInputTextButton.classList = []
}