export const Cho = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];
const ChoToChar = {
  ㄱ: "가",
  ㄴ: "나",
  ㄷ: "다",
  ㄹ: "라",
  ㅁ: "마",
  ㅂ: "바",
  ㅅ: "사",
  ㅇ: "아",
  ㅈ: "자",
  ㅊ: "차",
  ㅋ: "카",
  ㅌ: "타",
  ㅍ: "파",
  ㅎ: "하",
};

export function getCharFromCho(cho) {
  return ChoToChar[cho];
}

export function findHangul(string) {
  function isHangul(word) {
    return word.charCodeAt(0) - 0xac00;
  }

  function validateHangul(string) {
    const word = string[0];
    if (Cho.includes(word)) {
      Cho[word] += 1;
    }
    const unit = isHangul(word);
    if (unit >= isHangul("가") && unit <= isHangul("힣")) {
      const first =
        ((unit - (unit % 28)) / 28 - (((unit - (unit % 28)) / 28) % 21)) / 21;
      const third = unit % 28;
      console.log(word,first,Cho[first])
      return Cho[first];
    }
  }
  return validateHangul(string);
}

export function checkKor(str) {
  const regExp = /[ㄱ-하-ㅣ가-힣]/g;
  if (regExp.test(str)) {
    return true;
  } else {
    return false;
  }
}

export function checkEng(str) {
  const regExp = /[a-zA-z]/g;
  if (regExp.test(str)) {
    return true;
  } else {
    return false;
  }
}
