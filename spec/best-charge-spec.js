//const {bestCharge} = require('../src/best-charge');

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
  const expected = '[{"name":"黄焖鸡","price":18},{"name":"肉夹馍","price":6},{"name":"凉皮","price":8}]';
  const summary = completeOrder(selectedItems1);
  it('should exchange the input', ()=> {
    expect(JSON.stringify(summary)).toEqual(expected);
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