const Cell_Size = 20;

class Grid {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.canvas.width  = Cell_Size * 10;
        this.ctx.canvas.height = Cell_Size * 20;

        this.width = Cell_Size * width;
        this.height = Cell_Size * height;
        this.color = "#000000";
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
        for(let i = 0; i <= this.canvas.width / Cell_Size; i += 1) {
            let x = i * Cell_Size;
            this.drawLine(x, 0, x, this.canvas.height);
        }
        for (let i = 0; i <= this.canvas.height / Cell_Size; i += 1) {
            let y = i * Cell_Size;
            this.drawLine(0, y, this.canvas.width, y);
        }
    }
    
};

  
let painter = new Grid(
    document.getElementById("stack"), 
    10, 
    20
);

painter.drawGrid();