function playBttnClick(){
    let input = document.getElementById("input");
    if (!input.value.length){
        return;
    }
    localStorage["tetris.username"] = input.value;
    localStorage[input.value] = 0;
}