class Figure{
    constructor(field, figure_matrix, figure_orientation, figure_color){
        this.field = field;
        this.color = figure_color;
        this.figure_matrix = figure_matrix[figure_orientation];
        this.figure_sprite = figure_matrix;
        this.orientation = figure_orientation;
        this.row = undefined;
        this.col = undefined;
        this.is_stopped = false;
    }

    draw(col, row, is_white=false){
        this.col = col;
        this.row = row;
        let filled = 0;
        for (let j = 0; j < 4; j += 1){
            for (let i = 0; i < 4; i += 1){
                if (this.figure_matrix[i][j]){
                    this.field.fillCell(col + j, row + i, is_white ? "#fff" : this.color);     
                    filled += 1;
                }
                if (filled === 4){
                    return;
                }
            }
        }
    }

    moveTo(col, row){ 
        if (this.col !== undefined || this.col !== undefined){
            this.draw(this.col, this.row, true);
        }
        let ret = this.isMoveValid(col, row);
        if (ret){
            if (!this.isStopped()){
                this.draw(col, row, false);
            }
            else{
                this.draw(this.col, this.row, false);
            }
        } else {
            this.draw(this.col, this.row, false);
        }
        return ret;
    }

    isMoveValid(col, row){
        let empty_cells = 0;
        for (let j = 0; j < 4; j += 1){
            for (let i = 0; i < 4; i += 1){
                if (this.figure_matrix[i][j] === 1 &&
                    row + i < 20 && row + i >= 0 &&
                    col + j < 10 && col + j >= 0 &&
                    !this.field.matrix[row+i][col+j]
                    ){
                        empty_cells += 1;
                    }
            }
        }
        return empty_cells === 4;
    }

    async startMotion(){
        this.timer = setInterval(
            () => {
                if (!this.moveTo(this.col, this.row + 1))
                    this.stopMotion();
            }, 
            1000
        );
    }

    stopMotion(){
        clearInterval(this.timer);
        this.is_stopped = true;
    }

    isStopped(){
        return this.is_stopped;
    }

    getPosition(){
        return [ this.col, this.row ];
    }

    rotate(){
        if (this.is_stopped){
            return;
        }
        let next_sprite_index = (this.orientation + 1) % this.figure_sprite.length;
        this.draw(this.col, this.row, true);

        let mtx_copy = this.figure_matrix;
        this.figure_matrix = this.figure_sprite[next_sprite_index];
        if (!this.isMoveValid(this.col, this.row)){
            this.figure_matrix = mtx_copy;
        }
        else{
            this.orientation = next_sprite_index;
        }
        this.draw(this.col, this.row, false);
    }
}