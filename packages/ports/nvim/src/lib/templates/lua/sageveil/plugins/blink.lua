local palette = require("sageveil.palette")

---@param opts? PluginOptions
return function(opts)
	_ = opts

	return {
		BlinkCmpMenu = { link = "Pmenu" },
		BlinkCmpMenuBorder = { fg = palette.border, bg = palette.overlay, transparent_bg = true },
	}
end
