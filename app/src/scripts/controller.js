class Controller{
    constructor(score_lable){
        this.score = 0;
        this.score_lable = score_lable;

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
                        this.next_figure_params[2]
                    );
                    this.figure.moveTo(3, 0);
                    this.figure.startMotion();
                    
                    this.next_figure_params = this.figure_generator.generate(true);
                }
            }, 
            10
        );
    }

    // stopMotion(){
    //     clearInterval(this.timer);
    //     this.is_stopped = true;
    // }

}