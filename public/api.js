import { showCompany, resetCompanies, editCompany } from "./company.js";

export async function getCompaniesAndUpdate() {
  fetch("/company/api", {
    method: "GET",
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(function (data) {
      data.sort((firstElem,secondElem)=>firstElem.korName >= secondElem.korName);
      resetCompanies(data);
    })
    .catch(function (error) {
      console.warn("error while get data", error);
    });
}

export async function addCompaniesAndUpdate(body) {
  fetch("/company/api", {
    method: "POST",
    body: JSON.stringify({
      ...body,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(function (data) {
      showCompany(data);
    })
    .catch(function (error) {
      console.warn("error while post data", error);
    });
}

export async function editComapniesAndUpdate(body, targetId) {
  fetch(`/company/api/${targetId}`, {
    method: "PUT",
    body: JSON.stringify({
      ...body,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(function (data) {
      editCompany(data);
    })
    .catch(function (error) {
      console.warn("error while post data", error);
    });
}

export async function deleteCompanyAndUpdate(targetId) {
  fetch(`/company/api/${targetId}`, {
    method: "DELETE",
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .catch(function (error) {
      console.warn("error while get data", error);
    });
}
