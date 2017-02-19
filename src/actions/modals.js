const open = (name) => dispatch => {
    dispatch({
        type: '@@modals/open',
        meta: name
    })
}

const close = (name) => dispatch => {
    dispatch({
        type: '@@modals/close',
        meta: name
    })
}


export {open as openModal, close as closeModal}