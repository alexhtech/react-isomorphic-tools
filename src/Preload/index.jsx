import getDisplayName from 'react-display-name'

const preload = (preload, options = {}) => Component => {
    Component.displayName = `Preload(${getDisplayName(Component)})`
    Component.preload = preload
    Component.preloadOptions = options

    return Component
}


const onEnter = (onEnter) => Component => {
    Component.displayName = `OnEnter(${getDisplayName(Component)})`
    Component.onEnter = onEnter

    return Component
}


export {preload, onEnter}