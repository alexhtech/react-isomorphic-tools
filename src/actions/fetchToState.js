const pushToState = (payload, keys) => dispatch => {
    dispatch({
        type: "@FETCH_DATA/PUSH",
        payload,
        meta:{
            keys
        }
    })
}

export {pushToState}