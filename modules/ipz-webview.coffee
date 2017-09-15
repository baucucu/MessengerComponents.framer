
ios = require "ios-kit"

class WebView extends Layer

    @contentPanel = undefined

    constructor: (options = {}) ->
        options.width = Screen.width
        options.height = Screen.height
        options.backgroundColor = "rgba(0,0,0,0.5)"

        options.left ?= "<"
        options.title ?= "Title"

        super options

        origin = ""
        panelTop = 60

        panel = new Layer
            superLayer: @
            name: 'webView.Panel'
            width: @.width
            y: Align.top(panelTop)
            height: @.height - panelTop
            backgroundColor: Screen.backgroundColor
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

        @contentPanel = new Layer
            superLayer: panel
            name: 'webView.content'
            width: @.width
            y: navBar.maxY
            height: panel.height - navBar.height
            backgroundColor = Screen.backgroundColor
            ignoreEvents: false

        panel.on Events.TouchEnd, (event) ->
            event.stopPropagation()

        navBar.right.on Events.TouchEnd, ->
            navBar.superLayer.destroy()

        @.on Events.TouchEnd, ->
            @.destroy()

    setContent: (content) ->
        @origin = content
        @contentPanel.html = "<html><body><iframe id=\"myframe\" src=\"#{content}\" width=\"#{@contentPanel.width}\" height=\"#{@contentPanel.height}\" /></body></html>"


    mockClose: () ->
        @.destroy()

    mockSendCustomJs: (customJs) ->
        document.getElementById("myframe").contentWindow.postMessage(customJs,@origin);

exports.WebView = WebView