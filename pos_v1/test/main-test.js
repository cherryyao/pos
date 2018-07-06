'use strict';

describe('pos', () => {//集成测试
  it('should print text', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    spyOn(console, 'log');

    printReceipt(tags);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});

describe('pos', () => {
  it('  BuyedItem()  testing ', () => {
   const tags = [
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000003-2.5',
        'ITEM000005',
        'ITEM000005-2',
      ];
      const expectText =`[{"barcode":"ITEM000001","count":5},{"barcode":"ITEM000003","count":2.5},{"barcode":"ITEM000005","count":3}]`;
      const  buyedItems= BuyedItem(tags);
//     console.info(JSON.stringify(buyedItems));
//     console.info(expectText);
      expect(JSON.stringify(buyedItems)).toEqual(expectText);

  });
});

describe('pos', () => {
  it('  ItemDetails() testing ', () => {
   const tags = [
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000003-2.5',
        'ITEM000005',
        'ITEM000005-2',
      ];
      const expectText =`[{"name":"雪碧","barcode":"ITEM000001","count":5,"price":3,"unit":"瓶","littlePrice":15},{"name":"荔枝","barcode":"ITEM000003","count":2.5,"price":15,"unit":"斤","littlePrice":37.5},{"name":"方便面","barcode":"ITEM000005","count":3,"price":4.5,"unit":"袋","littlePrice":13.5}]`;
      const buyedItems=BuyedItem(tags);
      const  itemDetails= ItemDetails(buyedItems,loadAllItems());

      expect(JSON.stringify(itemDetails)).toEqual(expectText);

  });
});

describe('pos', () => {
  it('  Promotion() testing ', () => {
   const tags = [
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000003-2.5',
        'ITEM000005',
        'ITEM000005-2',
      ];
      const expectText =`58.5`;
      const buyedItems=BuyedItem(tags);
      const  itemDetails= ItemDetails(buyedItems,loadAllItems());

      const promot= Promotion(itemDetails,loadPromotions());

      expect(JSON.stringify(promot)).toEqual(expectText);


  });
});


