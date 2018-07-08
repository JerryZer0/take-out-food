const {loadAllItems} = require('./items');
const {loadPromotions} = require('./promotions');

function bestCharge(selectedItems) {
  let idAndCount = turnIntoIdAndCount(selectedItems);
  const allItems = loadAllItems();
  const orderItems = completeCharge();
  return receiptToPrint;
}

//格式化输入为id和数量
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

//完善订单的信息
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

//计算订单中商品的小计
function calculateSubtotal(orderItems){
  let ItemsList = [];
  for(let item of orderItems){
    item.subtotal = item.count*item.price;
    ItemsList.push(item);
  }
  return ItemsList;
}

//计算价格方式一、
function amountInPromotion1(itemsList){
  const temp = loadPromotions();
  const promotions = temp[1];
  let reduce = 0;
  let tempAmount = 0;
  let type = "指定菜品半价(";
  for(let item of itemsList){
    for(let promotionItem of promotions.items){
      if(item.id === promotionItem ){
        type += item.name;
        reduce += item.price/2;
        type += ",";
        break;
      }
    }
    tempAmount += item.subtotal; 
  }
  type = type.substring(0,type.length-1);
  type += ")";
  amount = tempAmount - reduce;
  let tempObject = [{itemsList:itemsList},{type:type},{reduce:reduce},{amount:amount}];
  return tempObject;
}

//计算价格方式二
function amountInPromotion2(itemsList){
  let tempAmount = 0;
  let type = "满30减6元";
  let reduce = 6;
  for(let item of itemsList){
    tempAmount += item.subtotal; 
  }
  amount = tempAmount - reduce;
  let tempObject = [{itemsList:itemsList},{type:type},{reduce:reduce},{amount:amount}];
  return tempObject;
}

function noPromotion(itemsList){
  let tempAmount = 0;
  let type = "";
  let reduce = 0;
  for(let item of itemsList){
    tempAmount += item.subtotal; 
  }
  amount = tempAmount;
  let tempObject = [{itemsList:itemsList},{type:type},{reduce:reduce},{amount:amount}];
  return tempObject;
}

function findBestCharge(receiptObject1,receiptObject2){
  let reduce1 = receiptObject1[2].reduce;
  let reduce2 = receiptObject2[2].reduce;
  let promotion;
  if(reduce1 === reduce2 || reduce1 > reduce2){
    promotion = 'type1';
  }else{
    promotion = 'type2';
  }
  return promotion;
}

//生成清单
function generateReceipt(receiptObject){
  let itemsList = receiptObject[0].itemsList;
  let type = receiptObject[1].type;
  let reduce = receiptObject[2].reduce;
  let amount = receiptObject[3].amount;
  
  let str = "";
  for(let item of itemsList){
    str += `${item.name} x ${item.count} = ${item.subtotal}元\n`
  }
  let promotion ="";
  if(reduce>0){
    promotion = `使用优惠:
${type}，省${reduce}元
-----------------------------------
`
  }
  let receiptToString = `============= 订餐明细 =============
${str}-----------------------------------
${promotion}总计：${amount}元
===================================`;
  return receiptToString;
}



module.exports = {bestCharge, turnIntoIdAndCount, completeOrder, calculateSubtotal,amountInPromotion1, amountInPromotion2, generateReceipt, noPromotion, findBestCharge};