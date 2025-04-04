const { loadData } = require('./loadData.js');
const calcStatsFromAPI = require('./calcStatsFromAPI.js');

jest.mock('./loadData.js')

test("Тест функции calcStatsFromAPI, вызов loadData 1 раз", async() => {
    const mockData = [{
            breed: 'Turkish Van',
            country: 'developed in the United Kingdom (founding stock from Turkey)',
            origin: 'Natural',
            coat: 'Semi-long',
            pattern: 'Van'
        },
        {
            breed: 'York Chocolate',
            country: 'United States (New York)',
            origin: 'Natural',
            coat: 'Long',
            pattern: 'Solid'
        },
        {
            breed: 'York Chocolate',
            country: 'United States (New York)',
            origin: 'Natural',
            coat: 'Long',
            pattern: 'Solid'
        }
    ];

    const loadDataMock = jest.spyOn({ loadData }, 'loadData').mockResolvedValue(mockData);
    const stats = await calcStatsFromAPI();

    expect(stats).toEqual({
        'developed in the United Kingdom (founding stock from Turkey)': 1,
        'United States (New York)': 2
    });

    expect(loadDataMock).toHaveBeenCalledTimes(1);

    loadDataMock.mockRestore();
});