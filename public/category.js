import { companyManager } from "./company.js";

const categoryMenu = document.querySelector("#category-menu");
const categoryList = document.querySelector("#category-list");
const dropdown = document.querySelector(".dropdown");
const userCategoryList = document.querySelector("#user-category-list");
let categoriesModel = null;

const mapCategoryIdToText = {
  "man-clothes": "남성의류",
  "man-accesery": "남성악세사리",
  "man-shose": "남성슈즈"
};

function initCategories() {
  let categories = [];
  return {
    getCategories: () => {
      return categories;
    },
    resetCategories: () => {
      categories = [];
      removeAllCategoryButtons();
    },
    addCompany: (companyId) => {
      categories.push(companyId);
      categories = categories.filter((element, index, array) => {
        return array.indexOf(element) === index;
      });
      removeAllCategoryButtons();
      setCategoryButtons();
    },
    removeCompany: (companyElem) => {
      categoryList.removeChild(companyElem);
      categories = categories.filter((category) => category !== companyElem.id);
    },
  };
}

export function getCategoriesModel() {
  if (categoriesModel) {
    return categoriesModel;
  }
  const dummyCategoriesModel = {
    getCategories: () => {
      return [];
    },
    resetCategories: () => {},
    addCompany: (company) => {},
    removeCompany: (company) => {},
  }
  return dummyCategoriesModel;
}

export function categoryInit() {
  categoriesModel = initCategories();

  categoryMenu.addEventListener("click", (e) => {
    const targetId = e.target.id;
    categoriesModel.addCompany(targetId);
  });

  categoryList.addEventListener("click", (e) => {
    const target = e.target;
    if (target.id === "category-list") {
      return;
    }
    categoriesModel.removeCompany(target);
  });

  dropdown.addEventListener("click", (e) => {
    if (dropdown.classList.contains("closed")) {
      dropdown.classList.remove("closed");
    } else {
      dropdown.classList.add("closed");
    }
  });

  userCategoryList.addEventListener("click",(e)=>{
    const categoryId = e.originalTarget.id;
    if(categoryId === 'user-category-list'){
      //카테고리 이외의 부분 누른경우 이렇게 예외처리....
      return;
    }
    changeCategory(categoryId)
    if(categoryId === 'total'){
      companyManager.resetCompanies();
    } else{
      companyManager.resetCompaniesInCategory(categoryId);
    }
  })
}

function changeCategory(categoryId){
  const prevCategory = userCategoryList.classList[0];
  if(prevCategory === categoryId){
    return;
  }
  const prevCategoryElem = userCategoryList.querySelector(`#${prevCategory}`);
  const nextCategoryElem = userCategoryList.querySelector(`#${categoryId}`);
  prevCategoryElem.className="";
  nextCategoryElem.className="clicked"
  userCategoryList.className=categoryId;
}

export function resetCategory(){
  changeCategory('total');
}

function addCategoryButton(categoryId) {
  const elem = `
    <div id="${categoryId}">
      ${mapCategoryIdToText[categoryId]}
    </div>
  `;
  categoryList.insertAdjacentHTML("beforeend", elem);
}

function setCategoryButtons() {
  for (const categoryId of getCategoriesModel().getCategories()) {
    addCategoryButton(categoryId);
  }
}

function removeAllCategoryButtons() {
  while (categoryList.firstChild) {
    categoryList.removeChild(categoryList.lastChild);
  }
}
