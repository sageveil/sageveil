local M = {}
local config = require("sageveil.config")
local c = require("sageveil.palette")
local utilities = require("sageveil.utilities")

local bold = config.options.bold
local italics = config.options.italics

local function set_highlights()
	local highlights = {
		-- UI
		Normal = { fg = c.white, bg = c.black },
		NormalNC = { bg = c.black },
		Conceal = { fg = c.muted, bg = c.black },
		NormalFloat = { bg = c.overlay },
		FloatBorder = { fg = c.border, bg = c.overlay },
		Cursor = { fg = c.cursor_text, bg = c.cursor },
		CursorLine = { bg = c.surface },
		CursorLineNr = { fg = c.muted, bold = bold },
		CursorColumn = { bg = c.black_bright },
		LineNr = { fg = c.dim },
		SignColumn = { bg = c.black, fg = c.dim },
		VertSplit = { fg = c.border },
		WinSeparator = { fg = c.border },
		Pmenu = { fg = c.white, bg = c.overlay },
		PmenuSel = { fg = c.white, bg = c.highlight, bold = bold },
		PmenuSbar = { bg = c.overlay },
		PmenuThumb = { bg = c.border },
		StatusLine = { fg = c.white, bg = c.surface },
		StatusLineNC = { fg = c.muted, bg = c.surface },
		TabLine = { fg = c.muted, bg = c.black },
		TabLineSel = { fg = c.magenta, bg = c.surface, bold = bold },
		TabLineFill = { bg = c.black },
		Visual = { bg = c.highlight },
		Search = { fg = c.white, bg = c.highlight },
		CurSearch = { fg = c.black, bg = c.yellow_bright },
		IncSearch = { fg = c.black, bg = c.yellow_bright },
		MatchParen = { fg = c.red_bright, bold = bold },
		Folded = { fg = c.muted, bg = c.black, italic = italics },
		FoldColumn = { fg = c.muted, bg = c.black },
		ColorColumn = { bg = c.overlay },
		NonText = { fg = c.dim },
		Whitespace = { fg = c.dim },
		Directory = { fg = c.magenta },
		ModeMsg = { fg = c.dim },
		MoreMsg = { fg = c.muted },
		Question = { fg = c.white },
		QuickFixLine = { fg = c.yellow },
		Title = { fg = c.white },

		Changed = { fg = c.white },
		Added = { fg = c.green },
		Removed = { fg = c.red },

		-- Syntax
		Comment = { fg = c.dim, italic = italics },
		Identifier = { fg = c.white },
		Function = { fg = c.green, bold = bold },
		Statement = { fg = c.green },
		Conditional = { fg = c.green, bold = bold },
		Repeat = { fg = c.green },
		Label = { fg = c.yellow },
		Operator = { fg = c.white },
		Keyword = { fg = c.magenta },
		Constant = { fg = c.blue },
		Exception = { fg = c.red },
		Boolean = { fg = c.cyan },
		Number = { fg = c.cyan },
		Float = { fg = c.cyan },
		String = { fg = c.yellow },
		Character = { fg = c.yellow },
		Type = { fg = c.blue },
		StorageClass = { fg = c.magenta },
		Structure = { fg = c.cyan },
		Typedef = { fg = c.cyan },
		Special = { fg = c.green_bright },
		Delimiter = { fg = c.white },
		SpecialComment = { fg = c.green, italic = italics },
		Todo = { fg = c.black, bg = c.yellow, bold = bold },
		PreProc = { fg = c.magenta },

		-- Diagnostics
		DiagnosticError = { fg = c.red_bright },
		DiagnosticWarn = { fg = c.yellow_bright },
		DiagnosticInfo = { fg = c.cyan_bright },
		DiagnosticHint = { fg = c.magenta },
		DiagnosticOK = { fg = c.blue },
		DiagnosticUnderlineError = { undercurl = true, sp = c.red_bright },
		DiagnosticUnderlineWarn = { undercurl = true, sp = c.yellow_bright },
		DiagnosticUnderlineInfo = { undercurl = true, sp = c.cyan_bright },
		DiagnosticUnderlineHint = { undercurl = true, sp = c.magenta },
		DiagnosticUnderlineOK = { undercurl = true, sp = c.blue },
		Error = { fg = c.black, bg = c.red, bold = bold },
		ErrorMsg = { fg = c.red_bright },
		WarningMsg = { fg = c.yellow_bright },

		-- Git
		DiffAdd = { bg = c.green_bright, blend = 30 },
		DiffChange = { bg = c.yellow, blend = 10 },
		DiffDelete = { bg = c.red, blend = 20 },
		DiffText = { bg = c.yellow, blend = 25 },
		diffAdded = { link = "DiffAdd" },
		diffChanged = { link = "DiffChange" },
		diffRemoved = { link = "DiffDelete" },
		GitSignsAdd = { fg = c.green },
		GitSignsChange = { fg = c.yellow },
		GitSignsDelete = { fg = c.red },

		-- Tree-sitter
		["@comment"] = { link = "Comment" },
		["@punctuation.delimiter"] = { link = "Delimiter" },
		["@punctuation.bracket"] = { fg = c.dim },
		["@punctuation.special"] = { fg = c.blue },
		["@keyword"] = { link = "Keyword" },
		["@keyword.function"] = { fg = c.magenta },
		["@function"] = { link = "Function" },
		["@function.call"] = { link = "Function" },
		["@type"] = { link = "Type" },
		["@type.builtin"] = { fg = c.cyan, italic = italics },
		["@string"] = { link = "String" },
		["@number"] = { link = "Number" },
		["@boolean"] = { link = "Boolean" },
		["@variable"] = { fg = c.white },
		["@variable.builtin"] = { fg = c.magenta, italic = italics },
		["@constant"] = { fg = c.cyan },
		["@constant.builtin"] = { fg = c.cyan, italic = italics },
		["@tag"] = { fg = c.green_bright },
		["@attribute"] = { fg = c.yellow },

		-- LSP semantic
		["@lsp.type.parameter"] = { fg = c.white },
		["@lsp.type.property"] = { fg = c.white },
		["@lsp.type.namespace"] = { fg = c.cyan },
		["@lsp.mod.readonly"] = { italic = italics },
		["@lsp.typemod.variable.readonly"] = { italic = italics },

		-- Telescope
		TelescopeBorder = { fg = c.overlay, bg = c.overlay },
		TelescopeNormal = { fg = c.muted, bg = c.overlay },
		TelescopeSelection = { fg = c.muted, bg = c.highlight },
		TelescopeSelectionCaret = { fg = c.magenta, bg = c.overlay },
		TelescopeMultiSelection = { fg = c.yellow },
		TelescopeTitle = { bg = c.magenta, fg = c.overlay, bold = bold },
		TelescopePromptTitle = { bg = c.magenta, fg = c.overlay, bold = bold },
		TelescopePreviewTitle = { bg = c.magenta, fg = c.overlay, bold = bold },
		TelescopePreviewBorder = { fg = c.overlay, bg = c.overlay },
		TelescopePromptNormal = { fg = c.white, bg = c.overlay },
		TelescopePromptBorder = { fg = c.overlay, bg = c.overlay },
		TelescopeMatching = { fg = c.white_bright, bold = bold },

		-- Blink
		BlinkCmpMenu = { link = "Pmenu" },
		BlinkCmpMenuBorder = { fg = c.border, bg = c.overlay },

		-- nvim-neotest/neotest
		NeotestAdapterName = { fg = c.blue },
		NeotestBorder = { fg = c.border },
		NeotestDir = { fg = c.blue },
		NeotestExpandMarker = { fg = c.highlight },
		NeotestFailed = { fg = c.red },
		NeotestFile = { fg = c.white },
		NeotestFocused = { fg = c.yellow, bg = c.highlight },
		NeotestIndent = { fg = c.highlight },
		NeotestMarked = { fg = c.cyan, bold = 1 },
		NeotestNamespace = { fg = c.yellow },
		NeotestPassed = { fg = c.green },
		NeotestRunning = { fg = c.yellow },
		NeotestWinSelect = { fg = c.muted },
		NeotestSkipped = { fg = c.muted },
		NeotestTarget = { fg = c.magenta },
		NeotestTest = { fg = c.yellow },
		NeotestUnknown = { fg = c.muted },
		NeotestWatching = { fg = c.cyan },
	}

	-- Terminal ANSI colors
	vim.g.terminal_color_0 = c.black
	vim.g.terminal_color_1 = c.red
	vim.g.terminal_color_2 = c.green
	vim.g.terminal_color_3 = c.yellow
	vim.g.terminal_color_4 = c.blue
	vim.g.terminal_color_5 = c.magenta
	vim.g.terminal_color_6 = c.cyan
	vim.g.terminal_color_7 = c.white
	vim.g.terminal_color_8 = c.black_bright
	vim.g.terminal_color_9 = c.red_bright
	vim.g.terminal_color_10 = c.green_bright
	vim.g.terminal_color_11 = c.yellow_bright
	vim.g.terminal_color_12 = c.blue_bright
	vim.g.terminal_color_13 = c.magenta_bright
	vim.g.terminal_color_14 = c.cyan_bright
	vim.g.terminal_color_15 = c.white_bright

	if type(config.overrides) == "table" then
		for group, opts in pairs(config.overrides) do
			highlights[group] = vim.tbl_extend("force", highlights[group] or {}, opts)
		end
	end

	-- Apply highlights
	for group, hl in pairs(highlights) do
		if hl.blend ~= nil and (hl.blend >= 0 and hl.blend <= 100) and hl.bg ~= nil then
			hl.bg = utilities.blend(hl.bg, hl.blend_on or c.black, hl.blend / 100)
		end

		vim.api.nvim_set_hl(0, group, hl)
	end
end

function M.colorscheme()
	vim.opt.termguicolors = true
	if vim.g.colors_name then
		vim.cmd("hi clear")
		vim.cmd("syntax reset")
	end
	vim.g.colors_name = "sageveil"

	set_highlights()
end

---@param options Options
function M.setup(options)
	config.extend_options(options or {})
end

return M
