const categoryMenu = document.querySelector("#category-menu");
const categoryList = document.querySelector("#category-list");
const dropdown = document.querySelector(".dropdown");
let categoriesModel = null;

const mapCategoryIdToText = {
  "man-clothes": "남성의류",
  "man-accesery": "남성악세사리",
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
  return {
    getCategories: () => {
      return [];
    },
    resetCategories: () => {},
    addCompany: (company) => {},
    removeCompany: (company) => {},
  };
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