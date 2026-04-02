local palette = require("sageveil.palette")

---@param opts? PluginOptions
return function(opts)
	local bold = opts and opts.bold

	return {
		TelescopeBorder = { fg = palette.border, bg = palette.overlay, transparent_bg = true },
		TelescopeNormal = { fg = palette.muted, bg = palette.overlay, transparent_bg = true },
		TelescopeSelection = { fg = palette.muted, bg = palette.highlight },
		TelescopeSelectionCaret = { fg = palette.magenta, bg = palette.overlay },
		TelescopeMultiSelection = { fg = palette.yellow },
		TelescopeTitle = { bg = palette.magenta, fg = palette.overlay, bold = bold },
		TelescopePromptTitle = { bg = palette.magenta, fg = palette.overlay, bold = bold },
		TelescopePreviewTitle = { bg = palette.magenta, fg = palette.overlay, bold = bold },
		TelescopePreviewBorder = { fg = palette.border, bg = palette.overlay, transparent_bg = true },
		TelescopePromptNormal = { fg = palette.white, bg = palette.overlay, transparent_bg = true },
		TelescopePromptBorder = { fg = palette.magenta, bg = palette.overlay, transparent_bg = true },
		TelescopeMatching = { fg = palette.white_bright, bold = bold },
	}
end
