function orderBy(objects, nameprop) {
    const sortedArray = [...objects];

    for (let item of sortedArray) {
        if (typeof item !== 'object' || item === null) {
            throw Error('Элемент массива не является обьектом');
        }
    }

    sortedArray.sort((a, b) => {
        for (let prop of nameprop) {
            if (prop in a && prop in b) {
                if (a[prop] < b[prop]) return -1;
                if (a[prop] > b[prop]) return 1;
            } else {
                throw Error('Свойства в одном из обьектов несуществует');
            }
        }
        return 0;
    });

    return sortedArray;
}

module.exports = orderBy;