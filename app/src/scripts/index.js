function main(){
    console.log(localStorage["tetris.username"]);
    let score = document.getElementById("score");
    let level = document.getElementById("level");
    let lable = document.getElementById("lable");

    let controller = new Controller(score, level, lable);
}

main();