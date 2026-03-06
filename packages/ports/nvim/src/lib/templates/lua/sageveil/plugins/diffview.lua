local palette = require("sageveil.palette")

---@param opts? PluginOptions
return function(opts)
	_ = opts

	return {
		DiffviewNormal = { link = "Normal" },
		DiffviewCursorLine = { bg = palette.surface },
		DiffviewVertSplit = { fg = palette.border },
		DiffviewSignColumn = { fg = palette.dim, bg = palette.black, transparent_bg = true },
		DiffviewNonText = { fg = palette.dim },
		DiffviewEndOfBuffer = { fg = palette.black },

		DiffviewFilePanelTitle = { fg = palette.blue, bold = 1 },
		DiffviewFilePanelCounter = { fg = palette.cyan },
		DiffviewFilePanelRootPath = { fg = palette.muted },
		DiffviewFilePanelPath = { fg = palette.muted },
		DiffviewFilePanelFileName = { fg = palette.white },
		DiffviewFolderName = { fg = palette.blue },
		DiffviewFolderSign = { fg = palette.blue },
		DiffviewFilePanelInsertions = { fg = palette.green },
		DiffviewFilePanelDeletions = { fg = palette.red },
		DiffviewFilePanelConflicts = { fg = palette.yellow_bright },

		DiffviewStatusAdded = { fg = palette.green },
		DiffviewStatusUntracked = { fg = palette.green_bright },
		DiffviewStatusModified = { fg = palette.yellow },
		DiffviewStatusRenamed = { fg = palette.blue },
		DiffviewStatusCopied = { fg = palette.cyan },
		DiffviewStatusTypeChange = { fg = palette.magenta },
		DiffviewStatusDeleted = { fg = palette.red },
		DiffviewStatusUnmerged = { fg = palette.yellow_bright },
		DiffviewStatusUnknown = { fg = palette.muted },
		DiffviewStatusBroken = { fg = palette.red_bright },
		DiffviewStatusIgnored = { fg = palette.dim },
	}
end
