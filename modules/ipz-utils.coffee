
class IpzUtils

    @setVisible: (component, visible) ->
        component.visible = visible
        if (component.children.length > 0)
            for child, index in component.children
                @setVisible(child, visible)
        return true

    @destroyChildren: (component, includeSelf) ->
        if (component.children.length > 0)
            for child, index in component.children
                @destroyChildren(child, true)
        if (includeSelf is true)
            component.destroy()
        return true

module.exports = IpzUtils