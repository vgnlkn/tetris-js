class Controller{
    constructor(score_lable, level_lable, label){
        this.score = 0;
        this.score_lable = score_lable;
        this.level_lable = level_lable;
        this.lable = label;
        this.level = 0;
        this.canvas = document.getElementById("stack");
        this.next_figure_canvas = document.getElementById("next-figure");
        this.field = new Field(this.canvas, 10, 20);
        this.next_figure = new Field(this.next_figure_canvas, 4, 4);
        this.figure_generator = new NextFigure(this.next_figure);
        // генерируем первую фигуру на канвасе
        let figure_params = this.figure_generator.generate(false);
        this.figure = new Figure(this.field, figure_params[0], figure_params[1], figure_params[2]);
        this.figure.moveTo(3, 0);
        this.figure.startMotion();

        this.next_figure_params = this.figure_generator.generate(true);

        document.addEventListener('keydown', (event) => this.processKey(event.key));

        this.start();   
    }

    processKey(key){
        let pos = this.figure.getPosition();
        switch(key){
            case "ArrowUp": {
                this.figure.rotate();
                break;
            }
            case "ArrowRight": {
                this.figure.moveTo(pos[0] + 1, pos[1]);
                break;
            }
            case "ArrowLeft": {
                this.figure.moveTo(pos[0] - 1, pos[1]);
                break;
            }
            case "ArrowDown": {
                this.figure.moveTo(pos[0], pos[1] + 1);
                break;
            }
            case "Escape": {
                break;
            }
            default: {
                break;
            }
        }
    }

    async start(){
        this.timer = setInterval(
            () => {
                if (this.figure.isStopped()){
                    this.figure = new Figure(
                        this.field, 
                        this.next_figure_params[0], 
                        this.next_figure_params[1], 
                        this.next_figure_params[2],
                        this.level
                    );
                    if (!this.figure.moveTo(3, 0)){
                        this.stop();
                    }
                    this.figure.startMotion();
                    this.next_figure_params = this.figure_generator.generate(true);
                    this.processField();
                }
            }, 
            10
        );
    }

    processField(){
        let deleted_rows_on_step = 0;
        for (let row=this.field.rows - 1; row >= 0; --row){
            let flag = 0;
            for (let col=0; col<this.field.cols; ++col){
                if (this.field.matrix[row][col]){
                    ++flag;
                }
                else{
                    break;
                }
            }
            if (flag === this.field.cols){
                this.figure.draw(
                    this.figure.col,
                    this.figure.row,
                    true
                );
                ++deleted_rows_on_step;
                this.field.deleteRow(row);
                this.field.moveRowsDown(row, this.figure.col, this.figure.row);
                this.figure.draw(
                    this.figure.col,
                    this.figure.row,
                    false
                    );
                ++row;
            }
        }
        if (deleted_rows_on_step >= 4){
            this.score += 1500;
        } 
        if (deleted_rows_on_step === 3){
            this.score += 700;
        } 
        if (deleted_rows_on_step === 2){
            this.score += 300;
        } 
        if (deleted_rows_on_step === 1){
            this.score += 100;
        } 
        this.levelCheck();
        this.score_lable.textContent = this.score;
        this.level_lable.textContent = this.level;
    }
    
    levelCheck(){
        if (this.score === 100){
            this.level = 1;
        }
        if (this.score === 300){
            this.level = 2;
        }
        if (this.score === 600){
            this.level = 3;
        }
        if (this.score === 1200){
            this.level = 4;
        }
    }
    
    stop(){
        clearInterval(this.timer);
        this.lable.textContent = "Game over!";
        localStorage[localStorage["tetris.username"]] = this.score;
        window.location.href = "/records.html"
    }
}