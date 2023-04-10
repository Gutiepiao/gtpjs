/**
 * 模拟实现 new 操作符
 * @param  {Function} ctor [构造函数]
 * @return {Object|Function|Regex|Date|Error}      [返回结果]
 */
function newOperator(ctor){
    if(typeof ctor !== 'function'){
      throw 'newOperator function the first param must be a function';
    }
    // ES6 new.target 是指向构造函数
    newOperator.target = ctor;
    // 1.创建一个全新的对象，
    // 2.并且执行[[Prototype]]链接
    // 4.通过`new`创建的每个对象将最终被`[[Prototype]]`链接到这个函数的`prototype`对象上。
    var newObj = Object.create(ctor.prototype);
    // ES5 arguments转成数组 当然也可以用ES6 [...arguments], Aarry.from(arguments);
    // 除去ctor构造函数的其余参数
    var argsArr = [].slice.call(arguments, 1);
    // 3.生成的新对象会绑定到函数调用的`this`。
    // 获取到ctor函数返回结果
    var ctorReturnResult = ctor.apply(newObj, argsArr);
    // 小结4 中这些类型中合并起来只有Object和Function两种类型 typeof null 也是'object'所以要不等于null，排除null
    var isObject = typeof ctorReturnResult === 'object' && ctorReturnResult !== null;
    var isFunction = typeof ctorReturnResult === 'function';
    if(isObject || isFunction){
        return ctorReturnResult;
    }
    // 5.如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，那么`new`表达式中的函数调用会自动返回这个新的对象。
    return newObj;
}

function newfn(constrFn){
    let obj = Object.create(constrFn.prototype);
    console.log('constrFn.prototype:',constrFn.prototype)
    let args = [...arguments].slice(1);
   
    let constrFn_res = constrFn.apply(obj,args);
   
    var isObject  = typeof constrFn_res === 'object' && constrFn_res !== null;
    var isFunction = typeof constrFn_res === 'function';
    if(isObject || isFunction){
        return constrFn_res
    }
    return obj
}
// class gtpfn {
//     constructor(name) {
//         this.name = name;
//     }
// }
function gtpfn(name){
    return {
        name
    }
}
let aa = newfn(gtpfn,'gtp')
console.log(aa.__proto__ === gtpfn.prototype)

function newfn1(fn){
    let obj = Object.create(fn.prototype)
    let args = [...arguments].slice(1);
    // constructor函数的返回值
    let custructor_res = fn.apply(obj,[...args]); 
    let isobj = typeof custructor_res === 'objec' || typeof custructor_res !== null
    let isfunction = typeof custructor_res === 'function'
    if(isobj || isfunction){
        return custructor_res
    }else{
        return obj
    }
   
}


