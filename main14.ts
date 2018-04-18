import { Observable, Observer } from "rxjs";
import { onErrorResumeNextStatic } from "rxjs/operators/onErrorResumeNext";

let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button,'click');

function load (url:string)
{
    return Observable.create(observer => {

        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load',() => {
            if (xhr.status === 200){
                 let jsonStarWars = JSON.parse(xhr.responseText);
                 observer.next(jsonStarWars);
                 observer.complete();
                }
            else{observer.error(xhr.statusText);}
        });
 
        xhr.open('GET',url);
        xhr.send();
       
        
        observer.error();
        observer.complete();
    });
}



function renderStarWars(jsonStarWars){

        jsonStarWars.forEach(element => {
        let div = document.createElement('div');
        div.innerText= `${element.category} -  ${element.name}` ;
        output.appendChild(div);                  
          });

}


/*
click.flatmap(x => 
load('starwars.json')).subscribe(
            value => {renderStarWars(value)}, 
            error => {console.log(`Error : ${error}`);},
                                 )
*/
click.subscribe(
    value => {
        load('starwars.json').subscribe(
            value => {renderStarWars(value)},
            error => {console.log(`Error : ${error}`);},
            () => {}
        )
    },
    error => {
        console.log(`Error: ${error}`);
    },
    () => {
        console.log('Complete');
    }
);