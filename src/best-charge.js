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
  for(item of itemsList){
    for(promotionItem of promotions.items){
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
  for(item of itemsList){
    tempAmount += item.subtotal; 
  }
  amount = tempAmount - reduce;
  let tempObject = [{itemsList:itemsList},{type:type},{reduce:reduce},{amount:amount}];
  return tempObject;
}
/**
 * 4.计算价格方式一(amountInPromotion1)
    in:orderItems,promotions{type: String, items: [String, String]}
    out:receipt1{orderItems:[name:String, count:number, subtotal:number,promotion:String,reduce:number,amount:number]}
5.计算价格方式二(amountInPromotion2)
    in:orderItems,promotions{type: String, items: [String, String]}
    out:receipt2{orderItems:[name:String, count:number, subtotal:number,promotion:String,reduce:number,amount:number]}
6.查找最佳优惠方式(findBestPromotion)
    in：receipt1,receipt2
    out:receiptToPrint
 */

module.exports = {bestCharge, turnIntoIdAndCount, completeOrder, calculateSubtotal,amountInPromotion1, amountInPromotion2};