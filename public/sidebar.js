const Cho = [
  "가",
  "나",
  "다",
  "라",
  "마",
  "바",
  "사",
  "아",
  "자",
  "차",
  "카",
  "타",
  "파",
  "하",
];

export function addSidebarLink(e) {
  const targetId = e.target.id;
  const cho = targetId.split("_")[0];
  document.getElementById(cho).scrollIntoView();
}

export function addBrandedSidebarLink() {
  document.getElementById("branded").scrollIntoView();
}

export function resetSidebarLink() {
  for (const char of Cho) {
    const elem = document.getElementById(`${char}_link`);
    if (elem) {
      elem.removeEventListener("mouseenter", addSidebarLink);
    }
  }
}
