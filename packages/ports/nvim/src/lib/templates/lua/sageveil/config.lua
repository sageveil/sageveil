---@alias Palette { black: string, black_bright: string, white: string, white_bright: string, red: string, yellow: string, yellow_bright: string, green: string, cyan: string, magenta: string }
---@alias PaletteColor "black" | "black_bright" | "white" | "white_bright" | "red" | "yellow" | "yellow_bright" | "green" | "cyan" | "magenta" | "surface" | "overlay"
---@alias Highlight { link: string, inherit: boolean } | { fg: string, bg: string, sp: string, bold: boolean, italic: boolean, undercurl: boolean, underline: boolean, underdouble: boolean, underdotted: boolean, underdashed: boolean, strikethrough: boolean, inherit: boolean }

local config = {}

---@class Options
config.options = {
	---@type table<string, Highlight>
	overrides = {},
}

---@param options Options | nil
function config.extend_options(options)
	config.options = vim.tbl_deep_extend("force", config.options, options or {})
end

return config
