local M = {}
local config = require("sageveil.config")
local c = require("sageveil.palette")

local function set_highlights()
	local highlights = {
		-- UI
		Normal = { fg = c.white, bg = c.black },
		NormalNC = { fg = c.muted, bg = c.black },
		Conceal = { fg = c.muted, bg = c.black },
		NormalFloat = { fg = c.white, bg = c.overlay },
		FloatBorder = { fg = c.border, bg = c.overlay },
		Cursor = { fg = c.cursor_text, bg = c.cursor },
		CursorLine = { bg = c.surface },
		CursorLineNr = { fg = c.muted, bold = true },
		CursorColumn = { bg = c.black_bright },
		LineNr = { fg = c.dim },
		SignColumn = { bg = c.black, fg = c.dim },
		VertSplit = { fg = c.border },
		WinSeparator = { fg = c.border },
		Pmenu = { fg = c.white, bg = c.overlay },
		PmenuSel = { fg = c.white, bg = c.highlight, bold = true },
		PmenuSbar = { bg = c.overlay },
		PmenuThumb = { bg = c.border },
		StatusLine = { fg = c.white, bg = c.surface },
		StatusLineNC = { fg = c.muted, bg = c.surface },
		TabLine = { fg = c.muted, bg = c.black },
		TabLineSel = { fg = c.magenta, bg = c.surface, bold = true },
		TabLineFill = { bg = c.black },
		Visual = { bg = c.highlight },
		Search = { fg = c.white, bg = c.highlight },
		CurSearch = { fg = c.black, bg = c.yellow_bright },
		IncSearch = { fg = c.black, bg = c.yellow_bright },
		MatchParen = { fg = c.red_bright, bold = true },
		Folded = { fg = c.muted, bg = c.black, italic = true },
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
		Comment = { fg = c.dim, italic = true },
		Identifier = { fg = c.white },
		Function = { fg = c.green, bold = true },
		Statement = { fg = c.green },
		Conditional = { fg = c.green, bold = true },
		Repeat = { fg = c.green },
		Label = { fg = c.yellow },
		Operator = { fg = c.white },
		Keyword = { fg = c.magenta },
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
		SpecialComment = { fg = c.green, italic = true },
		Todo = { fg = c.black, bg = c.yellow, bold = true },
		PreProc = { fg = c.magenta },

		-- Diagnostics
		DiagnosticError = { fg = c.red_bright },
		DiagnosticWarn = { fg = c.yellow_bright },
		DiagnosticInfo = { fg = c.cyan_bright },
		DiagnosticHint = { fg = c.magenta },
		DiagnosticUnderlineError = { undercurl = true, sp = c.red_bright },
		DiagnosticUnderlineWarn = { undercurl = true, sp = c.yellow_bright },
		DiagnosticUnderlineInfo = { undercurl = true, sp = c.cyan_bright },
		DiagnosticUnderlineHint = { undercurl = true, sp = c.magenta },
		Error = { fg = c.black, bg = c.red, bold = true },
		ErrorMsg = { fg = c.red_bright },
		WarningMsg = { fg = c.yellow_bright },

		-- Git
		DiffAdd = { fg = c.green, bg = c.black },
		DiffChange = { fg = c.yellow, bg = c.black },
		DiffDelete = { fg = c.red, bg = c.black },
		DiffText = { fg = c.yellow, bg = c.black, bold = true },
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
		["@type.builtin"] = { fg = c.cyan, italic = true },
		["@string"] = { link = "String" },
		["@number"] = { link = "Number" },
		["@boolean"] = { link = "Boolean" },
		["@variable"] = { fg = c.white },
		["@variable.builtin"] = { fg = c.magenta, italic = true },
		["@constant"] = { fg = c.cyan },
		["@constant.builtin"] = { fg = c.cyan, italic = true },
		["@tag"] = { fg = c.green_bright },
		["@attribute"] = { fg = c.yellow },

		-- LSP semantic
		["@lsp.type.parameter"] = { fg = c.white },
		["@lsp.type.property"] = { fg = c.white },
		["@lsp.type.namespace"] = { fg = c.cyan },
		["@lsp.mod.readonly"] = { italic = true },
		["@lsp.typemod.variable.readonly"] = { italic = true },

		-- Telescope
		TelescopeBorder = { fg = c.overlay, bg = c.overlay },
		TelescopeNormal = { fg = c.muted, bg = c.overlay },
		TelescopeSelection = { fg = c.muted, bg = c.highlight },
		TelescopeSelectionCaret = { fg = c.magenta, bg = c.overlay },
		TelescopeMultiSelection = { fg = c.yellow, bg = c.surface },
		TelescopeTitle = { bg = c.magenta, fg = c.overlay, bold = true },
		TelescopePromptTitle = { bg = c.magenta, fg = c.overlay, bold = true },
		TelescopePreviewTitle = { bg = c.magenta, fg = c.overlay, bold = true },
		TelescopePreviewBorder = { fg = c.overlay, bg = c.overlay },
		TelescopePromptNormal = { fg = c.white, bg = c.overlay },
		TelescopePromptBorder = { fg = c.overlay, bg = c.overlay },
		TelescopeMatching = { fg = c.white_bright, bold = true },

		-- Blink
		BlinkCmpMenu = { link = "Pmenu" },
		BlinkCmpMenuBorder = { fg = c.border, bg = c.overlay },
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
	for group, opts in pairs(highlights) do
		vim.api.nvim_set_hl(0, group, opts)
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
