function restart(){
    window.location.href = "/";
}

function main() {
    let username = localStorage["tetris.username"];
    localStorage.removeItem("tetris.username");
    localStorage.removeItem("tetris.score");
    let table = document.getElementById("tbody");
    let scores = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage[key];
        scores.push(
            { 
                login: key, 
                score: parseInt(value) 
            }
        );
    }
    scores.sort(
        (a, b) => {
            return b.score - a.score;
        }
    );

    console.log(scores);

    for (let i = 0; i < 10 && i < scores.length; ++i){
        let row = document.createElement("tr");
        let login_cell = document.createElement("td");
        let score_cell = document.createElement("td");
        login_cell.textContent = scores[i].login;
        score_cell.textContent = scores[i].score;
        row.appendChild(login_cell);
        row.appendChild(score_cell);
        table.appendChild(row);
    }
    localStorage["tetris.username"] = username;
}

main();