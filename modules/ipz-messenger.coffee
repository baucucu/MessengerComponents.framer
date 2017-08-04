ios = require "ios-kit"
ipz = require "ipz-messenger-kit"

class IpzMessenger
    
    constructor:(parentView, user) ->

        homeTab = new ipz.IpzMessengerTab
            label:"Home"
            activeIcon:"images/homeIconActive.png"
            inactiveIcon:"images/homeIcon.png"
        callsTab = new ipz.IpzMessengerTab
            label:"Calls"
            activeIcon:"images/callIconActive.png"
            inactiveIcon:"images/callIcon.png"
        cameraTab = new ipz.IpzMessengerTab
            label:""
            activeIcon:"images/Circle.png"
            inactiveIcon:"images/Circle.png"
        peopleTab = new ipz.IpzMessengerTab
            label:"People"
            activeIcon:"images/groupsIconActive.png"
            inactiveIcon:"images/groupsIcon.png"
        gamesTab = new ipz.IpzMessengerTab
            label:"Games"
            activeIcon:"images/gamesIconActive.png"
            inactiveIcon:"images/gamesIcon.png"

        tabBar = new ipz.IpzMessengerTabBar
            tabs:[homeTab, callsTab, cameraTab, peopleTab, gamesTab]
            activeColor:"blue"
            inactiveColor:"grey"
            start:0
            viewTop:parentView.y
            viewBottom:52

        homeView = new ipz.IpzMessengerHome(homeTab.view, user)
        
        callsView = new ios.View
            name:"YELLOW"
            superLayer: callsTab.view
            backgroundColor: "yellow"
            constraints:
                leading:0
                trailing:0
                top:0
                bottom:0

        camView = new ios.View
            superLayer: cameraTab.view
            backgroundColor: "black"            
            constraints:
                leading:0
                trailing:0
                top:0
                bottom:0

        peopleView = new ios.View
            superLayer: peopleTab.view
            backgroundColor: "blue"
            constraints:
                leading:0
                trailing:0
                top:0
                bottom:0

        gamesView = new ios.View
            superLayer: gamesTab.view
            backgroundColor: "red"
            constraints:
                leading:0
                trailing:0
                top:0
                bottom:0

module.exports = IpzMessenger
