import { companyManager } from "./company.js";

const formTag = document.querySelector("#search-form");
const inputTag = document.querySelector("#search-input");
const searchIcon = document.querySelector("#search-icon");
const searchContainer = document.querySelector("#search-container");

export function initSearchForm() {
  formTag.addEventListener("submit", (e) => submitEvent(e));
  searchIcon.addEventListener("click", (e) => submitEvent(e));
  searchContainer.addEventListener("click", () => {
    inputTag.focus();
  });
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
