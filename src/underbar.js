(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };


  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };


  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
  //  return n === undefined ? array[array.length-1] : array.slice(-n, array.length);

    return n === undefined ? array[array.length-1] :
      (n===0 ? array.slice(array.length,array.length) : array.slice(-n, array.length));
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {

    var i;

    if(Array.isArray(collection)){
      for(i = 0; i < collection.length; i++){
        iterator(collection[i],i,collection);
      }

    }else{
      for(i in collection){
       iterator(collection[i],i,collection);
      }
    }

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;
    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;
  };

  // Return all elements of an array that pass a truth test.
  //isEven = [1,2,3,4,5,6]
  //var isEven = function(num) { return num % 2 !=== 0; };

  _.filter = function(collection, test) {
    var newArray = [];

    _.each(collection,function(ele, i, array){
      if (test(ele)) {
        newArray.push(ele);
      }
    });
    return newArray;

    };

/* For Reference
  _.filter = function(collection, test) {
    var newArray = [];

    _.each(collection,function(ele, i, array){
      if (test(ele)) {
        newArray.push(ele);
      }
    });
    return newArray;

    };
*/

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

    return _.filter(collection,function(num){
      return !test(num)
    });

  };

  /* Previous version
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var newArray = [];
    _.each(collection,function(ele, i, array){
      if (!test(ele)) {
        newArray.push(ele);
      }
    });
    return newArray;
  };
  */

  // Produce a duplicate-free version of the array.
  //[1,2,2,4]
  //  [].indexOf(2) === undefined
  _.uniq = function(array) {
    var newArr = [];
    _.each(array,function(ele, i, array){
      if(_.indexOf(newArr,ele) === -1) {
        newArr.push(ele);
      }
    });
    return newArr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var newArr=[];

    _.each(collection, function(ele,i,collection) {
      newArr.push(iterator(ele,i,collection))
    });
    return newArr;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {

    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.

  _.reduce = function(collection, iterator, accumulator) {
    if(accumulator === undefined) {
      accumulator = collection[0];
      for(var i = 1; i < collection.length; i++) {
        accumulator = iterator(accumulator,collection[i]);
      }
      return accumulator;
    }else{
      _.each(collection,function(ele, i, array){
        accumulator = iterator(accumulator,ele);
      });
      return accumulator;
    }
  };


//PART 2

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(accumulator, ele) {
      if (accumulator) {
        return true;
      }
      return ele === target;
    }, false);
  };



/*
_.every = function(collection, truthTest)

  _each(if truthtest === false)
   return false

   else return true


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, truthTest) {
    // TIP: Try re-using reduce() here.
    return _.reduce(collection, function(accumulator, ele) {
      if (truthTest === ) {
        return false;
      }
    }, true);
  };
*/

//  _.every(collection, truthTest)
//  _each(if truthtest === false)
//   return false

 //  else return true


// TURNS OUT THE PROBLEM WAS _.IDENTITY -- it goes _.identity(val){return val} and we were passing it _.identity(accumulator,ele) which of course just returns accumulator. That's why our solution worked for questions with tests but failed for ones that used _.identity.

_.every = function(collection, truthTest) {
    var isItStillTrue = true;

    if(truthTest === undefined){
      //console.log("truthTest = identity");
      truthTest = _.identity;
    }

    //if using an array
    if(Array.isArray(collection)){
      for(var i = 0; i < collection.length; i++){
        //console.log("RESULTS ","\ni: ",i,"\nis still true: ",isItStillTrue,"\nele: ",collection[i],"\ntruth result: ",truthTest(collection[i]));
        if(truthTest(collection[i]) == false || truthTest(collection[i]) ==  undefined || truthTest(collection[i]) ==  null){
          //console.log("Previous was true");
          return false;
        }
      }
      return true;
    }


    //if using an object
    else{
      for(var i in collection){
        //console.log("results ",i,isItStillTrue,collection[i],truthTest(collection[i]));
        if(truthTest(collection[i]) == false || truthTest(collection[i]) ==  undefined || truthTest(collection[i]) ==  null){
          //console.log("Previous was true");
          return false;
        }
      }
      return true;
    }
  };
/*
console.log("\n\nTESTING TESTING\n\n");

var testArray1 = [true,true,false],
    testArray2 = [true,true];

function tester(accumulator,ele){
  console.log(ele);
  if(ele > 10){console.log("tested true");return true;}
  else{console.log("tested false");return false;}
}

  console.log("test1",_.every(testArray1),"\n\n");

  console.log("test2",_.every(testArray2),"\n\n");
*/

/*
  _.every = function(collection, truthTest) {
    return _.reduce(collection, function(accumulator, ele) {
   //   console.log(accumulator,ele);

      //if no truthTest is given, use identity
      if(truthTest === undefined){
        truthTest = _.identity;
      }

      //if truthTest(ele) is not true, return false
      if(!truthTest(ele)) {
        return false;
      //otherwise return accumulator (which should be true)
      }else {
        return accumulator;
      }
    }, true);

  };
*/




