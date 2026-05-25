local palette = require("sageveil.palette")

---@param opts? PluginOptions
return function(opts)
	local bold = opts and opts.bold
	local italic = opts and opts.italic

	return {
		-- mini.animate
		MiniAnimateCursor = { link = "Cursor" },
		MiniAnimateNormalFloat = { link = "NormalFloat" },

		-- mini.clue
		MiniClueBorder = { fg = palette.border, bg = palette.overlay, transparent_bg = true },
		MiniClueDescGroup = { fg = palette.magenta, bold = bold },
		MiniClueDescSingle = { fg = palette.white },
		MiniClueNextKey = { fg = palette.yellow_bright, bold = bold },
		MiniClueNextKeyWithPostkeys = { fg = palette.yellow, bold = bold },
		MiniClueSeparator = { fg = palette.dim },
		MiniClueTitle = { fg = palette.cyan, bg = palette.overlay, bold = bold, transparent_bg = true },

		-- mini.cmdline
		MiniCmdlinePeekBorder = { fg = palette.border, bg = palette.overlay, transparent_bg = true },
		MiniCmdlinePeekLineNr = { fg = palette.dim, bg = palette.overlay, transparent_bg = true },
		MiniCmdlinePeekNormal = { fg = palette.white, bg = palette.overlay, transparent_bg = true },
		MiniCmdlinePeekSep = { fg = palette.border, bg = palette.overlay, transparent_bg = true },
		MiniCmdlinePeekSign = { fg = palette.magenta, bg = palette.overlay, transparent_bg = true },
		MiniCmdlinePeekTitle = { fg = palette.cyan, bg = palette.overlay, bold = bold, transparent_bg = true },

		-- mini.completion
		MiniCompletionActiveParameter = { fg = palette.yellow_bright, bold = bold },
		MiniCompletionDeprecated = { fg = palette.dim, strikethrough = true },
		MiniCompletionInfoBorderOutdated = { fg = palette.yellow_bright },

		-- mini.cursorword
		MiniCursorword = { bg = palette.highlight },
		MiniCursorwordCurrent = { bg = palette.surface },

		-- mini.deps
		MiniDepsChangeAdded = { fg = palette.green },
		MiniDepsChangeRemoved = { fg = palette.red },
		MiniDepsHint = { fg = palette.muted },
		MiniDepsInfo = { fg = palette.cyan },
		MiniDepsMsgBreaking = { fg = palette.red_bright, bold = bold },
		MiniDepsPlaceholder = { fg = palette.dim, italic = italic },
		MiniDepsTitle = { fg = palette.white, bold = bold },
		MiniDepsTitleError = { fg = palette.red_bright, bold = bold },
		MiniDepsTitleSame = { fg = palette.green, bold = bold },
		MiniDepsTitleUpdate = { fg = palette.yellow_bright, bold = bold },

		-- mini.diff
		MiniDiffSignAdd = { fg = palette.green },
		MiniDiffSignChange = { fg = palette.yellow },
		MiniDiffSignDelete = { fg = palette.red },
		MiniDiffOverAdd = { bg = palette.green_bright, blend = 30 },
		MiniDiffOverChange = { bg = palette.yellow, blend = 10 },
		MiniDiffOverChangeBuf = { bg = palette.yellow, blend = 25 },
		MiniDiffOverContext = { bg = palette.surface },
		MiniDiffOverContextBuf = { bg = palette.overlay },
		MiniDiffOverDelete = { bg = palette.red, blend = 20 },

		-- mini.files
		MiniFilesBorder = { fg = palette.border, bg = palette.overlay, transparent_bg = true },
		MiniFilesBorderModified = { fg = palette.yellow_bright, bg = palette.overlay, transparent_bg = true },
		MiniFilesCursorLine = { bg = palette.highlight },
		MiniFilesDirectory = { fg = palette.magenta },
		MiniFilesFile = { fg = palette.white },
		MiniFilesNormal = { fg = palette.white, bg = palette.overlay, transparent_bg = true },
		MiniFilesTitle = { fg = palette.muted, bg = palette.overlay, transparent_bg = true },
		MiniFilesTitleFocused = { fg = palette.cyan, bg = palette.overlay, bold = bold, transparent_bg = true },

		-- mini.hipatterns
		MiniHipatternsFixme = { fg = palette.red_bright, bold = bold },
		MiniHipatternsHack = { fg = palette.yellow_bright, bold = bold },
		MiniHipatternsNote = { fg = palette.cyan_bright, bold = bold },
		MiniHipatternsTodo = { fg = palette.green_bright, bold = bold },

		-- mini.icons
		MiniIconsAzure = { fg = palette.cyan_bright },
		MiniIconsBlue = { fg = palette.blue },
		MiniIconsCyan = { fg = palette.cyan },
		MiniIconsGreen = { fg = palette.green },
		MiniIconsGrey = { fg = palette.muted },
		MiniIconsOrange = { fg = palette.yellow },
		MiniIconsPurple = { fg = palette.magenta },
		MiniIconsRed = { fg = palette.red },
		MiniIconsYellow = { fg = palette.yellow_bright },

		-- mini.indentscope
		MiniIndentscopeSymbol = { fg = palette.border },
		MiniIndentscopeSymbolOff = { fg = palette.red },

		-- mini.jump
		MiniJump = { fg = palette.black, bg = palette.yellow_bright, bold = bold },

		-- mini.jump2d
		MiniJump2dDim = { fg = palette.dim },
		MiniJump2dSpot = { fg = palette.black, bg = palette.magenta, bold = bold },
		MiniJump2dSpotAhead = { fg = palette.black, bg = palette.cyan, bold = bold },
		MiniJump2dSpotUnique = { fg = palette.black, bg = palette.green, bold = bold },

		-- mini.map
		MiniMapNormal = { fg = palette.muted, bg = palette.overlay, transparent_bg = true },
		MiniMapSymbolCount = { fg = palette.cyan },
		MiniMapSymbolLine = { fg = palette.magenta },
		MiniMapSymbolView = { fg = palette.yellow_bright },

		-- mini.notify
		MiniNotifyBorder = { fg = palette.border, bg = palette.overlay, transparent_bg = true },
		MiniNotifyLspProgress = { fg = palette.yellow_bright },
		MiniNotifyNormal = { fg = palette.white, bg = palette.overlay, transparent_bg = true },
		MiniNotifyTitle = { fg = palette.cyan, bg = palette.overlay, bold = bold, transparent_bg = true },

		-- mini.operators
		MiniOperatorsExchangeFrom = { bg = palette.highlight },

		-- mini.pick
		MiniPickBorder = { fg = palette.border, bg = palette.overlay, transparent_bg = true },
		MiniPickBorderBusy = { fg = palette.yellow_bright, bg = palette.overlay, transparent_bg = true },
		MiniPickBorderText = { fg = palette.magenta, bg = palette.overlay, bold = bold, transparent_bg = true },
		MiniPickCursor = { fg = palette.black, bg = palette.magenta, bold = bold },
		MiniPickIconDirectory = { fg = palette.blue },
		MiniPickIconFile = { fg = palette.white },
		MiniPickHeader = { fg = palette.cyan, bg = palette.overlay, bold = bold, transparent_bg = true },
		MiniPickMatchCurrent = { fg = palette.white, bg = palette.highlight, bold = bold },
		MiniPickMatchMarked = { fg = palette.yellow_bright, bold = bold },
		MiniPickMatchRanges = { fg = palette.magenta_bright, bold = bold },
		MiniPickNormal = { fg = palette.white, bg = palette.overlay, transparent_bg = true },
		MiniPickPreviewLine = { bg = palette.highlight },
		MiniPickPreviewRegion = { bg = palette.magenta, blend = 25 },
		MiniPickPrompt = { fg = palette.white, bg = palette.overlay, transparent_bg = true },
		MiniPickPromptCaret = { fg = palette.magenta_bright, bg = palette.overlay, transparent_bg = true },
		MiniPickPromptPrefix = { fg = palette.magenta, bg = palette.overlay, bold = bold, transparent_bg = true },

		-- mini.snippets
		MiniSnippetsCurrent = { bg = palette.yellow, blend = 20 },
		MiniSnippetsCurrentReplace = { bg = palette.magenta, blend = 25 },
		MiniSnippetsFinal = { bg = palette.green, blend = 25 },
		MiniSnippetsUnvisited = { fg = palette.dim },
		MiniSnippetsVisited = { fg = palette.cyan },

		-- mini.starter
		MiniStarterCurrent = { bg = palette.highlight },
		MiniStarterFooter = { fg = palette.dim, italic = italic },
		MiniStarterHeader = { fg = palette.green_bright, bold = bold },
		MiniStarterInactive = { fg = palette.dim },
		MiniStarterItem = { fg = palette.white },
		MiniStarterItemBullet = { fg = palette.magenta },
		MiniStarterItemPrefix = { fg = palette.yellow },
		MiniStarterSection = { fg = palette.cyan, bold = bold },
		MiniStarterQuery = { fg = palette.yellow_bright, bold = bold },

		-- mini.statusline
		MiniStatuslineDevinfo = { fg = palette.magenta },
		MiniStatuslineFileinfo = { fg = palette.green },
		MiniStatuslineFilename = { fg = palette.muted },
		MiniStatuslineInactive = { fg = palette.dim },
		MiniStatuslineModeCommand = { fg = palette.red, bold = bold },
		MiniStatuslineModeInsert = { fg = palette.green, bold = bold },
		MiniStatuslineModeNormal = { fg = palette.cyan, bold = bold },
		MiniStatuslineModeOther = { fg = palette.blue, bold = bold },
		MiniStatuslineModeReplace = { fg = palette.yellow, bold = bold },
		MiniStatuslineModeVisual = { fg = palette.magenta, bold = bold },

		-- mini.surround
		MiniSurround = { fg = palette.black, bg = palette.yellow_bright, bold = bold },

		-- mini.tabline
		MiniTablineCurrent = { fg = palette.magenta, bg = palette.surface, bold = bold, transparent_bg = true },
		MiniTablineFill = { bg = palette.black, transparent_bg = true },
		MiniTablineHidden = { fg = palette.dim, bg = palette.black, transparent_bg = true },
		MiniTablineModifiedCurrent = {
			fg = palette.yellow_bright,
			bg = palette.surface,
			bold = bold,
			transparent_bg = true,
		},
		MiniTablineModifiedHidden = { fg = palette.yellow, bg = palette.black, transparent_bg = true },
		MiniTablineModifiedVisible = { fg = palette.yellow, bg = palette.black, transparent_bg = true },
		MiniTablineTabpagesection = { fg = palette.black, bg = palette.cyan, bold = bold },
		MiniTablineTrunc = { fg = palette.dim, bg = palette.black, transparent_bg = true },
		MiniTablineVisible = { fg = palette.white, bg = palette.black, transparent_bg = true },

		-- mini.test
		MiniTestEmphasis = { fg = palette.yellow_bright, bold = bold },
		MiniTestFail = { fg = palette.red_bright, bold = bold },
		MiniTestPass = { fg = palette.green_bright, bold = bold },

		-- mini.trailspace
		MiniTrailspace = { bg = palette.red, blend = 30 },
	}
end
