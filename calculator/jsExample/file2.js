 let msg = "Hello World";

 let fun = (name) =>
{
    console.log(`Hello World! My Name Is : ${name}`);
    return name;
}

 class test{
    constructor(){
        console.log("Exporting Constructor");
    }
}

//all varibles can be export in this way or can be used before variable name
// eport let msg = "Hello World"   <-- just like this
export { msg, fun, test };