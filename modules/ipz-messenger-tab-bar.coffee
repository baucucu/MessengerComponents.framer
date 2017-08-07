ios = require 'ios-kit'
utils = require 'ipz-utils'

exports.defaults = {
	tab: {
		label: "label"
		fontsize: 10
		activeIcon:undefined
		inactiveIcon:undefined
		active: undefined
		inactive: undefined
		type: "tab"
		superLayer:undefined
		badgeSize: 16
		badgeColor: "#FF3B30"
		badgeTextStyle : {
			fontSize: "12px"
			lineHeight: "36px"
			color: "#fff"
			textAlign: "center"
			fontFamily: "Helvetica Neue', sans-serif"
		}
	}
	bar: {
		tabs: []
		start:0
		type:"tabBar"
		barTop:0
		backgroundColor:"white"
		activeColor:"blue"
		inactiveColor:"gray"
		blur:true
		viewTop:0
		viewBottom:52
		superLayer:undefined
	}
}

exports.defaults.tab.props = Object.keys(exports.defaults.tab)
exports.defaults.bar.props = Object.keys(exports.defaults.bar)

exports.tab = (array) ->
	setup = ios.utils.setupComponent(array, exports.defaults.tab)
	specs =
		width: 75

	switch ios.device.name
		when "iphone-5"
			specs.width = 55

	tab = new ios.View
		superLayer:setup.superLayer
		backgroundColor:"transparent"
		name:setup.label
		constraints:
			width:specs.width
			height:52

	tab.view = new ios.View
		superLayer:setup.superLayer
		name:setup.label + ".view"
		backgroundColor:"transparent"
		constraints:
			leading:0
			trailing:0
			bottom:setup.viewBottom

	# Create Active
	tab.active = new ios.View
		name:".active"
		backgroundColor:"transparent"
		constraints:
			top:0
			bottom:Screen.height
			leading:0
			trailing:0
		superLayer:tab

	tab.active.icon = new ios.View
		name:".active.icon"
		constraints:
			width:25
			height:25
			align:"horizontal"
			top:7
		backgroundColor:"transparent"
		superLayer:tab.active

	if setup.active == undefined
		if setup.activeIcon != undefined
			tab.active.icon.image = setup.activeIcon
			tab.active.icon.width = 25
			tab.active.icon.height = 25
	else
		setup.active.superLayer = tab.active.icon
		setup.active.props =
			width:tab.active.icon.width
			height:tab.active.icon.height

	# Create Inactive
	tab.inactive = new ios.View
		backgroundColor:"transparent"
		name:".inactive"
		constraints:
			top:0
			bottom:Screen.height
			leading:0
			trailing:0
		superLayer:tab

	tab.inactive.icon = new ios.View
		constraints:
			width:25
			height:25
			align:"horizontal"
			top:7
		backgroundColor:"transparent"
		name:".inactive.icon"
		superLayer:tab.inactive

	tab.label = new ios.Text
		text:setup.label
		superLayer:tab
		color:"#929292"
		fontSize:setup.fontsize
		name:".label"
		textTransform:"capitalize"

	tab.label.constraints =
		horizontalCenter: tab.active

	if setup.inactive == undefined
		if setup.inactiveIcon != undefined
			tab.inactive.icon.image = setup.inactiveIcon
			tab.inactive.icon.width = 25
			tab.inactive.icon.height = 25
		
	else
		setup.inactive.superLayer = tab.inactive.icon
		setup.inactive.props =
			width:tab.inactive.icon.width
			height:tab.inactive.icon.height

	if setup.activeIcon != undefined
		tab.badgeLayer = new Layer
			name:setup.label + ".badge"
			width: setup.badgeSize
			height: setup.badgeSize
			x: 0
			y: 6
			borderRadius: 18
			superLayer: tab
			backgroundColor: setup.badgeColor
		tab.badgeLayer.style = setup.badgeTextStyle
		tab.badgeLayer.centerX(16)
		tab.badgeLayer.visible = false

	return tab

exports.bar = (array) ->
	setup = ios.utils.setupComponent(array, exports.defaults.bar)

	# If no tabs, make dummy tabs
	if setup.tabs.length == 0
		dummyTab = new exports.tab
		dummyTab2 = new exports.tab
		setup.tabs.push dummyTab
		setup.tabs.push dummyTab2

	specs =
		width : Screen.width / setup.tabs.length

	bar = new ios.View
		superLayer:setup.superLayer
		backgroundColor:"transparent"
		name:"tabBar"
		constraints:
			leading:0
			trailing:0

	bar.bg = new ios.View
		superLayer:bar
		name:".bg"
		constraints:
			leading:0
			trailing:0

	bar.divider = new ios.View
		backgroundColor:"#B2B2B2"
		name:".divider"
		superLayer:bar
		constraints:
			leading:0
			trailing:0
			height:.5

	bar.box = new ios.View
		superLayer:bar
		backgroundColor:"transparent"
		name:".box"
		constraints:
			width: Screen.width #setup.tabs.length * specs.width

	if setup.type == "navBar"
		bar.constraints.top = setup.barTop
		bar.constraints.height = 22
		bar.bg.constraints.top = 0
		bar.bg.constraints.height = 22
		bar.box.constraints.height = 22
		bar.divider.y = 22
	else
		bar.constraints.bottom = 0
		bar.constraints.height = 52
		bar.bg.constraints.bottom = 0
		bar.bg.constraints.height = 52
		bar.box.constraints.height = 52
		bar.divider.top = 70

	setActive = (tabIndex) ->
		for tab, index in setup.tabs
			if index == tabIndex
				tab.label.color = ios.utils.color(setup.activeColor)
				tab.active.visible = true
				tab.inactive.visible = false
				utils.setVisible(tab.view, true)
			else
				tab.label.color = ios.utils.color(setup.inactiveColor)
				tab.active.visible = false
				tab.inactive.visible = true
				utils.setVisible(tab.view, false)

	bar.setBadgeValue = (tabIndex, value) =>
		# Adds a badge to the tab item if value is a number > 0 and removes the badge if null
		for tab, index in setup.tabs
			if index == tabIndex
				if value
					tab.badgeLayer.html = value
					tab.badgeLayer.visible = true
				else
					tab.badgeLayer.visible = false

	for tab, index in setup.tabs
		#Check for vaild tab object
		bar.box.addSubLayer(tab)
		# Change colors
		# ios.utils.changeFill(tab.active.icon, ios.utils.color(setup.activeColor))
		# ios.utils.changeFill(tab.inactive.icon, ios.utils.color(setup.inactiveColor))
		tab.label.color = ios.utils.color(setup.inactiveColor)
		bar.bg.backgroundColor = setup.backgroundColor

		if setup.blur
			bar.bg.backgroundColor = "rgba(255,255,255, .9)"
			ios.utils.bgBlur(bar.bg)

		tab.view.constraints.top = setup.viewTop
		tab.view.constraints.bottom = setup.viewBottom

		if setup.type == "navBar"
			specs.width = bar.width / setup.tabs.length
			tab.constraints.width = specs.width
			tab.constraints.height = 22
		else
			tab.label.constraints.top = setup.viewBottom - 10

		if index == 0
			tab.constraints.leading = 0
		else
			tab.constraints.leading = setup.tabs[index - 1]

		ios.layout.set(tab)

		tab.on Events.TouchStart, ->
			tabIndex = @.x / ios.utils.px(specs.width)
			setActive(tabIndex)

	bar.box.constraints =
		align:"horizontal"

	ios.layout.set(bar.box)
	setActive(setup.start)

	bar.tabs = setup.tabs

	return bar
