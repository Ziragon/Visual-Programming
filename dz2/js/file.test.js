const orderBy = require('./file');

const input = [
    { name: 'Eugene', age: 25 },
    { name: 'Daniil', age: 30 },
    { name: 'Oleg', age: 20 },
    { name: 'Eugene', age: 20 },
];
const expected = [
    { name: 'Eugene', age: 20 },
    { name: 'Oleg', age: 20 },
    { name: 'Eugene', age: 25 },
    { name: 'Daniil', age: 30 },
];

test('orderBy Equal', () => {
    expect(orderBy(input, ['age', 'name'])).toEqual(expected);
});

test('orderBy Error 1', () => {
    let input1 = [...input]
    input1.push("123")
    expect(() => orderBy(input1, ['age'])).toThrow();
});

test('orderBy Error 2', () => {
    input.push({ name: 'Eugene', iq: 100 })
    expect(() => orderBy(input, ['age'])).toThrow();
});