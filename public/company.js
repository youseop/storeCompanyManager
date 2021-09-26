import { deleteCompanyAndUpdate } from "./api.js";

function showCompanies(companies) {
  for (let company of companies) {
    showCompany(company);
  }
}

export function showCompany(company) {
  const elem = `
  <li 
    id='${company._id}' 
    data-korname="${company.korName}"
    data-engname="${company.engName}"
    data-brandurl="${company.brandUrl}"
    data-isbranded="${company.isBranded}"
    data-tags="${company.tags}"
  >
  <span class="edit">edit</span>
  <a href='${company.brandUrl}' target="_blank" titl="${company.korName}">
    <span class="text">${company.korName}</span>
    <span class="text">${company.engName}</span>
  </a>
  <span class="delete">X</span>
  </li>`;
  const companyList = document.getElementById("company-list");
  companyList.insertAdjacentHTML("beforeend", elem);
}

export function resetCompanies(companies) {
  const companyList = document.getElementById("company-list");
  while (companyList.firstChild) {
    companyList.removeChild(companyList.lastChild);
  }
  showCompanies(companies);
}

export function deleteCompany(targetId) {
  const companyList = document.getElementById("company-list");
  const targetElement = document.getElementById(targetId);
  companyList.removeChild(targetElement);
  deleteCompanyAndUpdate(targetId);
}
