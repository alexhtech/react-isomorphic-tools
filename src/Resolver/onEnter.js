import getDisplayName from 'react-display-name'


const onEnter = (onEnter) => Component => {
    Component.onEnter = onEnter
    Component.displayName = getDisplayName(Component)
    return Component
}


export {
    onEnter as default
}