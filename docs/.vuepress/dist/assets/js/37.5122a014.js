(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{307:function(t,n,e){"use strict";e.r(n);var o=e(14),s=Object(o.a)({},(function(){var t=this,n=t._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("p",[n("img",{attrs:{src:"https://fengqichang666.github.io/images/prototype_chain.jpg",alt:"原型链图"}})]),t._v(" "),n("p",[t._v("构造函数,原型和实例的关系:")]),t._v(" "),n("blockquote",[n("p",[t._v("每个构造函数(constructor)都有一个原型对象(prototype),原型对象都包含一个指向构造函数的指针,而实例(instance)都包含一个指向原型对象的内部指针.")])]),t._v(" "),n("blockquote",[n("p",[t._v("如果试图引用对象(实例instance)的某个属性,会首先在对象内部寻找该属性,直至找不到,然后才在该对象的原型(instance.prototype)里去找这个属性.")])]),t._v(" "),n("h3",{attrs:{id:"原型链继承"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#原型链继承"}},[t._v("#")]),t._v(" 原型链继承")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("问题1：原型中包含的引用类型属性将被所有实例共享；\n问题2：子类在实例化的时候不能给父类构造函数传参；\nfunction Animal() {\n    this.colors = ['black', 'white']\n}\nAnimal.prototype.getColor = function() {\n    return this.colors\n}\nfunction Dog() {}\nDog.prototype =  new Animal()\n\nlet dog1 = new Dog()\ndog1.colors.push('brown')\nlet dog2 = new Dog()\nconsole.log(dog2.colors)  // ['black', 'white', 'brown']\n\n")])])]),n("h3",{attrs:{id:"借用构造函数实现继承"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#借用构造函数实现继承"}},[t._v("#")]),t._v(" 借用构造函数实现继承")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("//父类：人\n    function Person () {\n      this.head = '脑袋瓜子';\n      this.emotion = ['喜', '怒', '哀', '乐']; //人都有喜怒哀乐\n      this.eat = function () {\n        console.log('吃吃喝喝');\n      }\n      this.sleep = function () {\n        console.log('睡觉');\n      }\n      this.run = function () {\n        console.log('快跑');\n      }\n    }\n    //子类：学生，继承了“人”这个类\n    function Student(studentID) {\n      this.studentID = studentID;\n      Person.call(this);\n    }\n    \n    //Student.prototype = new Person();\n\n    var stu1 = new Student(1001);\n    console.log(stu1.emotion); //['喜', '怒', '哀', '乐']\n\n    stu1.emotion.push('愁');\n    console.log(stu1.emotion); //[\"喜\", \"怒\", \"哀\", \"乐\", \"愁\"]\n    们通过借用构造函数继承，保证了 stu1 和 stu2 都有各自的父类属性副本，从而使得各自 emotion 互不影响。但同时带来的问题是，stu1 和 stu2 都拷贝了 Person 类中的所有属性和方法，而在 Person 类中，像 eat ( ), sleep ( ), run ( ) 这类方法应该是公用的，而不需要添加到每个实例上去，增大内存，尤其是这类方法较多的时候。\n    \n    var stu2 = new Student(1002);\n    console.log(stu2.emotion); //[\"喜\", \"怒\", \"哀\", \"乐\"]\n")])])]),n("h3",{attrs:{id:"组合继承-结合使用两种继承模式"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#组合继承-结合使用两种继承模式"}},[t._v("#")]),t._v(" 组合继承（结合使用两种继承模式）")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("方法挂载到父类的原型对象上去，实现方法复用，然后子类通过原型链继承\n//父类：人\n    function Person () {\n      this.head = '脑袋瓜子';\n      this.emotion = ['喜', '怒', '哀', '乐']; //人都有喜怒哀乐\n    }\n    //将 Person 类中需共享的方法放到 prototype 中，实现复用\n    Person.prototype.eat = function () {\n      console.log('吃吃喝喝');\n    }\n    Person.prototype.sleep = function () {\n      console.log('睡觉');\n    }\n    Person.prototype.run = function () {\n      console.log('快跑');\n    }\n    //子类：学生，继承了“人”这个类\n    function Student(studentID) {\n      this.studentID = studentID;\n      Person.call(this);\n    }\n    \n    Student.prototype = new Person();  //此时 Student.prototype 中的 constructor 被重写了，会导致 stu1.constructor === Person\n    Student.prototype.constructor = Student;  //将 Student 原型对象的 constructor 指针重新指向 Student 本身\n\n    var stu1 = new Student(1001);\n    console.log(stu1.emotion); //['喜', '怒', '哀', '乐']\n\n    stu1.emotion.push('愁');\n    console.log(stu1.emotion); //[\"喜\", \"怒\", \"哀\", \"乐\", \"愁\"]\n    \n    var stu2 = new Student(1002);\n    console.log(stu2.emotion); //[\"喜\", \"怒\", \"哀\", \"乐\"]\n\n    stu1.eat(); //吃吃喝喝\n    stu2.run(); //快跑\n    console.log(stu1.constructor);  //Student\n    \n    首先，我们将 Person 类中需要复用的方法提取到 Person.prototype 中，然后设置 Student 的原型对象为 Person 类的一个实例，这样 stu1 就能访问到 Person 原型对象上的属性和方法了。其次，为保证 stu1 和 stu2 拥有各自的父类属性副本，我们在 Student 构造函数中，还是使用了 Person.call ( this ) 方法。如此，结合原型链继承和借用构造函数继承，就完美地解决了之前这二者各自表现出来的缺点。\n")])])]),n("h3",{attrs:{id:"寄生式组合继承"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#寄生式组合继承"}},[t._v("#")]),t._v(" 寄生式组合继承")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("function Parent (name) {\n    this.name = name;\n    this.colors = ['red', 'blue', 'green'];\n}\n\nParent.prototype.getName = function () {\n    console.log(this.name)\n}\n\nfunction Child (name, age) {\n    Parent.call(this, name);\n    this.age = age;\n}\n\nfunction object(o) {\n    function F() {}\n    F.prototype = o;\n    return new F();\n    // 通过构造一个介于 Parent 与 Child 之间的对象，并使该对象的 prototype 属性指向 Parent 的 prototype对象，\n    // 来避开通过调用 Parent 构造函数的方式来产生一个 prototype 指向Parent prototype对象的对象。\n}\n\nfunction prototype(child, parent) {\n// 不直接child.prototype=parent.prototype呢？\n// 原因 : 当我们想给 Child 的prototype里面添加共享属性或者方法时，如果其 prototype 指向的是 Parent 的 prototype，那么在 Child 的 prototype 里添加的属性和方法也会反映在 Parent 的 prototype 里面，\n// 这明显是不合理的，这样做的后果是当我们只想使用 Parent 时，也能看见 Child 往里面扔的方法和属性。\n// 所以需要每个构造函数都需要持有自己专用的prototype对象\n    var prototype = object(parent.prototype);\n    prototype.constructor = child;\n    child.prototype = prototype;\n}\n\nprototype(Child, Parent);\n\nvar child1 = new Child('kevin', '18');\n\nconsole.log(child1);\n")])])]),n("h3",{attrs:{id:"class-实现继承"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#class-实现继承"}},[t._v("#")]),t._v(" class 实现继承")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("class Animal {\n    constructor(name) {\n        this.name = name\n    } \n    getName() {\n        return this.name\n    }\n}\nclass Dog extends Animal {\n    constructor(name, age) {\n        super(name)\n        this.age = age\n    }\n}\n")])])]),n("h3",{attrs:{id:"确定原型和实例的关系"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#确定原型和实例的关系"}},[t._v("#")]),t._v(" 确定原型和实例的关系")]),t._v(" "),n("blockquote",[n("p",[t._v("第一种是使用 "),n("strong",[t._v("instanceof")]),t._v(" 操作符, 只要用这个操作符来测试实例(instance)与原型链中出现过的构造函数,结果就会返回")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("var d = new Date();\nd instanceof Date;//=>true  d是Date的实例\nd instanceof Object;//=>true 所有对象都是Object的实例\n")])])]),n("p",[t._v("第二种是使用 "),n("strong",[t._v("isPrototypeOf()")]),t._v(" 方法, 同样只要是原型链中出现过的原型,isPrototypeOf() 方法就会返回true,")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("var d = new Date();\nDate.prototype.isPrototypeOf(d);//=>true\nObject.prototype.isPrototypeOf(d);//=>true\n")])])])])])}),[],!1,null,null,null);n.default=s.exports}}]);