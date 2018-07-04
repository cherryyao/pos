'use strict';

//TODO: 请在该文件中实现练习要求并删除此注释
let sum = 0;
let save = 0;


//main function
function printReceipt(tags){
    const buyedItem = getItemNum(tags);
    const itemDetails=ItemDetails(buyedItem,loadAllItems());
    Promotion(itemDetails, loadPromotions());
      let str = print(itemDetails);
      console.log(str);
}


//1.计算商品个数
function getItemNum(tags){
    const item={};//空集合
    const buyedItems=[];

    for(let i=0;i<tags.length;i++){

      if(tags[i].indexOf("-")>0){
      //含有-的情况
      let sp = tags[i].split("-");
        if(item.hasOwnProperty(sp[0])){
           item[sp[0]]= item[sp[0]]+parseFloat(sp[1]);
       }else{
         item[sp[0]]=parseFloat(sp[1]);
       }

      }else{
      //不含-的普通情况
      if(item.hasOwnProperty(tags[i])){
       item[tags[i]]=item[tags[i]]+1;
      }else
      {
        item[tags[i]]=1;
      }
      }
    }
    for (let n in item){
       buyedItems.push({"barcode":n,"count":item[n]})
    }
    return buyedItems;
}


//2.获得商品的详细信息
function ItemDetails(buyedItems,allItems){
     const itemDetails =[];
     for(let item of buyedItems){
        for(let i = 0;i<allItems.length;i++){
          if(allItems[i].barcode==item.barcode){
            itemDetails.push({
              name:allItems[i].name,
              barcode:allItems[i].barcode,
              count:item.count,
              price:allItems[i].price,
              unit:allItems[i].unit,
              littlePrice:item.count * parseFloat(allItems[i].price)
            });
            break;
          }
        }

     }
     return itemDetails;
}

//3.计算商品优惠活动

//function Promotion(itemDetails,buyTweGetOneFree){
//
//    const barcodes=buyTweGetOneFree[0].barcodes;
//    for(let item of itemDetails){
//      for(let i =0 ;i<barcodes.length;i++){
//        if(item.count%2==0){
//          save += item.price;
//          item.littlePrice -= item.price;
//        }
//        break;
//      }
//       sum += item.littlePrice;
//    }
//}
function Promotion(itemDetails, buyTweGetOneFree) {
  const barcodes = buyTweGetOneFree[0].barcodes;
  for (let item of itemDetails) {
    for (let i = 0; i < barcodes.length; i++) {
      if (item.barcode === barcodes[i]) {
        if (item.count / 2 > 0) {
          save += item.price;
          item.littlePrice -= (item.price);
        }
        break;
      }
    }
    sum += item.littlePrice;
  }
}

//4.打印
function print(itemDetails) {
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


