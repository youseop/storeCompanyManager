import { companyManager } from "./company.js";

const formTag = document.querySelector("#search-form");
const inputTag = document.querySelector("#search-input")
const searchIcon = document.querySelector("#search-icon")

export function initSearchForm() {
    formTag.addEventListener('submit',(e)=>submitEvent(e));
    searchIcon.addEventListener('click',(e)=>submitEvent(e));
}

function submitEvent (e) {
    e.preventDefault();
    const searchKeyword = inputTag.value;
    if(searchKeyword.length <= 0){
        return;
    }
    inputTag.value = '';
    companyManager.searchCompany(searchKeyword);
}