const MIN_MEMBERS_COUNT = 11; 
const MAX_MEMBERS_COUNT = 23; 

export default class NationalFootballTeam { 
    
    //Methods: 
    constructor(name, membersCount=MAX_MEMBERS_COUNT) {
        this.name = name; 
        this.membersCount = membersCount; 

        //Por practicar el IF: 
        if ( membersCount < this.MIN_MEMBERS_COUNT ) 
            membersCount=this.MIN_MEMBERS_COUNT; 
        else if ( membersCount > this.MAX_MEMBERS_COUNT ) 
            membersCount = this.MAX_MEMBERS_COUNT; 
    }

}
