/**
 * 定义存储列表数据相关的数据结构
 */
export default class MyDataStore{

    constructor(){
      this.clear();
    }
  
    clear(){
      this.datas={};//原始数据
      this.keys=[];//每行的Key
      this.currentIndex=0;//当前页号
    }
  
    pushData(key,value){
      this.datas[key]=value;
      this.keys.push(key);
    }
  
    getData(key){
      return this.datas[key];
    }
  
    addPageIndex(){
      this.currentIndex++;
    }
  }

