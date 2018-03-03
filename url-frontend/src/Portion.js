export default class Portion {
    title;
    color;
    amount;
    whole;
    

    constructor(title, color, amount, whole) {
        this.title = title;
        this.color = color;
        this.amount = amount;
        this.whole = whole;
    }

    get percent() {
        return (this.amount / this.whole) * 100;
    }

    
}