exports.json = function(response) {
    return response.json()
}

exports.courseCompare = function (obj1, obj2) {
    if (obj1.code < obj2.code)
        return -1;
    if (obj1.code > obj2.code)
        return 1;
    return 0;
}