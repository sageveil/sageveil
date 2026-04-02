local palette = require("sageveil.palette")

---@param opts? PluginOptions
return function(opts)
	local bold = opts and opts.bold
	local italic = opts and opts.italic

	return {
		ObsidianTodo = { bold = bold, fg = palette.cyan },
		ObsidianDone = { bold = bold, fg = palette.green },
		ObsidianRightArrow = { bold = bold, fg = palette.yellow_bright },
		ObsidianTilde = { bold = bold, fg = palette.red_bright },
		ObsidianImportant = { bold = bold, fg = palette.red },
		ObsidianBullet = { bold = bold, fg = palette.blue },
		ObsidianRefText = { underline = true, fg = palette.magenta },
		ObsidianExtLinkIcon = { fg = palette.magenta },
		ObsidianTag = { italic = italic, fg = palette.yellow },
		ObsidianBlockID = { italic = italic, fg = palette.cyan_bright },
		ObsidianHighlightText = { bg = palette.highlight },
	}
end
