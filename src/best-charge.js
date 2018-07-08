//const {loadAllItems} = require('./items');

function bestCharge(selectedItems) {
  let idAndCount = turnIntoIdAndCount(selectedItems);
  const allItems = loadAllItems();
  const orderItems = completeCharge();
  return receiptToPrint;
}

function turnIntoIdAndCount(selectedItems){
  let idAndCount = [];
  for(let item of selectedItems){
    let tempArray = item.split(" x ");
    idAndCount.push({
      id : tempArray[0],
      count : tempArray[1]
    })
  }
  return idAndCount;
}

function completeOrder(idAndCount){
  const allItems = loadAllItems();
  let orderItems = [];
  for(let orderItem of idAndCount){
    for(let item of allItems){
      if(orderItem.id === item.id){
        orderItem={
          name : item.name,
          price : item.price
        }
      }
    }
    orderItems.push(orderItem);
  }
  return orderItems;
}





//module.export = {bestCharge};