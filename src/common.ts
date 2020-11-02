
// const createDivFlexRowHTML = (cellStyle) => {
//   const divElement = document.createElement("div");
//   divElement.style.display = "flex"
//   divElement.style.flexDirection = "row"
//   return divElement
// }
declare global {
  interface Window { roamFinance: any; }
}
window.roamFinance = window.roamFinance || {};


export const createDivElem = (cellStyle: Record<string, string>) => {
  const divElement = document.createElement("div")
  if(cellStyle){
    Object.entries(cellStyle).forEach(([key, value]) => {
      (<any>divElement.style)[key] = value
    })
  }
  // divElement.setAttribute('style', JSON.stringify(cellStyle))

  return divElement
}

export const addTextToElem = (text: string, elem: HTMLElement) => {
    const textNode = document.createTextNode(text);
    elem.appendChild(textNode)
}

export const addChildToElem = (parentElem: HTMLElement, childElem: HTMLElement) => {
    parentElem.appendChild(childElem)
}