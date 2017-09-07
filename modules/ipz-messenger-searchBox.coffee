
class IpzMessengerSearchBox extends Layer

    constructor:(options = {}) ->
        options.name ?= "Messenger.SearchBox"
        options.width ?= options.superLayer.width
        options.height = 32
        options.backgroundColor ?= Screen.backgroundColor

        super options

        searchBar = new Layer
            superLayer: @
            width: @.width            
            height: 32
            backgroundColor: "transparent"        

        search = new Layer
            width: searchBar.width - 100
            x: Align.center
            superLayer: searchBar
            height: 28
            borderRadius: 5
            backgroundColor: "#F0F1F3"

        searchPlaceholder = new TextLayer
            superLayer: search
            text: "Search"
            fontSize: 14
            fontFamily: ".SF NS Display"
            letterSpacing: 0.0
            x: Align.center
            y: Align.center

        searchIcon = new Layer
            superLayer: search
            image: "images/SearchIcon.png"
            height: 12
            width: 12
            y: Align.center

        searchIcon.x = searchPlaceholder.x - (searchIcon.width + 5)

module.exports = IpzMessengerSearchBox