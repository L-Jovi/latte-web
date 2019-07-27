import { sayHello } from './greet';


function hello(compiler: string) {
  console.log(`Hello from ${compiler}`);
}

hello("TypeScript");
console.log(sayHello("TypeScript from module"));


// browser side code
function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);
}

showHello("greeting", "Update TypeScript from module in browser.");
