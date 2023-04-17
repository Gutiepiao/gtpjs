/*
在 JS 中，根据词法作用域的规则,内部函数总是可以访问其外部函数中声明的变量。
当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束了。
但是内部函数引用外部函数的变量依然保存在内存中，就把这些变量的集合称为闭包。

一个函数，里面有一些变量和另一个函数
外部函数里面的函数使用了外部函数的变量
外部函数最后把它里面的那个函数用return抛出去

在函数外部可以读取函数内部的变量
让这些变量的值始终保持在内存 
*/
var result = [];
var a = 3;
var total = 0;

function foo(a) {
    for (var i = 0; i < 3; i++) {
        result[i] = function () {
            total += i * a;
            console.log(total);
        }
    }
    var i=0
    result[i] = (function(i){
        return function(){
            total+=i*a;
            console.log(total);
        }
    })(i) 
    var i=1
    result[i] = (function(i){
        return function(){
            total+=i*a;
            console.log(total);
        }
    })(i) 
    var i=2
    result[i] = (function(i){
        return function(){
            total+=i*a;
            console.log(total);
        }
    })(i) 
    var i=3
}

foo(1);

result[0]();
result[1]();  
result[2]();