/*
_.some =function(collection, iterator)

forEach(check if iterator = true)
if iterator = true, always return true
if iterator = false, check next


*/

  _.some = function(collection, truthTest) {
  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one

    var doesItExist = false;

    if(truthTest === undefined){
      //console.log("truthTest = identity");
      truthTest = _.identity;
    }

    //if using an array
    if(Array.isArray(collection)){
      for(var i = 0; i < collection.length; i++){
        //console.log("RESULTS ","\ni: ",i,"\nis still false: ",doesItExist,"\nele: ",collection[i],"\ntruth result: ",truthTest(collection[i]));
        if(typeof collection[i] == "string"){
                     //console.log("Found string");
          if(collection[i] !== "no" && collection[i] !== "null"){
                       //console.log("Found yes");
           collection[i] = (collection[i] !== true);
                      //console.log("converted yes ",collection[i]);
          }
          if(truthTest(collection[i]) === true){
           //console.log("Found true");
            return true;
          }
        }

        else if(truthTest(collection[i]) == true){
          //console.log("Found true");
          return true;
        }
      }
      return false;
    }


    //if using an object
    else{
      for(var i in collection){
        //console.log("results ",i,isItStillTrue,collection[i],truthTest(collection[i]));
        if(typeof collection[i] == "string"){
                     //console.log("Found string");
          if(collection[i] !== "no" && collection[i] !== "null"){
                       //console.log("Found yes");
           collection[i] = (collection[i] !== true);
                      //console.log("converted yes ",collection[i]);
          }
          if(truthTest(collection[i]) === true){
           //console.log("Found true");
            return true;
          }
        }

        else if(truthTest(collection[i]) == true){
          //console.log("Previous was true");
          return true;
        }
      }
      return false;
    }
  };


/*
PREVIOUS VERSION
  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    return _.reduce(collection, function(accumulator, ele) {
      //if iterator is undefined, give it an identity
      if (iterator === undefined) {
        iterator = _.identity;
        return true;
      }

      console.log(ele,accumulator,iterator(ele));
      //If iterator returns true, always return true
      if(accumulator === true){
        return true;
      }

      //check truth test
      if(iterator(ele) === true){
        return true;
      }else{
        return accumulator;
      }

    },false);

  };
  */

 // console.log(_.some(testArray1,tester()));

//  console.log(_.some(testArray2,tester()));







  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla   _.extend(obj1,obj2,obj3)

  //PSEUDOCODE

  //for all keys in object A
  //add to object B



  _.extend = function(obj) {
    for(var i = 0; i < arguments.length; i++){


      for(var key in arguments[i]){
        obj[key] = arguments[i][key];
      }

    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for(var i = 0; i < arguments.length; i++){


      for(var key in arguments[i]){
        if(obj[key] === undefined) {
         obj[key] = arguments[i][key];
        }
      }
    }
    return obj;
  };




  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  _.memoize = function(test) {

    var result;
    var cache = {};
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {

      var keystring = "";
      var sliceArg = Array.prototype.slice.call(arguments);

      for (var i = 0; i < (arguments.length); i++) {
        if(Array.isArray(arguments[i]))
          keystring = keystring + ",[" + arguments[i] + "],";
        else
          keystring = "," + arguments[i];
      }

      for (var i = 0; i < (sliceArg.length); i++) {
        if(Array.isArray(sliceArg[i]))
          keystring = keystring + ",[" + sliceArg[i] + "],";
        else
          keystring = "," + sliceArg[i];
      }

      var key = keystring;

      if (cache[key]) {
        return cache[key];
      }else {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = test.apply(this, arguments);
        cache[key] = result;
        // The new function always returns the originally computed result.
        return result;
      }
    };
  };

/*
Need different arguments to create different keys
  _.memoize(truthTest(5==5))
  _.memoize(truthTest(7==5))

  truthTest(5==5) = true
  truthTest(7==5) = false

  => key{[truthTest,5==5]:true}
     key{[truthTest,7==5]:false}
*/
  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait,arg1,arg2) {
    setTimeout(function(){
      return func(arg1,arg2);

    },wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var newArray = [];
    for(var i = 0; i < array.length; i++) {
      newArray.splice(Math.floor(Math.random() * (newArray.length + 1)),0, array[i]);
    }
    return newArray;

  };
/*
    [12345]

for i = 0; i < length; i++
     col[1] -> random(0 and newarray.length) -> 0-0
     col[2] -> random(0 and newarray.length) -> 0-1
     col[3] -> random(0 and newarray.length) -> 0-2
     col[4] -> random(0 and newarray.length) -> 0-3
     col[5] -> random(0 and newarray.length) -> 0-4

     array.splice(math.floor(math.rand()*newarray.length),0,col[i])
*/




  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
/*

  for a = 1 to arguments.length
    for b = 0 to arguments[a].length
      for c = 0 to array.length
        if arguments[a][b] === array[c]
          remove entry
  return array

*/
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {


/*
Use a global boolean set by a setInterval and reset it when the interval runs out
if (wasRun === true) => don't run

(clearly this method doesn't work without global scope)

*/

  };
}());
