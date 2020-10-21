
// const createDivFlexRowHTML = (cellStyle) => {
//   const divElement = document.createElement("div");
//   divElement.style.display = "flex"
//   divElement.style.flexDirection = "row"
//   return divElement
// }

const createDivElem = (cellStyle) => {
  const divElement = document.createElement("div")
  if(cellStyle){
    Object.entries(cellStyle).forEach(([key, value]) => {
      divElement.style[key] = value
    })
  }
  return divElement
}

const addTextToElem = (text, elem) => {
    const textNode = document.createTextNode(text);
    elem.appendChild(textNode)
}

const addChildToElem = (parentElem, childElem) => {
    parentElem.appendChild(childElem)
}