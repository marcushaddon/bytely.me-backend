export default class Portion {
    title;
    color;
    amount;
    whole;
    

    constructor(title, value, whole) {
        this.title = title;
        this.value = value;
        this.whole = whole;
    }

    get percent() {
        return (this.value / this.whole) * 100;
    }

    get key() {
        return this.title;
    }

    
}