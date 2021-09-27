import { deleteCompanyAndUpdate } from "./api.js";

function showCompanies(companies) {
  for (let company of companies) {
    showCompany(company);
  }
}

// todo - 정렬되어서 들어가게 수정해야 한다.
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
  <a href='${company.brandUrl}' target="_blank" title="${company.korName}">
    <span class="text" id="kor-name">${company.korName}</span>
    <span class="text" id="eng-name">${company.engName}</span>
  </a>
  <span class="delete">X</span>
  </li>`;
  const companyList = document.getElementById("company-list");
  companyList.insertAdjacentHTML("beforeend", elem);
}

export function editCompany(company){
  const companyId = company._id;
  const companyElem = document.getElementById(companyId);
  if (companyElem){
    companyElem.dataset.korname = company.korName;
    companyElem.dataset.engname = company.engName;
    companyElem.dataset.brandurl = company.brandUrl;
    companyElem.dataset.isbranded = company.isBranded;
    companyElem.dataset.tags = company.tags;

    const linkTag = companyElem.children[1];
    linkTag.href = company.brandUrl;
    linkTag.title = company.korName;
    
    const korNameElem = linkTag.children['kor-name'];
    korNameElem.innerText = company.korName;
    
    const engNameElem = linkTag.children['eng-name'];
    engNameElem.innerText = company.engName;
  } else {
    console.log("should edit company but can't find company element.");
  }
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
