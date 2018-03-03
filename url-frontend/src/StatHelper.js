import Portion from './Portion';

export default class StatHelper {
    static statDictToPortions(statDict) {
        let portions = [];
        let total = Object.keys(statDict) ? Object.keys(statDict)
        .map(k => statDict[k])
        .reduce((acc, cur) => acc += cur) : 0;

        let count = Object.keys(statDict).length;

        for (let key in statDict) {
            portions.push(new Portion(key, null, statDict[key], total));
        }

        return portions;
    }
}