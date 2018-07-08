const {bestCharge, turnIntoIdAndCount, completeOrder, calculateSubtotal,amountInPromotion1, amountInPromotion2, generateReceipt, findBestCharge} = require('../src/best-charge');

describe('格式化输入为id和数量', ()=> {
  const selectedItems1 = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
  const expected = '[{"id":"ITEM0001","count":"1"},{"id":"ITEM0013","count":"2"},{"id":"ITEM0022","count":"1"}]';
  const summary = turnIntoIdAndCount(selectedItems1);
  it('should exchange the input', ()=> {
    expect(JSON.stringify(summary)).toEqual(expected);
  })
})

describe('完善订单信息', ()=> {
  const selectedItems1 = [{"id":"ITEM0001","count":"1"},{"id":"ITEM0013","count":"2"},{"id":"ITEM0022","count":"1"}];
  const expected = '[{"id":"ITEM0001","name":"黄焖鸡","price":18,"count":"1"},{"id":"ITEM0013","name":"肉夹馍","price":6,"count":"2"},{"id":"ITEM0022","name":"凉皮","price":8,"count":"1"}]';
  const summary = completeOrder(selectedItems1);
  it('should complete the order', ()=> {
    expect(JSON.stringify(summary)).toEqual(expected);
  })
})

describe('计算商品小计', ()=> {
  const orderItems = [{"id":"ITEM0001","name":"黄焖鸡","price":18,"count":"1"},{"id":"ITEM0013","name":"肉夹馍","price":6,"count":"2"},{"id":"ITEM0022","name":"凉皮","price":8,"count":"1"}];
  const expected = '[{"id":"ITEM0001","name":"黄焖鸡","price":18,"count":"1","subtotal":18},{"id":"ITEM0013","name":"肉夹馍","price":6,"count":"2","subtotal":12},{"id":"ITEM0022","name":"凉皮","price":8,"count":"1","subtotal":8}]';
  const summary = calculateSubtotal(orderItems);
  it('should calculate the subtotal', ()=> {
    expect(JSON.stringify(summary)).toEqual(expected);
  })
})

describe('计算价格方式一', ()=> {
  const orderItems = [{"id":"ITEM0001","name":"黄焖鸡","price":18,"count":"1","subtotal":18},{"id":"ITEM0013","name":"肉夹馍","price":6,"count":"2","subtotal":12},{"id":"ITEM0022","name":"凉皮","price":8,"count":"1","subtotal":8}];
  const expected = '[{"itemsList":[{"id":"ITEM0001","name":"黄焖鸡","price":18,"count":"1","subtotal":18},{"id":"ITEM0013","name":"肉夹馍","price":6,"count":"2","subtotal":12},{"id":"ITEM0022","name":"凉皮","price":8,"count":"1","subtotal":8}]},{"type":"指定菜品半价(黄焖鸡,凉皮)"},{"reduce":13},{"amount":25}]';
  const summary = amountInPromotion1(orderItems);
  it('should calculate the subtotal', ()=> {
    expect(JSON.stringify(summary)).toEqual(expected);
  })
})

describe('计算价格方式二', ()=> {
  const orderItems = [{"id":"ITEM0013","name":"肉夹馍","price":6,"count":"4","subtotal":24},{"id":"ITEM0022","name":"凉皮","price":8,"count":"1","subtotal":8}];
  const expected = '[{"itemsList":[{"id":"ITEM0013","name":"肉夹馍","price":6,"count":"4","subtotal":24},{"id":"ITEM0022","name":"凉皮","price":8,"count":"1","subtotal":8}]},{"type":"满30减6元"},{"reduce":6},{"amount":26}]';
  const summary = amountInPromotion2(orderItems);
  it('should calculate the subtotal', ()=> {
    expect(JSON.stringify(summary)).toEqual(expected);
  })
})

