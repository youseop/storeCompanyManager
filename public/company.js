import { addBrandedSidebarLink, addSidebarLink } from "./sidebar.js";
import { findHangul, getCharFromCho, Cho } from "./word.js";

const companyList = document.getElementById("company-list");

function showCompanies(companies) {
  const brandedCompanies = companies.filter((company) => company.isBranded);
  showBrandedCompanies(brandedCompanies);
  showCompaniesAlignedByKor(companies);
}

function showCompaniesAlignedByKor(companies) {
  const alignedCompaniesByCho = alignCompaniesByCho(companies);
  const ElemArray = [];
  for (const cho of Cho) {
    const companiesInCho = alignedCompaniesByCho[cho];
    if (companiesInCho) {
      ElemArray.push(getKoreanCategoryTitleElem(cho));
      ElemArray.push(...companiesInCho.map(getCompanyElem));
    }
  }
  companyList.insertAdjacentHTML("beforeend", 
    ElemArray.join('')
  )

  for (const cho of Cho) {
    if (alignedCompaniesByCho[cho]) {
      addKoreanCategoryTitleEvent(cho);
    }
  }
}

function alignCompaniesByCho(companies) {
  const alignedCompaniesByCho = {};
  for (const company of companies) {
    let chosung = findHangul(company.korName);
    if(chosung === 'ㄲ'){
      chosung = 'ㄱ'
    } else if(chosung === 'ㄸ'){
      chosung = 'ㄷ'
    } else if(chosung === 'ㅃ'){
      chosung = 'ㅂ'
    } else if(chosung === 'ㅆ'){
      chosung = 'ㅅ'
    } else if(chosung === 'ㅉ'){
      chosung = 'ㅈ'
    }
    if (chosung) {
      if (alignedCompaniesByCho[chosung] === undefined) {
        alignedCompaniesByCho[chosung] = [];
      }
      alignedCompaniesByCho[chosung].push(company);
    }
  }
  return alignedCompaniesByCho;
}

function showBrandedCompanies(brandedCompanies) {
  const categoryTag = `
    <div class="category-tag" id="branded">
      브랜디드 인더스트리
    </div>
    `;
  const starIcon = document.getElementById("star-icon");
  starIcon.addEventListener("click", addBrandedSidebarLink);
  starIcon.addEventListener("mouseenter", addBrandedSidebarLink);

  if (brandedCompanies.length > 0) {
    companyList.insertAdjacentHTML("beforeend", categoryTag);
  } else {
    return;
  }
  companyList.insertAdjacentHTML("beforeend", 
    brandedCompanies.map(getCompanyElem).join('')
  )
}

function getKoreanCategoryTitleElem(cho) {
  const char = getCharFromCho(cho);
  return `
    <div class="category-tag" id="${char}">
      ${char}
    </div>
    `;
}

function addKoreanCategoryTitleEvent(cho) {
  const char = getCharFromCho(cho);
  const charElem = document.getElementById(`${char}_link`);
  if (charElem) {
    charElem.addEventListener("click", addSidebarLink);
    charElem.addEventListener("mouseenter", addSidebarLink);
    charElem.addEventListener("touchstart", addSidebarLink);
  }
}

export function getCompanyElem(company) {
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
    <a class="company-link-common company-link-nonadmin" href='${company.brandUrl}' target="_blank" title="${company.korName}">
      <div>
        <span class="text" id="kor-name">${company.korName}</span>
        <span class="text" id="eng-name">${company.engName}</span>
      </div>    
      <div class="arrow">
        <img src="asset/icon_main_arrow.svg" alt="admin" class="link-icon"/>
      </div>
    </a>
    <div class="company-link-common company-link-admin" href='${company.brandUrl}' target="_blank" title="${company.korName}">
      <div>
        <span class="text" id="kor-name">${company.korName}</span>
        <span class="text" id="eng-name">${company.engName}</span>
      </div>    
      <div class="arrow">
        <img src="asset/icon_main_arrow.svg" alt="admin" class="link-icon"/>
      </div>
    </div>
    <img src="asset/icon_x.svg" alt="logo" class="delete"/>
  </li>`;
  return elem;
}

export function editCompany(company) {
  const companyId = company._id;
  const companyElem = document.getElementById(companyId);
  if (companyElem) {
    companyElem.dataset.korname = company.korName;
    companyElem.dataset.engname = company.engName;
    companyElem.dataset.brandurl = company.brandUrl;
    companyElem.dataset.isbranded = company.isBranded;
    companyElem.dataset.tags = company.tags;

    const linkTag = companyElem.children[1];
    linkTag.href = company.brandUrl;
    linkTag.title = company.korName;

    const korNameElem = linkTag.children["kor-name"];
    korNameElem.innerText = company.korName;

    const engNameElem = linkTag.children["eng-name"];
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
  showCompanies(companies);
}

function getCompanyManager() {
  let totalCompanies = [];
  return {
    resetCompaniesInCategory: (categoryId) => {
      const companiesInCategory = totalCompanies.filter((company) => {
        return company.tags.includes(categoryId);
      });
      updateCompanies(companiesInCategory);
    },
    setCompanies: (companies) => {
      const brandCounterText = document.getElementById("brand-count-text-bold");
      brandCounterText.innerText = `${companies.length}개`
      totalCompanies = companies.sort(sortByKorName);
      updateCompanies(totalCompanies);
    },
    addCompany: (company) => {
      totalCompanies.push(company);
      totalCompanies = totalCompanies.sort(sortByKorName);
      updateCompanies(totalCompanies);
    },
    resetCompanies: () => {
      updateCompanies(totalCompanies);
    },
    editCompany: (editedCompany) => {
      for (let company of totalCompanies) {
        if (company._id === editedCompany._id) {
          company.engName = editedCompany.engName;
          company.korName = editedCompany.korName;
          company.brandUrl = editedCompany.brandUrl;
          company.tags = editedCompany.tags;
          company.isBranded = editedCompany.isBranded;
        }
      }
      updateCompanies(totalCompanies);
    },
    deleteCompany: (targetId) => {
      const companyList = document.getElementById("company-list");
      const targetElement = document.getElementById(targetId);
      companyList.removeChild(targetElement);

      totalCompanies = totalCompanies.filter(
        (company) => company._id !== targetId
      );
      updateCompanies(totalCompanies);
    },
    getTotalCompanies: () => {
      return totalCompanies;
    },
    searchCompany: (keyWord) => {
      const LoweredKeyWord = keyWord.toLowerCase();
      const searchedCompanies = totalCompanies.filter((company) => {
        if (
          company.engName.toLowerCase().indexOf(LoweredKeyWord) >= 0 ||
          company.korName.indexOf(keyWord) >= 0
        ) {
          return true;
        }
        return false;
      });
      updateCompanies(searchedCompanies);
    },
  };
}

const sortByKorName = (firstElem, secondElem) => {
  if(firstElem.korName >= secondElem.korName){
    return 1;
  }
  return -1;
}

export const companyManager = getCompanyManager();
