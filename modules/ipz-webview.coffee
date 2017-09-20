
ios = require "ios-kit"

class WebView extends Layer

    constructor: (options = {}) ->
        options.name ?= "WebView"
        options.width ?= Screen.width
        options.height ?= Screen.height
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
        @navBar = navBar

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
            panel.superLayer.visible = false

        @.on Events.TouchEnd, ->
            @.visible = false

    setTitle: (title) ->
        ios.utils.update(@navBar.title, [text:title])  

    setContent: (content, scale) ->
        scale ?= 2
        @origin = content
        @contentPanel.html = """<iframe id="myframe" src="#{content}" frameborder="0" 
            width="#{@contentPanel.width/scale}" height="#{@contentPanel.height/scale}"
            style="transform-origin: 0% 0% 0px; transform: scale(#{scale},#{scale})" />"""

    mockClose: () ->
        @.visible = false

    mockSendCustomJs: (customJs) ->
        document.getElementById("myframe").contentWindow.postMessage(customJs, @origin);

exports.WebView = WebView