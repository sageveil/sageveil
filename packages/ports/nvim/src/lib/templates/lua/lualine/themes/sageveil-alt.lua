local p = require("sageveil.palette")
local config = require("sageveil.config")

local bold = config.options.style.bold and "bold" or ""
local italic = config.options.style.italic and "italic" or ""
local transparent = config.options.style.transparent

-- return base variant if transparency enabled
if transparent then
	return require("lualine.themes.sageveil")
end

return {
	normal = {
		a = { bg = p.cyan, fg = p.black, gui = bold },
		b = { bg = p.surface, fg = p.cyan },
		c = { bg = p.black, fg = p.muted, gui = italic },
	},
	insert = {
		a = { bg = p.yellow, fg = p.black, gui = bold },
	},
	visual = {
		a = { bg = p.magenta, fg = p.black, gui = bold },
	},
	replace = {
		a = { bg = p.green, fg = p.black, gui = bold },
	},
	command = {
		a = { bg = p.red, fg = p.black, gui = bold },
	},
	inactive = {
		a = { bg = p.black, fg = p.dim, gui = bold },
		b = { bg = p.black, fg = p.dim },
		c = { bg = p.black, fg = p.dim, gui = italic },
	},
}
