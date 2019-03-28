function response(code, msg, result) {
    return {
        code: code,
        msg: msg,
        result: result || null
    };
}

module.exports = response;
