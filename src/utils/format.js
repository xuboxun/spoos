const ListFormat = function(value) {
    const list = {
        items: [],
        total: 0
    };
    if (value) {
        list.items = value.rows;
        list.total = value.count;
    }
    return list;
};


module.exports = {
    ListFormat
};
