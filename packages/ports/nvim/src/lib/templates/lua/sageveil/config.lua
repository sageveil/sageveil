---@alias Palette {
--- 	black: string,
--- 	black_bright: string,
--- 	white: string,
--- 	white_bright: string,
--- 	blue: string,
--- 	blue_bright: string,
--- 	cyan: string,
--- 	cyan_bright: string,
--- 	green: string,
--- 	green_bright: string,
--- 	magenta: string,
--- 	magenta_bright: string,
--- 	red: string,
--- 	red_bright: string,
--- 	yellow: string,
--- 	yellow_bright: string,
--- 	surface: string,
--- 	overlay: string,
--- 	highlight: string,
--- 	border: string,
--- 	muted: string,
--- 	dim: string,
--- 	cursor: string,
--- 	cursor_text: string,
--- }
---@alias PaletteColor
---| "black"
---| "black_bright"
---| "white"
---| "white_bright"
---| "blue"
---| "blue_bright"
---| "cyan"
---| "cyan_bright"
---| "green"
---| "green_bright"
---| "magenta"
---| "magenta_bright"
---| "red"
---| "red_bright"
---| "yellow"
---| "yellow_bright"
---| "surface"
---| "overlay"
---| "highlight"
---| "border"
---| "muted"
---| "dim"
---| "cursor"
---| "cursor_text"
---@alias ColorString PaletteColor | string
---@alias Highlight { link: string, inherit: boolean } | { fg: ColorString, bg: ColorString, sp: string, bold: boolean, italic: boolean, undercurl: boolean, underline: boolean, underdouble: boolean, underdotted: boolean, underdashed: boolean, strikethrough: boolean, inherit: boolean }

local config = {}

---@class Options
config.options = {
	---@type table<string, Highlight>
	overrides = {},
	style = {
		bold = true,
		italic = true,
	},
}

---@param options Options | nil
function config.extend_options(options)
	config.options = vim.tbl_deep_extend("force", config.options, options or {})
end

return config
