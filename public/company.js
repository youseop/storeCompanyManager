import { resetCategory } from "./category.js";
import { findHangul, getCharFromCho } from "./word.js";

const companyList = document.getElementById("company-list");

function showCompanies(companies) {
  showBrandedCompanies(companies);

  const alignedCompaniesByCho = alignCompaniesByCho(companies);
  for (const cho in alignedCompaniesByCho){
    addKoreanCategoryTitle(cho);
    const companies = alignedCompaniesByCho[cho];
    for (const company of companies){
      showCompany(company);
    }
  }
}

function alignCompaniesByCho(companies){
  const alignedCompaniesByCho = {};
  for (const company of companies){
    const chosung = findHangul(company.korName);
    if(chosung){
      if(alignedCompaniesByCho[chosung] === undefined){
        alignedCompaniesByCho[chosung] = [];
      }
      alignedCompaniesByCho[chosung].push(company);
    }
  }
  return alignedCompaniesByCho;
}

function showBrandedCompanies (companies) {
  const categoryTag = `
    <div class="category-tag" id="branded">
      브랜디드 인더스트리
    </div>
    `
  const brandedCompanies = companies.filter(company=>company.isBranded);
  if(brandedCompanies.length > 0){
    companyList.insertAdjacentHTML("beforeend",categoryTag);
  } else {
    return;
  }
  for (const company of brandedCompanies){
    showCompany(company);
  }
}

function addKoreanCategoryTitle (cho){
  const char = getCharFromCho(cho);
  const categoryTag = `
    <div class="category-tag" id="${char}">
      ${char}
    </div>
    `
  companyList.insertAdjacentHTML("beforeend",categoryTag);
}

// todo - 정렬되어서 들어가게 수정해야 한다.
export function showCompany(company) {
  const elem = `
  <li 
    class='company'
    id='${company._id}' 
    data-korname="${company.korName}"
    data-engname="${company.engName}"
    data-brandurl="${company.brandUrl}"
    data-isbranded="${company.isBranded}"
    data-tags="${company.tags}"
  >
    <img src="asset/icon_edit.svg" alt="logo" class="edit"/>
    <a class="company-link" href='${company.brandUrl}' target="_blank" title="${company.korName}">
      <div>
        <span class="text" id="kor-name">${company.korName}</span>
        <span class="text" id="eng-name">${company.engName}</span>
      </div>    
    </a>
    <div class="arrow">></div>
    <img src="asset/icon_x.svg" alt="logo" class="delete"/>
  </li>`;
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

function updateCompanies(companies) {
  const companyList = document.getElementById("company-list");
  while (companyList.firstChild) {
    companyList.removeChild(companyList.lastChild);
  }
  resetCategory();
  showCompanies(companies);
}

function getCompanyManager(){
  let totalCompanies = [];
  return {
    resetCompaniesInCategory:(categoryId)=>{
      const companiesInCategory = totalCompanies.filter(company => {
        return company.tags.includes(categoryId);
      });
      updateCompanies(companiesInCategory);
    },
    setCompanies: (companies)=>{
      totalCompanies = companies.sort((firstElem,secondElem)=>firstElem.korName >= secondElem.korName);
      updateCompanies(totalCompanies);
    },
    addCompany: (company)=>{
      totalCompanies.push(company);
      totalCompanies = totalCompanies.sort((firstElem,secondElem)=>firstElem.korName >= secondElem.korName);
      updateCompanies(totalCompanies);
    },
    resetCompanies: () => {
      updateCompanies(totalCompanies);
    },
    editCompany: (editedCompany) => {
      for (let company of totalCompanies){
        if(company._id === editedCompany._id){
          company.engName = editedCompany.engName;
          company.korName = editedCompany.korName;
          company.brandUrl = editedCompany.brandUrl;
          company.tags = editedCompany.tags;
          company.isBranded = editedCompany.isBranded;
        }
      }
      updateCompanies(totalCompanies);
    },
    deleteCompany: (targetId)=>{
      const companyList = document.getElementById("company-list");
      const targetElement = document.getElementById(targetId);
      companyList.removeChild(targetElement);

      totalCompanies = totalCompanies.filter(company => company._id !== targetId);
      updateCompanies(totalCompanies);
    },
    getTotalCompanies: ()=>{
      return totalCompanies;
    },
  }
}

export const companyManager = getCompanyManager();