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

const closeAll = () => dispatch => {
    dispatch({
        type: '@@modals/closeAll'
    })
}

export {open as openModal, close as closeModal, closeAll as closeAllModals}
