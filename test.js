function F1(name, age) {
    this.name = name
    this.age = age
}

function S1() {}

S1.prototype = new F1('111', 12)

class F2 {}
class S2 extends F2 {}

function F3(age) {
    this.age = age
}

function S3() {
    F3.call(this, 1)
}
const s3 = new S3()
console.log(s3)

function F4(age) {
    this.age = age
}

function S4(age) {
    F4.call(this, age)
}
S4.prototype = new F4()
S4.prototype.constructor = S4