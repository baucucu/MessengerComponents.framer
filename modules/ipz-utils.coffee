
class IpzUtils

    @setVisible: (component, visible) ->
        component.visible = visible
        if (component.children.length > 0)
            for child, index in component.children
                @setVisible(child, visible)
        return true

module.exports = IpzUtils