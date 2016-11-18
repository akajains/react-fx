import {Observable,Observer} from "rxjs";                   //importing everything 

//import {Observable} from "rxjs/Observable"                //importing just observable, less size of application


let numbers = [1,5,10];
let source = Observable.from(numbers);                      //creating a observable from an array. 

let source2 = Observable.create(observer=>{                 //lower level API
    for(let n of numbers){
        if(n===5){
            observer.error("something went wrong!");        // this will end the observer and exit out 
        }
        observer.next(n);
    }
    observer.complete();
});

let source3 = Observable.create(observer=>{                 //A observable can deliver the stream of data asyncronously  
    let index = 0;
    let produceValue = ()=>{
        observer.next(numbers[index++]);

        if(index<numbers.length){
            setTimeout(produceValue,2000);
        }
        else{
            observer.complete();
        }
    }
   produceValue();
}).map(v=>v*2)



// can also implement observer  interface i.e 
//class MyObserver implements Observer<number>

class MyObserver {                                          //A observer needs three methods: next, error and complete
    next(value){
        console.log(value);
    }

    error(e){
        console.log(e);
    }

    complete(){                                              // Not all data source complete, like mouse click events
        console.log("complete");
    }

}

source.subscribe(new MyObserver() );

source3.subscribe(
    value=>console.log(value),
    e=>console.log(e),
    ()=>console.log("complete from Observer.Asyncronous")
);

source2.subscribe(
    value=>console.log(value),
    e=>console.log(e),
    ()=>console.log("complete from Observer.create lower level api")
);
//alternative way to subscribe without defining classes.
source.subscribe(
    value=>console.log(value),
    e=>console.log(e),
    ()=>console.log("complete from other method")
);