import NationalFootballTeam from './NationalFootballTeam.js'

export default class NationalFootballTeam_InPlayoffStage extends NationalFootballTeam {

    //Methods
    constructor(name, membersCount) { 
        super(name, membersCount); 
        this.roundsWon = 0; 
        this.rivals = []; 
        this.totalGoalsFor = 0; 
    }

}


