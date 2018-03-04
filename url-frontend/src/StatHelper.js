import Portion from './Portion';

export default class StatHelper {
    static colorI = 0;
    static getColor(index) {
        const colors = [
            'violet',
            'teal',
            'blue',
            'purple',
            'pink',
            'red',
            'orange',
            'olive',
            'green',
            'brown',
            'grey'
        ];
        return colors[index % colors.length]
    }

    static statDictToPortions(statDict) {
        let portions = [];
        let total = Object.keys(statDict) ? Object.keys(statDict)
        .map(k => statDict[k])
        .reduce((acc, cur) => acc += cur) : 0;

        let count = Object.keys(statDict).length;
       

        for (let key in statDict) {
            let color = this.getColor(this.colorI);
            this.colorI++;
            portions.push(new Portion(key, color, statDict[key], total));
        }

        return portions;
    }

    static friendlyField(python_field) {
        let parts = python_field.split('_');
        let capParts = parts.map(
            part => {
                return part[0].toUpperCase() + part.slice(1)
            }
        );
        let friendly = capParts.join(' ');
        
        return friendly;
    }
}