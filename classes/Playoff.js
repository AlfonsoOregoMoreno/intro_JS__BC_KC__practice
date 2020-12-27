import NationalFootballTeam_InPlayoffStage from './NationalFootballTeam_InPlayoffStage.js'

export default class Playoff{ 
    HOME_ROLE_INDEX = 0; 
    AWAY_ROLE_INDEX = 1; 
    TEAMS_COUNT_PER_MATCH = 2; 
    MAX_GOALS_IN_A_MATCH = 10; 
    SPECIAL_ROUND_INDEX = 3; 

    competitors=[]; 
    roundsResults=[]; 
    champion={}; 


    constructor (competitorsNamesArray){ 
        //Lleno el array 'competitors' con objetos 'NatFootTeam_Playoff'
        competitorsNamesArray.forEach( team=>{ this.competitors.push( new NationalFootballTeam_InPlayoffStage(team) ) } ); 
    }


    playOneRoundRecursively(teamsStillDidNotPlay, teamsPassNextRound, oneRoundResults){
        //OJO!! if ( !teamsStillDidNotPlay ) return; //El que podría ser Caso Base Principal (por venir vacío el Array) no puede darse porque no llamaremos erróneamente al método en esta práctica

        // Calcular resultado y actualizar datos de los equipos enfrentados
        let resultObj = this.calculateResultForThisMatch(teamsStillDidNotPlay[this.HOME_ROLE_INDEX], teamsStillDidNotPlay[this.AWAY_ROLE_INDEX]);         
        if (resultObj.homeTeamGoals > resultObj.awayTeamGoals){
            teamsPassNextRound.push( teamsStillDidNotPlay[this.HOME_ROLE_INDEX] ); 
            this.competitors[ this.competitors.findIndex( item => (item.name == teamsStillDidNotPlay[this.HOME_ROLE_INDEX].name)) ].roundsWon++; 
            resultObj.winnerName = teamsStillDidNotPlay[this.HOME_ROLE_INDEX].name; 
            resultObj.loserName = teamsStillDidNotPlay[this.AWAY_ROLE_INDEX].name; 
        }
        else {
            teamsPassNextRound.push( teamsStillDidNotPlay[this.AWAY_ROLE_INDEX] ); 
            this.competitors[ this.competitors.findIndex( item => (item.name == teamsStillDidNotPlay[this.AWAY_ROLE_INDEX].name)) ].roundsWon++; 
            resultObj.winnerName = teamsStillDidNotPlay[this.AWAY_ROLE_INDEX].name;
            resultObj.loserName = teamsStillDidNotPlay[this.HOME_ROLE_INDEX].name;  
        }
        this.competitors[ this.competitors.findIndex( item => (item.name == teamsStillDidNotPlay[this.HOME_ROLE_INDEX].name)) ].totalGoalsFor += resultObj.homeTeamGoals; 
        this.competitors[ this.competitors.findIndex( item => (item.name == teamsStillDidNotPlay[this.AWAY_ROLE_INDEX].name)) ].totalGoalsFor += resultObj.awayTeamGoals; 
        this.competitors[ this.competitors.findIndex( item => (item.name == teamsStillDidNotPlay[this.HOME_ROLE_INDEX].name)) ].rivals.push(teamsStillDidNotPlay[this.AWAY_ROLE_INDEX].name); 
        this.competitors[ this.competitors.findIndex( item => (item.name == teamsStillDidNotPlay[this.AWAY_ROLE_INDEX].name)) ].rivals.push(teamsStillDidNotPlay[this.HOME_ROLE_INDEX].name); 
        oneRoundResults.push(resultObj); 

        if ( teamsStillDidNotPlay.length == this.TEAMS_COUNT_PER_MATCH ) return; //Caso Base: si solo quedaban 2 equipos, como los acabo de procesar, no más llamadas recursivas
        
        //Si estamos aqui es pq quedan partidos por jugar en esta ronda del playoff. Hago llamada recursiva quitando el partido disputado
        let restOfTeamsDidNotPlay = teamsStillDidNotPlay.slice(this.TEAMS_COUNT_PER_MATCH); 
        this.playOneRoundRecursively(restOfTeamsDidNotPlay, teamsPassNextRound, oneRoundResults); 
    }


    getLoserSemifinal(semifinalNumber){
        let nameToFind = this.roundsResults[this.SPECIAL_ROUND_INDEX-1][semifinalNumber-1].loserName;
        return this.competitors[ this.competitors.findIndex( item => ( item.name == nameToFind ) ) ]; 
    }


    playFullPlayoff(){
        var initArray = this.competitors.map(x=>x); 
        var qualified = []; 
        var oneRoundResults = []; 
        var currentRoundIndex = 0; 

        // Disputar rondas mientras haya equipos sin eliminar
        do { 
            if (currentRoundIndex == this.SPECIAL_ROUND_INDEX){
                let initArrayForSpecialRound = []; 
                let qualified=[]; 
                initArrayForSpecialRound.push( this.getLoserSemifinal(1) ); 
                initArrayForSpecialRound.push( this.getLoserSemifinal(2) ); 
                this.playOneRoundRecursively(initArrayForSpecialRound, qualified, oneRoundResults); 
            }    
            else {
                this.playOneRoundRecursively(initArray, qualified, oneRoundResults); 
                initArray = qualified; 
                qualified=[];     
            }    
            
            this.roundsResults.push(oneRoundResults.map(x=>x)) ; 
            oneRoundResults=[]; 

            currentRoundIndex++; 
        } while ( initArray.length >= this.TEAMS_COUNT_PER_MATCH )

        Object.assign(this.champion, initArray[0]); //Aprovecho que me puedo guardar al campeón
    } 


    randomGoals(){
        return Math.floor(Math.random() * (this.MAX_GOALS_IN_A_MATCH+1));
    }
    

    calculateResultForThisMatch(teamWithHomeRole, teamWithAwayRole){
        do {
            var teamWithHomeRoleGoals = this.randomGoals(); //Math.floor(Math.random() * (this.MAX_GOALS_IN_A_MATCH+1));
            var teamWithAwayRoleGoals = this.randomGoals(); //Math.floor(Math.random() * (this.MAX_GOALS_IN_A_MATCH+1)); 
        } while (teamWithHomeRoleGoals==teamWithAwayRoleGoals) //Recalcular goles mientras me salga empate

        return { 
            'homeTeamName': teamWithHomeRole.name, 
            'homeTeamGoals': teamWithHomeRoleGoals, 
            'awayTeamName': teamWithAwayRole.name, 
            'awayTeamGoals': teamWithAwayRoleGoals, 
            'winnerName': null, 
            'loserName': null
        }; 
    }

}
