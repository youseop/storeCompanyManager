import { showCompany, resetCompanies } from "./company.js";

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
      console.log(data);
      showCompany(data);
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
