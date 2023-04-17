/*
浅拷贝是创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。
如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，
所以如果其中一个对象改变了这个地址，就会影响到另一个对象。


深拷贝是将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,
且修改新对象不会影响原对象。

浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。
但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象。
*/


function deepClone(obj, hash = new WeakMap()) {
    if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
    if (typeof obj !== "object") return obj;
    // 是对象的话就要进行深拷贝
    if (hash.get(obj)) return hash.get(obj);
    let cloneObj = new obj.constructor();
    // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
    hash.set(obj, cloneObj);
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 实现一个递归拷贝
        cloneObj[key] = deepClone(obj[key], hash);
      }
    }
    return cloneObj;
  }
  let obj = { name: 1, address: { x: 100 } };
  obj.o = obj; // 对象存在循环引用的情况
  let d = deepClone(obj);
  obj.address.x = 200;
  console.log(d);

// function Deepclone(obj,hash=new WeakMap()){
//     if(obj===null || obj===undefined) return obj;
//     if(obj instanceof Date) return new Date(obj);
//     if(obj instanceof RegExp) return new RegExp(obj);
//     if(typeof obj !== 'object') return obj;
//     if(hash.get(obj)) return hash.get(obj);
//     let cloneObj = new obj.constructor();
//     hash.set(obj,cloneObj);
//     for(let key in obj){
//         if(obj.hasOwnProperty(key)){
//             cloneObj[key] = Deepclone(obj[key],hash)
//         }
//     }
//     return cloneObj
// }
  
