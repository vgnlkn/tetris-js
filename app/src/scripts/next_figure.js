class NextFigure{
    constructor(field){
        this.field = field;
    }
    
    generate(is_drawable=true){
        this.field.clear();
        let random = (size) => Math.floor(Math.random() * size);
        let figure_index = random(5);
        let figure = Figures.I;
        switch(figure_index){
            case 0: {
                figure = Figures.I;
                break;
            }
            case 1: {
                figure = Figures.L;
                break;
            }
            case 2: {
                figure = Figures.O;
                break;
            }
            case 3: {
                figure = Figures.S;
                break;
            }
            case 4: {
                figure = Figures.T;
                break;
            }
            default: {
                break;
            }
        }

        let sprite_index = random(figure.length);
        let color = this.field.color_table[random(this.field.color_table.length)];
        if (is_drawable){
            this.next = new Figure(this.field, figure, sprite_index, color);
            this.next.moveTo(0, 0);
        }

        return [figure, sprite_index, color];
    }
}
  