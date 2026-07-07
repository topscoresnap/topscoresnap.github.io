let players = [];


fetch("data.json")
.then(response => response.json())
.then(data => {

players = data;

displayTop();
displayTable(players);


});





function displayTop(){

let top = document.getElementById("top");

top.innerHTML="";


players.slice(0,3).forEach((player,index)=>{


top.innerHTML += `

<div class="player-card">

<h1>#${index+1}</h1>

<h3>${player.username}</h3>

<p class="score">
${player.score}
</p>

<p>
Snap Score
</p>

</div>

`;


});


}






function displayTable(list){


let table=document.getElementById("table");

table.innerHTML="";


list.forEach((player,index)=>{


table.innerHTML += `


<tr>


<td>
${index+1}
</td>


<td>
${player.username}
</td>



<td class="score">
${player.score}
</td>



</tr>


`;


});


}






document.getElementById("search").addEventListener("input",function(){


let value=this.value.toLowerCase();


let result=players.filter(player=>

player.username.toLowerCase().includes(value)

);



displayTable(result);



});
