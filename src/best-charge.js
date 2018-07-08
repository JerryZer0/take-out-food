const {loadAllItems} = require('./items');

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
          id : item.id,
          name : item.name,
          price : item.price,
          count : orderItem.count
        }
      }
    }
    orderItems.push(orderItem);
  }
  return orderItems;
}

function calculateSubtotal(orderItems){
  let ItemsList = [];
  for(let item of orderItems){
    item.subtotal = item.count*item.price;
    ItemsList.push(item);
  }
  return ItemsList;
}



module.exports = {bestCharge, turnIntoIdAndCount, completeOrder, calculateSubtotal};