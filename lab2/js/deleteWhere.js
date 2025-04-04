function deleteWhere(objs, p) {
    let M = []
    objs.forEach(element => {
        if (!p(element)) {
            M.push(element);
        }
    });
    console.log(M)
    return M;
}

module.exports = deleteWhere;