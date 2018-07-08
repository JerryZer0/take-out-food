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

function generateReceipt(receiptObject){
  let itemsList = receiptObject[0].itemsList;
  let type = receiptObject[1].type;
  let reduce = receiptObject[2].reduce;
  let amount = receiptObject[3].amount;
  
  let str = "";
  for(let item of itemsList){
    str += `${item.name} x ${item.count} = ${item.subtotal}元\n`
  }
  let receiptToString = `============= 订餐明细 =============
${str}-----------------------------------
使用优惠:
${type}，省${reduce}元
-----------------------------------
总计：${amount}元
===================================`;
  return receiptToString;
}
/**
 * 黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
 * 
 * 6.查找最佳优惠方式(findBestPromotion)
    in：receipt1,receipt2
    out:receiptToPrint
 */

module.exports = {bestCharge, turnIntoIdAndCount, completeOrder, calculateSubtotal,amountInPromotion1, amountInPromotion2, generateReceipt};