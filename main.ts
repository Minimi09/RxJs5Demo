import { Observable, Observer } from "rxjs";
import { onErrorResumeNextStatic } from "rxjs/operators/onErrorResumeNext";


let output = document.getElementById('output');

let button = document.getElementById('pasaron');
let button2 = document.getElementById('max');
let button3 = document.getElementById('buscar');
let inputNumberTwo = <HTMLInputElement> document.getElementById('letra');
       

let click = Observable.fromEvent(button,'click');
let click2= Observable.fromEvent(button2,'click');
let click3 = Observable.fromEvent(button3,'click');

function load (url:string)
{
    return Observable.create(observer => {

        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load',() => {
            if (xhr.status === 200){
                 let jsonCalificaciones = JSON.parse(xhr.responseText);
                 observer.next(jsonCalificaciones);
                 observer.complete();
                }
            else{observer.error(xhr.statusText);}
        });
 
        xhr.open('GET',url);
        xhr.send(); 
       
    });
}



function render(jsonCalificaciones){

        jsonCalificaciones.forEach(element => {
        let div = document.createElement('div');
        div.innerText= `Nombre : ${element.name} ` ;
        output.appendChild(div);                  
          });

}

click.subscribe(
    value => {
            load('calificaciones.json')
            .subscribe(
            value => {Observable.from(value).filter((x:any) => x.calificacion > 60).toArray()
                .subscribe(
                        value2 => {
                            render(value2)
                        })   
             },
            error => {console.log(`Error : ${error}`)},
            () => {}
        )    },
    error => {
        console.log(`Error: ${error}`);
    },
    () => {
        console.log('Complete');
    }
);



click2.subscribe(
    value => {
            load('calificaciones.json').subscribe(
                value2 => {
                    Observable.from(value2).max(value2.calificacion).subscribe(
                    value3 => {
                        console.log(`${value3}`);}
                )}
            )


             },
    error => {
        console.log(`Error: ${error}`);
    },
    () => {
        console.log('Complete');
    }
);
/*
click3.subscribe(
    value => {
        load('calificaciones.json')
        .subscribe(
        value1 => {Observable.from(value1).max()
            .subscribe(
                    value2 => {
                     //   console.log(`${value2.name} - ${value2.calificacion}`)
                    })   
         },
        error => {console.log(`Error : ${error}`)},
        () => {}
    )    },
error => {
    console.log(`Error: ${error}`);
},
() => {
    console.log('Complete');
}


);*/