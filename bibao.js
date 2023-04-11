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