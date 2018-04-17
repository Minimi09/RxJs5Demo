import { Observable, Observer } from "rxjs";


let source = Observable.fromEvent(document,'mousemove')
.map((event:MouseEvent) => {
       return { x : event.clientX, y : event.clientY}   
     }).filter(element => {
         return element.x>50;
     });

source.subscribe(
    value => {
        console.log(`valueX: ${value.x} valueY: ${value.y} `);
    },  
    error => {
        console.log(`Error: ${error}`);
    },
    () => {
        console.log('Complete');
    }
);