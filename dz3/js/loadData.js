async function loadData(url = "https://catfact.ninja/breeds", accumulatedData = []) {
    const response = await fetch(url);
    const data = await response.json();
    accumulatedData.push(...data.data);
    if (data.next_page_url) {
        return loadData(data.next_page_url, accumulatedData);
    } else {
        return accumulatedData;
    }
}

module.exports = { loadData };