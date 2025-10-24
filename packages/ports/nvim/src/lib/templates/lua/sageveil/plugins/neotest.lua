local palette = require("sageveil.palette")

---@param opts? PluginOptions
return function(opts)
	_ = opts

	return {
		NeotestAdapterName = { fg = palette.blue },
		NeotestBorder = { fg = palette.border },
		NeotestDir = { fg = palette.blue },
		NeotestExpandMarker = { fg = palette.highlight },
		NeotestFailed = { fg = palette.red },
		NeotestFile = { fg = palette.white },
		NeotestFocused = { fg = palette.yellow, bg = palette.highlight },
		NeotestIndent = { fg = palette.highlight },
		NeotestMarked = { fg = palette.cyan, bold = 1 },
		NeotestNamespace = { fg = palette.yellow },
		NeotestPassed = { fg = palette.green },
		NeotestRunning = { fg = palette.yellow },
		NeotestWinSelect = { fg = palette.muted },
		NeotestSkipped = { fg = palette.muted },
		NeotestTarget = { fg = palette.magenta },
		NeotestTest = { fg = palette.yellow },
		NeotestUnknown = { fg = palette.muted },
		NeotestWatching = { fg = palette.cyan },
	}
end
