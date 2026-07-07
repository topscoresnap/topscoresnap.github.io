let data = [];


fetch("data.json")
.then(response => response.json())
.then(json => {

data = json;

showTable(data);

showTop(data);

});



function showTable(list){

let html = "";


list.forEach(user => {


html += `

<tr>

<td>${user.rank}</td>


<td>

<a href="player.html?user=${user.username}">

${user.username}

</a>

</td>


<td>${user.score}</td>


</tr>

`;

});


document.getElementById("table").innerHTML = html;

}




function showTop(list){


let html = "";


list.slice(0,3).forEach(user => {


html += `

<div class="card">

<h2>#${user.rank}</h2>

<p>

<a href="player.html?user=${user.username}">

${user.username}

</a>

</p>


<strong>${user.score}</strong>


</div>

`;


});


document.getElementById("top").innerHTML = html;


}




let searchBox = document.getElementById("search");


if(searchBox){


searchBox.addEventListener("input",function(){


let value = this.value.toLowerCase();


let result = data.filter(user =>

user.username.toLowerCase().includes(value)

);


showTable(result);


});


}
