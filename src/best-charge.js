//const {loadAllItems} = require('./items');

function bestCharge(selectedItems) {
  let receiptToPrint = "111";
  return receiptToPrint;
}

function turnInToIdAndCount(tags){
  let idAndCount = [];
  for(let item of tags){
    let tempArray = item.split(" x ");
    idAndCount.push({
      id : tempArray[0],
      count : tempArray[1]
    })
  }
  return idAndCount;
}







//module.export = {bestCharge};