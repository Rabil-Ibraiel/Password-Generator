const form = document.getElementById("form");
const length = document.getElementById("range");
const lengthNUM = document.getElementById("rangenum");
const btn = document.getElementById("btn");
const lower = document.getElementById("lower");
const upper = document.getElementById("upper");
const num = document.getElementById("num");
const sym = document.getElementById("sym");
const passGen = document.getElementById('passGen');
const icon = document.getElementById('icon')



randomFunc = {
  lower: getLower,
  upper: getUpper,
  num: getNumber,
  sym: getSymbol,
};


length.addEventListener("change", (e) => {
  lengthNUM.innerHTML = e.target.value;
});

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const lengthF = +length.value;
  const haslower = lower.checked;
  const hasupper = upper.checked;
  const hasnum = num.checked;
  const hassym = sym.checked;
  passGen.innerText = generatePassword(haslower, hasupper, hasnum, hassym, lengthF);
});



function generatePassword(lower, upper, num, sym, length) {
  const typeCount = lower + upper + num + sym;
  let generatedPassword = "";
  const typeArr = [{ lower }, { upper }, { num }, { sym }].filter(
    (item) => Object.values(item)[0]
  );

  if (typeCount === 0) {
    generatedPassword = 'Password'
  }else {
    for (let i = 0; i < length; i += typeCount) {
        typeArr.forEach((item) => {
          const funcName = Object.keys(item)[0];
          //   console.log(funcName);
          generatedPassword += randomFunc[funcName]();
        });
      }
    
      icon.addEventListener('click', async() => {
        await navigator.clipboard.writeText(generatedPassword);
        const copied = await navigator.clipboard.readText();
        console.log(copied)
      })

  }
  return generatedPassword
}

function getUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getSymbol() {
  return String.fromCharCode(Math.floor(Math.random() * 12) + 35);
}
