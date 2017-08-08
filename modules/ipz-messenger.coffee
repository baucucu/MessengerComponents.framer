ios = require "ios-kit"
ipz = require "ipz-messenger-kit"

class IpzMessenger extends Layer

    constructor:(options = {}, user) ->
        options.name ?= "Messenger.Main"
        options.width ?= Screen.width
        options.height ?= Screen.height
        options.backgroundColor ?= Screen.backgroundColor

        super options

        homeTab = new ipz.IpzMessengerTab
            label:"Home"
            activeIcon:"images/HomeIconActive.png"
            inactiveIcon:"images/HomeIconInactive.png"
            superLayer: @
        callsTab = new ipz.IpzMessengerTab
            label:"Calls"
            activeIcon:"images/CallsIconActive.png"
            inactiveIcon:"images/CallsIconInactive.png"
            superLayer: @
        cameraTab = new ipz.IpzMessengerTab
            label:""
            activeIcon:"images/CameraIconActive.png"
            inactiveIcon:"images/CameraIconInactive.png"
            iconsize:45
            superLayer: @
        peopleTab = new ipz.IpzMessengerTab
            label:"People"
            activeIcon:"images/PeopleIconActive.png"
            inactiveIcon:"images/PeopleIconInactive.png"
            superLayer: @
        gamesTab = new ipz.IpzMessengerTab
            label:"Games"
            activeIcon:"images/GamesIconActive.png"
            inactiveIcon:"images/GamesIconInactive.png"
            superLayer: @

        tabBar = new ipz.IpzMessengerTabBar
            tabs:[homeTab, callsTab, cameraTab, peopleTab, gamesTab]
            activeColor:"blue"
            inactiveColor:"grey"
            start:0
            viewTop:options.y
            superLayer: @

        #  TODO set based on data from DB
        tabBar.setBadgeValue(1, 2)

        homeView = new ipz.IpzMessengerHome({superLayer: homeTab.view, height: Screen.height-130}, user)

        callsView = new ios.View
            name:"calls"
            superLayer: callsTab.view
            backgroundColor: "red"
            constraints:
                leading:0
                trailing:0
                top:0
                bottom:2

        camView = new ios.View
            superLayer: cameraTab.view
            backgroundColor: "black"
            constraints:
                leading:0
                trailing:0
                top:0
                bottom:2

        peopleView = new ios.View
            superLayer: peopleTab.view
            backgroundColor: "orange"
            constraints:
                leading:0
                trailing:0
                top:0
                bottom:2

        gamesView = new ios.View
            superLayer: gamesTab.view
            backgroundColor: "green"
            constraints:
                leading:0
                trailing:0
                top:0
                bottom:2

module.exports = IpzMessenger
