import Playoff from './Playoff.js'

export default class PlayoffPrinter{ 
    constructor(playoffObj){
        this.playoffObj = playoffObj; 
        this.roundsHeaders=[' == OCTAVOS DE FINAL ==', ' == CUARTOS DE FINAL ==', ' == SEMIFINALES ==', ' == CONSOLACIÓN ==', ' == FINAL ==']; 
    }

    showByConsole(playoffObj){
        // console.log('============================='); 
        // console.log('=== EQUIPOS PARTICIPANTES ==='); 
        // console.log('============================='); 
        // playoffObj.competitors.forEach( item=>{ console.log( item.name )  }); 

        console.log('=========================================='); 
        console.log('=== INICIO de la FASE DE ELIMINATORIAS ==='); 
        console.log('=========================================='); 
        let roundIndex = 0; 
        for (let round of playoffObj.roundsResults){
            console.log('\n' + this.roundsHeaders[roundIndex]); 
            for (let match of round)
                console.log(match.homeTeamName, match.homeTeamGoals +'-'+ match.awayTeamGoals, match.awayTeamName, ' ===> ' + match.winnerName); 
            roundIndex++; 
        }

        // Funcional, en vez de iterativo: 
        // console.log('\n=================='); 
        // console.log('=== RESULTADOS ==='); 
        // console.log('=================='); 
        // playoffObj.roundsResults.forEach ( round=>{ 
        //                                         round.forEach(x=>console.log(x.homeTeamName, x.homeTeamGoals, '-', x.awayTeamGoals, x.awayTeamName)); 
        //                                         console.log('\n\n'); 
        //                                     }); 

        // Mostrar CAMPEÓN 
        let rivals = playoffObj.competitors[ playoffObj.competitors.findIndex( item => (item.name == playoffObj.champion.name) ) ].rivals; 
        const reducer = (accu, curr) => accu += ' ' + curr; 
        console.log('\n==================================='); 
        console.log('==> CAMPEÓN DEL MUNDO:', playoffObj.champion.name); 
        console.log('Eliminando a:\n' + rivals.reduce(reducer)); 
        console.log('==================================='); 
    }
} 
