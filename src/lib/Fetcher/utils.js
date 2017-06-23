const normalizeParams = (data) => {
    if (typeof (data) == 'object') return JSON.stringify(data)
    return data
}

const stringifyParamsToQuery = (params) => {
    let i = 0
    let query = ''
    for (let name in params) {
        if (params.hasOwnProperty(name)) {
            switch (typeof params[name]) {
                case 'object': {
                    const values = params[name]
                    if (Array.isArray(values)) {
                        for (let value in values) {
                            if (values.hasOwnProperty(value)) {
                                query += `${i > 0 ? '&' : '?'}${name}=${normalizeParams(values[value])}`
                                i++
                            }
                        }
                    } else {
                        query += `${i > 0 ? '&' : '?'}${name}=${normalizeParams(values)}`
                        i++
                    }
                    break;
                }
                default: {
                    if (params[name] != undefined) {
                        query += `${i > 0 ? '&' : '?'}${name}=${params[name]}`
                        i++
                    }
                    break;
                }
            }
        }
    }
    return query
}


export {
    stringifyParamsToQuery,
    normalizeParams
}