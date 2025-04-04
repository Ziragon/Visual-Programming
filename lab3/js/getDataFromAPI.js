async function getDataFromAPI(url = "https://dummyjson.com/products") {
    let accumulatedData = []
    return new Promise(async(resolve) => {
        const response = await fetch(url);
        const data = await response.json();
        accumulatedData.push(...data.products);
        resolve(accumulatedData);
    });
}

module.exports = { getDataFromAPI };