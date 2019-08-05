function shuffle(arr) {//数组乱序
    let m = arr.length;
    while (m){
        let index = Math.floor(Math.random() * m--);
        let cur = arr[m];
        arr[m] = arr[index];
        arr[index] = cur;
    }
    return arr;
}


// 简单的节流函数 懒加载优化用
//fun 要执行的函数
//delay 延迟
//time  在time时间内必须执行一次
function throttle(fun, delay, time) {
    var timeout,
        startTime = new Date();
    return function() {
        var context = this,
            args = arguments,
            curTime = new Date();
        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        if (curTime - startTime >= time) {
            fun.apply(context, args);
            startTime = curTime;
            // 没达到触发间隔，重新设定定时器
        } else {
            timeout = setTimeout(fun, delay);
        }
    };
};
// 实际想绑定在 scroll 事件上的 handler
function lazyload(event) {}
// 采用了节流函数
window.addEventListener('scroll',throttle(lazyload,500,1000));


//es5实现迭代器
//es6中的生成器generator函数会返回一个迭代器
function createIterator(items) {
    var i = 0;
    return {
        next: function() {
            var done = (i >= items.length);
            var value = !done ? items[i++] : undefined;
            return {
                done: done,
                value: value
            };
        }
    };
}
var iterator = createIterator([1, 2, 3]);
console.log(iterator.next());


//deepClone
function deepCopy(p, c) {
    var c = c || {};
  
    for (var i in p ){// 这会有问题，如果是数组的话，遍历会有问题。所以要确定这个对象不是数组，数组的拷贝有很多种方式。
    // 另外还可能出现相互引用的对象导致死循环的情况
  
      var prop = p[i];// p.a = p的情况
      if(prop === c) {
        continue;
      }
      if(typeof p[i] === 'object') {
        c[i] = p[i].constructor == Array ? [] : {};
        deepCopy(p[i], c[i]);
      } else {
        c[i] = p[i];
      }
    }
    return c;
  }



//给一个字符串，找到里面重复最多的字符
function findMax(str) {
  var map = {},
    max = { num: 0 };

  for (var i in str) {
    if (map[str[i]]) {
      map[str[i]]++;
    } else {
      map[str[i]] = 1;
    }

    if (map[str[i]] > max.num) {
      max.num = map[str[i]];
      max.key = str[i];
    }
  }
  console.log(`max num is ${max.num}, and the key is ${max.key}`);
  // 打印出来所有值的重复次数
  for (var key in map) {
    console.log(`${key} copied is ${map[key]}`);
  }
}



//如何实现一下 Object.create()
// Object.create(parent)主要完成了三件事情：
// 创建一个对象
// 继承指定父对象
// 为新对象扩展新属性
Object.mycreate =  function (o) {
    var F = function () {};
    F.prototype = o;
    return new F();
};

