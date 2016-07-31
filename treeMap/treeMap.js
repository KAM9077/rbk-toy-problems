/**
  *
  * Implement a `map` method on this Tree class.
  *
  * Map accepts a mapping function as its only argument. It traverses the tree,
  * passing each node's value into the mapping function, and generates a new
  * tree containing the results.
  *
  * So `map` should return a tree with the same structure, and different values,
  * but it should NOT modify the tree that was passed in.
  *
  * Example:
  *   var root1 = new Tree(1);
  *   var branch2 = root1.addChild(2);
  *   var branch3 = root1.addChild(3);
  *   var leaf4 = branch2.addChild(4);
  *   var leaf5 = branch2.addChild(5);
  *   var leaf6 = branch3.addChild(6);
  *   var leaf7 = branch3.addChild(7);
  *   var newTree = root1.map(function (value) {
  *     return value * 2;
  *   })
  *  newTree.value // 2
  *  newTree.children[0].value // 4
  *  newTree.children[1].value // 6
  *  newTree.children[0].children[1].value // 10
  *  newTree.children[1].children[1].value // 14
  *  root1.value // still 1
  *
  *
  * Extra credit: Consider another method, `mapInPlace`, which DOES modify
  * the original tree instead of generating a new one. Why would you want to use this
  * method instead of `map`?
  *
  */

/*
 * Basic tree that stores a value.
*/

var Tree = function(value){
  this.value = value;
  this.children = [];
};

var fatherFunction = function(modifyOrNot, callback , tree){
  if(!modifyOrNot){
    var instance = JSON.stringify(tree);
    instance = JSON.parse(tree);
  } else {
    var instance = tree;
  }
   findValues = function(node){

    if(node.value){
      // array.push(node.value);
      node.value = callback(node.value);
    }
    for(var i = 0; i < node.children.length;  i++){
      // we want to check first if this node has children so
      node.children[i].value = callback(node.children[i].value);
      if(node.children[i].children.length !== 0){
       return findValues(node.children[i]);
      }
    }
  }
  findValues(instance);
  return instance;
}
// I PROMISE THE MAP WAS WORKING BEFORE YOU CAN JUST UNCOMMENT THE CODE

Tree.prototype.map = function (callback) {
  // return a new tree with the same structure as `this`, with values generated by the callback
  // this is definetely not a proper way to do it , but it serves the spot
  var tree = fatherFunction(false, callback , this);
  // var tree = JSON.stringify(this);
  // tree = JSON.parse(tree);
  // findValues = function(node){

  //   if(node.value){
  //     // array.push(node.value);
  //     node.value = callback(node.value);
  //   }
  //   for(var i = 0; i < node.children.length;  i++){
  //     // we want to check first if this node has children so
  //     node.children[i].value = callback(node.children[i].value);
  //     if(node.children[i].children.length !== 0){
  //      return findValues(node.children[i]);
  //     }
  //   }
  // }
  // findValues(tree);
  return tree;
};


Tree.prototype.mapInPlace = function (callback) {
  //update the values of the existing tree with values generated by the callback
  // there must be a simpler way to not DRY
  fatherFunction(true,callback,this);
  // findValues = function(node){
  //   if(node.value){
  //     // array.push(node.value);
  //     node.value = callback(node.value);
  //   }
  //   for(var i = 0; i < node.children.length;  i++){
  //     // we want to check first if this node has children so
  //     node.children[i].value = callback(node.children[i].value);
  //     if(node.children[i].children.length !== 0){
  //      return findValues(node.children[i]);
  //     }
  //   }
  // }
  // findValues(this);

  return this;

};

/**
 * You shouldn't need to change anything below here, but feel free to look.
  */

/**
  * add an immediate child
  * (wrap values in Tree nodes if they're not already)
  */
Tree.prototype.addChild = function(child){
  if (!child || !(child instanceof Tree)){
    child = new Tree(child);
  }

  if(!this.isDescendant(child)){
    this.children.push(child);
  }else {
    throw new Error("That child is already a child of this tree");
  }
  // return the new child node for convenience
  return child;
};

/**
  * check to see if the provided tree is already a child of this
  * tree __or any of its sub trees__
  */
Tree.prototype.isDescendant = function(child){
  if(this.children.indexOf(child) !== -1){
    // `child` is an immediate child of this tree
    return true;
  }else{
    for(var i = 0; i < this.children.length; i++){
      if(this.children[i].isDescendant(child)){
        // `child` is descendant of this tree
        return true;
      }
    }
    return false;
  }
};

/**
  * remove an immediate child
  */
Tree.prototype.removeChild = function(child){
  var index = this.children.indexOf(child);
  if(index !== -1){
    // remove the child
    this.children.splice(index,1);
  }else{
    throw new Error("That node is not an immediate child of this tree");
  }
};
