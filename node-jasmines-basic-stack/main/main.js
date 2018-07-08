'use strict';
const { loadAllItems, loadPromotions }
  = require('../spec/fixtures');
//TODO: 请在该文件中实现练习要求并删除此注释
let sum = 0;
let save = 0;


//main function
function printReceipt(tags) {
  const formattedBarcodes = formatBarcodes(tags);
  const buyedItem = CountBuyedItems(formattedBarcodes);
  const itemDetails = ItemDetails(buyedItem, loadAllItems());
  CalPromotion(itemDetails, loadPromotions());
  let str = formatReceipt(itemDetails);
  console.log(str);
}



//格式化barcode
function formatBarcodes(tags){
  let formatBarcodes=[];
  let tempArray=[];
  
  tags.map(tag=>{
    let barcodeObject={
      barcode:tag,
      count:1
    }
    if(tag.indexOf("-")!==-1){
      tempArray=tag.split("-");   
     barcodeObject={
      barcode:tempArray[0],
      count:parseFloat(tempArray[1])
    }
  }
  formatBarcodes.push(barcodeObject);
  });
  return formatBarcodes;
}

//计算商品数量
function CountBuyedItems(formatBarcodes){
  //console.info(formatBarcodes)
  let buyedItems=[];
  formatBarcodes.map(formattedBarcode=>{
    let exitCartItem=null;
    buyedItems.map(cartItem=>{
      if(cartItem.barcode=== formattedBarcode.barcode){
        exitCartItem=cartItem;
       }
    });
    if(exitCartItem !=null){
      exitCartItem.count+=formattedBarcode.count;
    }else{
     buyedItems.push({...formattedBarcode});
     console.info(buyedItems);
    }
  });
  return buyedItems;
}


//2.获得商品的详细信息
function ItemDetails(buyedItems, allItems) {
  const itemDetails = [];
  buyedItems.map(item=>{   
    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i].barcode == item.barcode) {
        itemDetails.push({
          name: allItems[i].name,
          barcode: allItems[i].barcode,
          count: item.count,
          price: allItems[i].price,
          unit: allItems[i].unit,
          littlePrice: item.count * parseFloat(allItems[i].price)
        });
        break;
      }
    }

  });
  return itemDetails;
}

//3.计算商品优惠活动

function CalPromotion(itemDetails, buyTweGetOneFree) {
  sum = 0;
  const barcodes = buyTweGetOneFree[0].barcodes;
  itemDetails.map(item=>{
    for (let i = 0; i < barcodes.length; i++) {
      if (item.barcode === barcodes[i]) {
        if (item.count / 2 > 0) {
          save += item.price;
          item.littlePrice -= item.price;
        }
        break;
      }
    }
    sum += item.littlePrice;

  });
  console.info(sum);
  return sum;

}

//4.打印
function formatReceipt(itemDetails) {
  let str = "***<没钱赚商店>收据***\n";
  // "名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)\n名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n----------------------\n总计：58.50(元)\n节省：7.50(元)\n**********************"
  for (let item of itemDetails) {
    let price = item.price.toFixed(2);
    let littlePrice = item.littlePrice.toFixed(2);
    str += "名称：" + item.name + "，数量：" + item.count + item.unit + "，单价：" + price + "(元)，小计：" + littlePrice + "(元)\n";
  }
  str += "----------------------\n总计：" + sum.toFixed(2) + "(元)\n节省：" + save.toFixed(2) + "(元)\n**********************";
  return str;
}

module.exports = {
  CalPromotion,
  ItemDetails,
  printReceipt,
  CountBuyedItems,
  formatBarcodes
}
