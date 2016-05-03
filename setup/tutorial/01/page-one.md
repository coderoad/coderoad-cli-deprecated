## Add & Subtract
Writing basic functions.

A function has inputs and outputs. The inputs we call "parameters" and wrap them in `(` brackets `)`.

The output is `return`ed from the function.

```
                    // input
function doSomething(parameter) {
  // output
  return parameter;
}
```

Try making your own basic functions.

+ write a function `addOne` that adds one to a number
@test('01/01')
@hint('return the parameter + 1')
@hint('second hint')
@action(open('page-01.js'))
@action(set(
```
// addOne
function addOne(x) {
  return ::>
}
```  
))

+ write a function `subtractOne` that subtracts one from a number
@test('01/02')
@hint('return the parameter - 1')
@action(insert(
```

// subtractOne
function subtractOne(x) {
  return ::>
}
```  
))

@onPageComplete('Continue to learn more about multiply & divide')
