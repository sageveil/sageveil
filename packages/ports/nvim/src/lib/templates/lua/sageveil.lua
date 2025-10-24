local M = {}
local config = require("sageveil.config")
local palette = require("sageveil.palette")
local utilities = require("sageveil.utilities")

local function set_highlights()
	local bold = config.options.style.bold
	local italic = config.options.style.italic
	local transparent = config.options.style.transparent

	local highlights = {
		-- UI
		Normal = { fg = palette.white, bg = palette.black, transparent_bg = true },
		NormalNC = { bg = palette.black, transparent_bg = true },
		Conceal = { fg = palette.muted, bg = palette.black, transparent_bg = true },
		NormalFloat = { bg = palette.overlay, transparent_bg = true },
		FloatBorder = { fg = palette.border, bg = palette.overlay, transparent_bg = true },
		Cursor = { fg = palette.cursor_text, bg = palette.cursor },
		CursorLine = { bg = palette.surface },
		CursorLineNr = { fg = palette.muted, bold = bold },
		CursorColumn = { bg = palette.black_bright },
		LineNr = { fg = palette.dim },
		SignColumn = { bg = palette.black, fg = palette.dim, transparent_bg = true },
		VertSplit = { fg = palette.border },
		WinSeparator = { fg = palette.border },
		Pmenu = { fg = palette.white, bg = palette.overlay, transparent_bg = true },
		PmenuSel = { fg = palette.white, bg = palette.highlight, bold = bold },
		PmenuSbar = { bg = palette.overlay, transparent_bg = true },
		PmenuThumb = { bg = palette.border, transparent_bg = true },
		StatusLine = { fg = palette.white, bg = palette.surface, transparent_bg = true },
		StatusLineNC = { fg = palette.muted, bg = palette.surface, transparent_bg = true },
		TabLine = { fg = palette.muted, bg = palette.black, transparent_bg = true },
		TabLineSel = { fg = palette.magenta, bg = palette.surface, bold = bold, transparent_bg = true },
		TabLineFill = { bg = palette.black, transparent_bg = true },
		Visual = { bg = palette.highlight },
		Search = { fg = palette.white, bg = palette.highlight },
		CurSearch = { fg = palette.black, bg = palette.yellow_bright },
		IncSearch = { fg = palette.black, bg = palette.yellow_bright },
		MatchParen = { fg = palette.red_bright, bold = bold },
		Folded = { fg = palette.muted, bg = palette.black, italic = italic },
		FoldColumn = { fg = palette.muted, bg = palette.black },
		ColorColumn = { bg = palette.overlay },
		NonText = { fg = palette.dim },
		Whitespace = { fg = palette.dim },
		Directory = { fg = palette.magenta },
		ModeMsg = { fg = palette.dim },
		MoreMsg = { fg = palette.muted },
		Question = { fg = palette.white },
		QuickFixLine = { fg = palette.yellow },
		Title = { fg = palette.white },

		Changed = { fg = palette.white },
		Added = { fg = palette.green },
		Removed = { fg = palette.red },

		-- Syntax
		Comment = { fg = palette.dim, italic = italic },
		Identifier = { fg = palette.white },
		Function = { fg = palette.green, bold = bold },
		Statement = { fg = palette.green },
		Conditional = { fg = palette.green, bold = bold },
		Repeat = { fg = palette.green },
		Label = { fg = palette.yellow },
		Operator = { fg = palette.white },
		Keyword = { fg = palette.magenta },
		Constant = { fg = palette.blue },
		Exception = { fg = palette.red },
		Boolean = { fg = palette.cyan },
		Number = { fg = palette.cyan },
		Float = { fg = palette.cyan },
		String = { fg = palette.yellow },
		Character = { fg = palette.yellow },
		Type = { fg = palette.blue },
		StorageClass = { fg = palette.magenta },
		Structure = { fg = palette.cyan },
		Typedef = { fg = palette.cyan },
		Special = { fg = palette.green_bright },
		Delimiter = { fg = palette.white },
		SpecialComment = { fg = palette.green, italic = italic },
		Todo = { fg = palette.black, bg = palette.yellow, bold = bold },
		PreProc = { fg = palette.magenta },

		-- Diagnostics
		DiagnosticError = { fg = palette.red_bright },
		DiagnosticWarn = { fg = palette.yellow_bright },
		DiagnosticInfo = { fg = palette.cyan_bright },
		DiagnosticHint = { fg = palette.magenta },
		DiagnosticOK = { fg = palette.blue },
		DiagnosticUnderlineError = { undercurl = true, sp = palette.red_bright },
		DiagnosticUnderlineWarn = { undercurl = true, sp = palette.yellow_bright },
		DiagnosticUnderlineInfo = { undercurl = true, sp = palette.cyan_bright },
		DiagnosticUnderlineHint = { undercurl = true, sp = palette.magenta },
		DiagnosticUnderlineOK = { undercurl = true, sp = palette.blue },
		Error = { fg = palette.black, bg = palette.red, bold = bold },
		ErrorMsg = { fg = palette.red_bright },
		WarningMsg = { fg = palette.yellow_bright },

		-- Git
		DiffAdd = { bg = palette.green_bright, blend = 30 },
		DiffChange = { bg = palette.yellow, blend = 10 },
		DiffDelete = { bg = palette.red, blend = 20 },
		DiffText = { bg = palette.yellow, blend = 25 },
		diffAdded = { link = "DiffAdd" },
		diffChanged = { link = "DiffChange" },
		diffRemoved = { link = "DiffDelete" },
		GitSignsAdd = { fg = palette.green },
		GitSignsChange = { fg = palette.yellow },
		GitSignsDelete = { fg = palette.red },

		-- Tree-sitter
		["@comment"] = { link = "Comment" },
		["@punctuation.delimiter"] = { link = "Delimiter" },
		["@punctuation.bracket"] = { fg = palette.dim },
		["@punctuation.special"] = { fg = palette.blue },
		["@keyword"] = { link = "Keyword" },
		["@keyword.function"] = { fg = palette.magenta },
		["@function"] = { link = "Function" },
		["@function.call"] = { link = "Function" },
		["@type"] = { link = "Type" },
		["@type.builtin"] = { fg = palette.cyan, italic = italic },
		["@string"] = { link = "String" },
		["@number"] = { link = "Number" },
		["@boolean"] = { link = "Boolean" },
		["@variable"] = { fg = palette.white },
		["@variable.builtin"] = { fg = palette.magenta, italic = italic },
		["@constant"] = { fg = palette.cyan },
		["@constant.builtin"] = { fg = palette.cyan, italic = italic },
		["@tag"] = { fg = palette.green_bright },
		["@attribute"] = { fg = palette.yellow },

		-- LSP semantic
		["@lsp.type.parameter"] = { fg = palette.white },
		["@lsp.type.property"] = { fg = palette.white },
		["@lsp.type.namespace"] = { fg = palette.cyan },
		["@lsp.mod.readonly"] = { italic = italic },
		["@lsp.typemod.variable.readonly"] = { italic = italic },

		-- Telescope
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

		-- Blink
		BlinkCmpMenu = { link = "Pmenu" },
		BlinkCmpMenuBorder = { fg = palette.border, bg = palette.overlay },

		-- nvim-neotest/neotest
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

	-- Terminal ANSI colors
	vim.g.terminal_color_0 = palette.black
	vim.g.terminal_color_1 = palette.red
	vim.g.terminal_color_2 = palette.green
	vim.g.terminal_color_3 = palette.yellow
	vim.g.terminal_color_4 = palette.blue
	vim.g.terminal_color_5 = palette.magenta
	vim.g.terminal_color_6 = palette.cyan
	vim.g.terminal_color_7 = palette.white
	vim.g.terminal_color_8 = palette.black_bright
	vim.g.terminal_color_9 = palette.red_bright
	vim.g.terminal_color_10 = palette.green_bright
	vim.g.terminal_color_11 = palette.yellow_bright
	vim.g.terminal_color_12 = palette.blue_bright
	vim.g.terminal_color_13 = palette.magenta_bright
	vim.g.terminal_color_14 = palette.cyan_bright
	vim.g.terminal_color_15 = palette.white_bright

	if type(config.options.overrides) == "table" then
		for hl_group, hl_opts in pairs(config.options.overrides) do
			local existing = highlights[hl_group] or {}
			while existing.link ~= nil do
				existing = highlights[existing.link] or {}
			end
			local parsed = vim.tbl_extend("force", {}, hl_opts)

			if hl_opts.fg ~= nil then
				parsed.fg = utilities.parse_color(hl_opts.fg) or hl_opts.fg
			end
			if hl_opts.bg ~= nil then
				parsed.bg = utilities.parse_color(hl_opts.bg) or hl_opts.bg
			end
			if hl_opts.sp ~= nil then
				parsed.sp = utilities.parse_color(hl_opts.sp) or hl_opts.sp
			end

			if (hl_opts.inherit == nil or hl_opts.inherit) and existing ~= nil then
				parsed.inherit = nil
				highlights[hl_group] = vim.tbl_extend("force", existing, parsed)
			else
				parsed.inherit = nil
				highlights[hl_group] = parsed
			end
		end
	end

	-- Apply highlights
	for group, hl in pairs(highlights) do
		if transparent and hl.transparent_bg then
			hl.bg = "NONE"
		elseif hl.blend ~= nil and (hl.blend >= 0 and hl.blend <= 100) and hl.bg ~= nil then
			hl.bg = utilities.blend(hl.bg, hl.blend_on or palette.black, hl.blend / 100)
		end
		hl.transparent_bg = nil

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