describe('选择方式', ()=> {
  const receiptObject1 = [{"itemsList":[{"id":"ITEM0001","name":"黄焖鸡","price":18,"count":"1","subtotal":18},{"id":"ITEM0013","name":"肉夹馍","price":6,"count":"2","subtotal":12},{"id":"ITEM0022","name":"凉皮","price":8,"count":"1","subtotal":8}]},{"type":"指定菜品半价(黄焖鸡,凉皮)"},{"reduce":13},{"amount":25}];
  const receiptObject2 = [{"itemsList":[{"id":"ITEM0001","name":"黄焖鸡","price":18,"count":"1","subtotal":18},{"id":"ITEM0013","name":"肉夹馍","price":6,"count":"2","subtotal":12},{"id":"ITEM0022","name":"凉皮","price":8,"count":"1","subtotal":8}]},{"type":"满30减6元"},{"reduce":6},{"amount":32}];
  const expected = [{"itemsList":[{"id":"ITEM0001","name":"黄焖鸡","price":18,"count":"1","subtotal":18},{"id":"ITEM0013","name":"肉夹馍","price":6,"count":"2","subtotal":12},{"id":"ITEM0022","name":"凉皮","price":8,"count":"1","subtotal":8}]},{"type":"指定菜品半价(黄焖鸡,凉皮)"},{"reduce":13},{"amount":25}];
  const summary = findBestCharge(receiptObject1,receiptObject2);
  it('should calculate the subtotal', ()=> {
    expect(summary).toEqual(expected);
  })
})

describe('生成清单', ()=> {
  const orderItems = [{"itemsList":[{"id":"ITEM0001","name":"黄焖鸡","price":18,"count":"1","subtotal":18},{"id":"ITEM0013","name":"肉夹馍","price":6,"count":"2","subtotal":12},{"id":"ITEM0022","name":"凉皮","price":8,"count":"1","subtotal":8}]},{"type":"指定菜品半价(黄焖鸡,凉皮)"},{"reduce":13},{"amount":25}];
  const expected = '============= 订餐明细 =============\n黄焖鸡 x 1 = 18元\n肉夹馍 x 2 = 12元\n凉皮 x 1 = 8元\n-----------------------------------\n使用优惠:\n指定菜品半价(黄焖鸡,凉皮)，省13元\n-----------------------------------\n总计：25元\n===================================';
  const summary = generateReceipt(orderItems);
  it('should calculate the subtotal', ()=> {
    expect(summary).toEqual(expected);
  })
})


// describe('Take out food', ()=> {

//   it('should generate best charge when best is 指定菜品半价', ()=> {
//     let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
//     let summary = bestCharge(inputs).trim();
//     let expected = `
// ============= 订餐明细 =============
// 黄焖鸡 x 1 = 18元
// 肉夹馍 x 2 = 12元
// 凉皮 x 1 = 8元
// -----------------------------------
// 使用优惠:
// 指定菜品半价(黄焖鸡，凉皮)，省13元
// -----------------------------------
// 总计：25元
// ===================================`.trim()
//     expect(summary).toEqual(expected)
//   });

//   it('should generate best charge when best is 满30减6元', ()=> {
//     let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
//     let summary = bestCharge(inputs).trim();
//     let expected = `
// ============= 订餐明细 =============
// 肉夹馍 x 4 = 24元
// 凉皮 x 1 = 8元
// -----------------------------------
// 使用优惠:
// 满30减6元，省6元
// -----------------------------------
// 总计：26元
// ===================================`.trim()
//     expect(summary).toEqual(expected)
//   });

//   it('should generate best charge when no promotion can be used', ()=> {
//     let inputs = ["ITEM0013 x 4"];
//     let summary = bestCharge(inputs).trim();
//     let expected = `
// ============= 订餐明细 =============
// 肉夹馍 x 4 = 24元
// -----------------------------------
// 总计：24元
// ===================================`.trim()
//     expect(summary).toEqual(expected)
//   });

// });