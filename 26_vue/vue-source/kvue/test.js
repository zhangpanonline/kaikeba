function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
  this.getName = function() {
    console.log(this.name)
  };

  this.getMessage = function() {
    console.log(this.message)
  };
}

new MyObject('name', 'message')

class Obj {

}
Obj.prototype.getName = function() {
  console.log(1)
}
console.log((new Obj).getName())

