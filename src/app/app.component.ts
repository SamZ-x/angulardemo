import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newMemberName = "";
  members:string[] = [];
  errorMessage = '';
  teamNumber:number | string = "";
  teams: string[][] = [];

  onNameInput(member: string){
    this.newMemberName=member;
  }

  onTeamInput(teamNum: string)
  {
    this.teamNumber=Number(teamNum);
  };

  addMember() {
    if(!this.newMemberName){
      this.errorMessage = "Name can't be empty";
      return;
    }  

    this.members.push(this.newMemberName);
    this.newMemberName='';
    this.errorMessage='';
  };

  generateTeams(){
    //initialize
    this.teams = [];
    this.errorMessage='';
    
    // conditional check
    // team number check
    if(!this.teamNumber || this.teamNumber <= 0)
    {
      this.errorMessage = "Invaild team number";
      return;
    }

    // name exists and number of name no less than team number
    if(this.members.length < this.teamNumber){
      this.errorMessage = "Not enough members";
      return;
    }
    
    //copy the whole original array
    const allMembers = [...this.members];
    //select member randomly
    while(allMembers.length)
    {
      for(let i = 0; i < this.teamNumber; i++)
      {
        const rndIndex=Math.floor(Math.random()*allMembers.length);
        const member = allMembers.splice(rndIndex, 1)[0];
        
        //avoid the 'undefined' push to array
        if(!member)break;

        if(this.teams[i])
        {
          this.teams[i].push(member);
        }
        else
        {
          this.teams[i] = [member];
        }
      }
    }

    this.teamNumber = ""
  };
}
