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

let prevTargetId = 'star-icon';

function changeTarget (target){
  document.getElementById(`${prevTargetId}`).className = '';
  prevTargetId = target.id;
  target.className = 'focused'
}

export function addSidebarLink(e) {
  const target = e.target;
  changeTarget(target)
  const cho = target.id.split("_")[0];
  const choElem = document.querySelector(`#${cho}`)
  window.scroll(0,   window.pageYOffset + choElem.getBoundingClientRect().top - 200 )
}

export function addBrandedSidebarLink(e) {
  const target = e.target;
  changeTarget(target)
  const brandedElem = document.getElementById("branded");
  window.scroll(0,   window.pageYOffset + brandedElem.getBoundingClientRect().top - 200 )
  brandedElem.className = 'focused'
}

export function resetSidebarLink() {
  for (const char of Cho) {
    const elem = document.getElementById(`${char}_link`);
    if (elem) {
      elem.removeEventListener("mouseenter", addSidebarLink);
    }
  }
}