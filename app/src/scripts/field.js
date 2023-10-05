class Field {
    constructor(canvas, width, height) {
        this.cell_size = 20;
        this.cols = width;
        this.rows = height;
        this.width = this.cell_size * width;
        this.height = this.cell_size * height;
        
        this.canvas = canvas;
        
        this.ctx = this.canvas.getContext("2d");
        this.ctx.canvas.width  = this.width;
        this.ctx.canvas.height = this.height;

        this.color_table = [
            "#EC7474", "#EC7", "#474", "#747", "#C74"
        ];


        this.color = "#000000";
        this.drawGrid();
        this.matrix = [];
        this.color_matrix = [];
        for (let i=0; i<this.rows; i+=1){
            this.matrix[i] = new Array(this.cols).fill(0);
            this.color_matrix[i] = new Array(this.cols).fill("#fff");
        }
    }

    setLineColor(color){
        this.grid_color = color;
    }

    drawLine(x_left, y_left, x_right, y_right){
        this.ctx.beginPath();
        this.ctx.moveTo(x_left, y_left);
        this.ctx.lineTo(x_right, y_right);
        let old_color = this.ctx.strokeStyle;
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
        this.ctx.strokeStyle = old_color;
    }

    drawGrid(){
        for(let i = 0; i <= this.cols; i += 1) {
            let x = i * this.cell_size;
            this.drawLine(x, 0, x, this.canvas.height);
        }
        for (let i = 0; i <= this.rows; i += 1) {
            let y = i * this.cell_size;
            this.drawLine(0, y, this.canvas.width, y);
        }
    }

    fillCell(col_index, row_index, fill_color="#111111"){
        if (col_index < 0 || col_index >= this.cols){
            return;
        }
        if (row_index < 0 || row_index >= this.rows){
            return;
        }

        let x = col_index * this.cell_size + 1;
        let y = row_index * this.cell_size + 1;
        
        let old_style = this.ctx.fillStyle; 
        
        this.ctx.beginPath();
        this.ctx.fillStyle = fill_color;
        this.ctx.fillRect(x, y, this.cell_size - 2, this.cell_size - 2);

        this.ctx.fillStyle = old_style;

        this.matrix[row_index][col_index] = fill_color === "#fff" ? 0 : 1;
        this.color_matrix[row_index][col_index] = fill_color;
    }

    clear(){
        for (let j=0; j<this.rows; ++j){
            for (let i=0; i<this.cols; ++i){
                this.fillCell(i, j, "#fff");
            }
        }
    }

    deleteRow(row_index){
        for (let col=0; col < this.cols; ++col){
            this.fillCell(col, row_index, "#fff");
        }
    }

    moveRowsDown(row_index, figure_col, figure_row){
        for (let row = row_index - 1; row >= 1; --row){
            for (let col = 0; col < this.cols; ++col){
                if (col === figure_col && row === figure_row)
                    continue;
                this.fillCell(col, row + 1, 
                    this.color_matrix[row][col]  
                );
            }
        }
    }

};
