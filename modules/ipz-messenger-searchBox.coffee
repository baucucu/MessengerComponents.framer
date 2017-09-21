
class IpzMessengerSearchBox extends Layer

    constructor:(options = {}) ->
        options.name ?= "Messenger.SearchBox"
        options.width ?= options.superLayer.width
        options.height = 45
        options.backgroundColor ?= "rgba(250,248,251,0.8)"

        super options

        searchBar = new Layer
            superLayer: @
            width: @.width            
            height: 32
            y: Align.center
            backgroundColor: "transparent"        

        search = new Layer
            width: searchBar.width - 120
            x: Align.center
            y: Align.center
            superLayer: searchBar
            height: 28
            borderRadius: 5
            backgroundColor: "#E5E6EA"

        searchPlaceholder = new TextLayer
            superLayer: search
            text: "🔍  Search"
            fontSize: 13
            fontFamily: "San Francisco, sans-serif" 
            letterSpacing: 1
            x: Align.center
            y: Align.center(-3)

        # searchIcon = new Layer
        #     superLayer: search
        #     image: "images/SearchIcon.png"
        #     height: 12
        #     width: 12
        #     y: Align.center

        # searchIcon.x = searchPlaceholder.x - (searchIcon.width + 5)

module.exports = IpzMessengerSearchBox