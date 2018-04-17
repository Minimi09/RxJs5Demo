import {Observable, Observer} from "rxjs";

let number=[6,9,10,15];
let source = Observable.create((obvs) =>{
        
        let index=0;
        let produceValue= () =>
        {
            obvs.next(number[index++])

            if(index < number.length)
            {
                setTimeout(() => {produceValue();
                },2000);

            }
            else{
                obvs.complete();
            }

        }


        /*if(element === 10){
            obvs.error('Sale biie <3');
        }*/
        
    produceValue();
  
}).map(x => x*2).filter(x => x>10);

source.subscribe(
    value => {
        console.log(`value: ${value}`);
    },
    error => {
        console.log(`Error: ${error}`);
    },
    () => {
        console.log('Complete');
    }
);
