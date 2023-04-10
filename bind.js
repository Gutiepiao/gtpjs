/*
1、bind是Function原型链中的Function.prototype的一个属性，它是一个函数，修改this指向，合并参数传递给原函数，返回值是一个新的函数。
2、bind返回的函数可以通过new调用，这时提供的this的参数被忽略，指向了new生成的全新对象。内部模拟实现了new操作符。
3、es5-shim源码模拟实现bind时用Function实现了length。
*/


Function.prototype.bindFn = function bind(thisArg){
    // 判读调用bindfn 是函数
   
    if(typeof this !== 'function'){
        throw new TypeError(this + 'must be a function')
    }
    // 获取调用者
    var self = this;
    // 获取除第一个意外的参数
    var args = [...arguments].slice(1);
    console.log('111args',args)
    // 定义返回的函数 bind执行 返回一个函数
    var bound = function(){
        // bound 得函数的参数
        var boundArgs = [...arguments];
        console.log('222args',boundArgs)
        // 原来参数 拼接 bound 函数的参数
        var finalArgs = args.concat(boundArgs);
        // 判断bound的原型 是否在 bound调用的this的原型链上  即 new 调用
        console.log('333args',finalArgs)
    
        if(this instanceof bound){
            // self可能是ES6的箭头函数，没有prototype，所以就没必要再指向做prototype操作。
            
            if(self.prototype){
                // function Empty(){};
                // Empty.prototype = self.prototype;
                // bound.prototype = new Empty();
                bound.prototype = Object.create(self.prototype)

            }
            var result = self.apply(this,finalArgs);
            console.log('2:::::',result)
            var isObject = typeof result === 'object' && result !== null;
            var isFunction = typeof result === 'function';
            if(isObject || isFunction){
                return result
            }
            return this
        }else{
            let result = self.apply(thisArg,finalArgs)
            console.log('3::::',result)
            return result
        }
    }
    return bound;  
}
function fn1(args){
    console.log('args:::',args)
    this.args = args
    console.log(this)
}   


var self = {name:'gtp'}
var insfn = fn1.bindFn(self,'ddd')
// insfn()
var res = new insfn('ccc')


