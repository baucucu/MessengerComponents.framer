
ios = require "ios-kit"

class WebView extends Layer

    constructor: (options = {}) ->
        options.width = Screen.width
        options.height = Screen.height
        options.backgroundColor = "rgba(0,0,0,0.5)"

        options.left ?= "<"
        options.title ?= "Title"

        super options

        panelTop = 60

        panel = new Layer
            superLayer: @
            width: @.width
            y: Align.top(panelTop)
            height: @.height - panelTop
            backgroundColor: "white"
            borderRadius:
                topRight: 18
                topLeft: 18

        navBar = new ios.NavBar
            superLayer: panel
            name: 'webView.NavBar'
            left: options.left
            title: options.title
            right: "X"
            backgroundColor: Screen.backgroundColor
            borderRadius:
                topRight: 18
                topLeft: 18

        panel.on Events.TouchEnd, (event) ->
            event.stopPropagation()

        navBar.right.on Events.TouchEnd, ->
            navBar.superLayer.destroy()

        @.on Events.TouchEnd, ->
            @.destroy()

exports.WebView = WebView