const deleteWhere = require('./deleteWhere');

input = [
    { name: "Evgeniy", surname: "Petrov" },
    { name: "Daniil", surname: "Malcev", iq: 100 },
    { surname: "Krivenyshev", iq: 120 },
    { name: "Dmitry", iq: 120 },
    { surname: "Dobrov" }
]

test('deleteWhere - have name', () => {
    function p(obj) {
        if ('name' in obj)
            return 1;
        return 0;
    }
    let expected = [
        { surname: "Krivenyshev", iq: 120 },
        { surname: "Dobrov" }
    ]
    expect(deleteWhere(input, p)).toEqual(expected);
});

test('deleteWhere - have surname', () => {
    function p(obj) {
        if ('surname' in obj)
            return 1;
        return 0;
    }
    let expected = [
        { name: "Dmitry", iq: 120 },
    ]
    expect(deleteWhere(input, p)).toEqual(expected);
});

test('deleteWhere - have iq', () => {
    function p(obj) {
        if ('iq' in obj)
            return 1;
        return 0;
    }
    let expected = [
        { name: "Evgeniy", surname: "Petrov" },
        { surname: "Dobrov" }
    ]
    expect(deleteWhere(input, p)).toEqual(expected);
});

test('deleteWhere - dont have name', () => {
    function p(obj) {
        if ('name' in obj)
            return 0;
        return 1;
    }
    let expected = [
        { name: "Evgeniy", surname: "Petrov" },
        { name: "Daniil", surname: "Malcev", iq: 100 },
        { name: "Dmitry", iq: 120 },
    ]
    expect(deleteWhere(input, p)).toEqual(expected);
});

test('deleteWhere - dont have iq', () => {
    function p(obj) {
        if ('iq' in obj)
            return 0;
        return 1;
    }
    let expected = [
        { name: "Daniil", surname: "Malcev", iq: 100 },
        { surname: "Krivenyshev", iq: 120 },
        { name: "Dmitry", iq: 120 },
    ]
    expect(deleteWhere(input, p)).toEqual(expected);
});