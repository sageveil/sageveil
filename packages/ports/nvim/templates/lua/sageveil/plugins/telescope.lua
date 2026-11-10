local palette = require("sageveil.palette")

---@param opts? PluginOptions
return function(opts)
	local bold = opts and opts.bold

	return {
		TelescopeBorder = { fg = palette.border, bg = palette.overlay, transparent_bg = true },
		TelescopeNormal = { fg = palette.muted, bg = palette.overlay, transparent_bg = true },
		TelescopeSelection = { fg = palette.white_bright, bg = palette.highlight },
		TelescopeSelectionCaret = { fg = palette.green_bright, bg = palette.highlight },
		TelescopeMultiSelection = { fg = palette.yellow },
		TelescopeTitle = { bg = palette.overlay, fg = palette.green_bright, bold = bold },
		TelescopePromptTitle = { bg = palette.overlay, fg = palette.green_bright, bold = bold },
		TelescopePreviewTitle = { bg = palette.overlay, fg = palette.green_bright, bold = bold },
		TelescopePreviewBorder = { fg = palette.border, bg = palette.overlay, transparent_bg = true },
		TelescopePromptNormal = { fg = palette.white, bg = palette.overlay, transparent_bg = true },
		TelescopePromptBorder = { fg = palette.green, bg = palette.overlay, transparent_bg = true },
		TelescopeMatching = { fg = palette.white_bright, bold = bold },
	}
end
