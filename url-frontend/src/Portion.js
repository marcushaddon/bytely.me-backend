export default class Portion {
    title;
    color;
    amount;
    whole;
    

    constructor(title, color, value, whole) {
        this.title = title;
        this.color = color;
        this.value = value;
        this.whole = whole;
    }

    get percent() {
        console.log(this.value)
        console.log(this.whole)
        console.log(this.value/this.whole)
        return (this.value / this.whole) * 100;
    }

    
}