let data = [];

fetch("data.json")
.then(response => response.json())
.then(json => {
    data = json;
    showTable(data);
    showTopThree(data);
});


function showTable(list){

    let html = "";

    list.forEach(user => {

        html += `
        <tr>
            <td>${user.rank}</td>
            <td>@${user.username}</td>
            <td>${user.score}</td>
        </tr>
        `;

    });

    document.getElementById("table").innerHTML = html;

}



function showTopThree(list){

    let html = "";

    list.slice(0,3).forEach((user,index)=>{

        html += `
        <div class="card">
            ${["🥇","🥈","🥉"][index]}
            <br><br>
            @${user.username}
            <br>
            ${user.score}
        </div>
        `;

    });


    document.getElementById("top").innerHTML = html;

}



document.getElementById("search").addEventListener("input", function(){

    let search = this.value.toLowerCase();

    let result = data.filter(user =>
        user.username.toLowerCase().includes(search)
    );


    showTable(result);

});
