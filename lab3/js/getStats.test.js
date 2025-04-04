const { getDataFromAPI } = require('./getDataFromAPI.js');
const { getStats } = require('./getStats.js');


jest.mock('./getDataFromAPI.js')

test("Тест функции getStats, вызов getDataFromAPI 1 раз", async() => {
    const mockData = [{
            category: 'beauty'
        },
        {
            category: 'beauty'
        },
        {
            category: 'fragrances'
        }
    ];

    const getDataFromAPIMock = jest.spyOn({ getDataFromAPI }, 'getDataFromAPI').mockResolvedValue(mockData);
    const stats = await getStats();

    expect(stats).toEqual({
        'beauty': 2,
        'fragrances': 1
    });

    expect(getDataFromAPIMock).toHaveBeenCalledTimes(1);

    getDataFromAPIMock.mockRestore();
});