import Playoff from './classes/Playoff.js'
import PlayoffPrinter from './classes/PlayoffPrinter.js';


// "shuffle" para arrays (devuelve copia barajada)
////////////////////////
Array.prototype.myOwnStyleOfShuffleReturningCopy = function() //Por practicar map y devolver una copia barajada del array 
{
    var miArrayAux = this.map(x=>x); 

    miArrayAux.push('tempItem'); //Agrego un elemento al final del array para usarlo como elemento temporal para intercambios. Se borra al final con 'slice'
    for (var i = 0; i<miArrayAux.length-1; ++i){
        var j = Math.floor(Math.random() * i); //'j' es una posición al azar, para hacer el intercambio con 'i' (si j==i, entonces no hay intercambio efectivo)
        
        //Intercambio
        miArrayAux[miArrayAux.length-1] = miArrayAux[i]; 
        miArrayAux[i] = miArrayAux[j]; 
        miArrayAux[j] = miArrayAux[miArrayAux.length-1]; 
    }
    
    return miArrayAux.slice(0, miArrayAux.length-1); //Devuelvo copia del array con todos los elementos menos el último
}



// Crear el array y barajarlo
/////////////////////////////
var teamsNames = new Array(
        'Alemania','Argentina','Australia','Brasil','Chile','China','Croacia','Egipto',
        'Escocia','Francia','Inglaterra','Italia','Mexico','Portugal','Rusia','Suecia'
    ).myOwnStyleOfShuffleReturningCopy(); 



// Formar el "macro-objeto" Playoff y ordenarle que juegue todas las rondas
//////////////////////////////
var myRoundOf16 = new Playoff(teamsNames); 
myRoundOf16.playFullPlayoff(); 



// Mostrar lo sucedido
//////////////////////////////
var myPlayoffPrinter = new PlayoffPrinter(); 
myPlayoffPrinter.showByConsole(myRoundOf16); 

