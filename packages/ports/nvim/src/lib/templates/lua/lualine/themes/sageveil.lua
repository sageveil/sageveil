local p = require("sageveil.palette")
local config = require("sageveil.config")

local bold = config.options.style.bold and "bold" or ""
local italic = config.options.style.italic and "italic" or ""
local transparent = config.options.style.transparent

local bg = transparent and "NONE" or p.black

return {
	normal = {
		a = { bg = bg, fg = p.cyan, gui = bold },
		b = { bg = bg, fg = p.magenta },
		c = { bg = bg, fg = p.muted, gui = italic },
	},
	insert = {
		a = { bg = bg, fg = p.green, gui = bold },
	},
	visual = {
		a = { bg = bg, fg = p.magenta, gui = bold },
	},
	replace = {
		a = { bg = bg, fg = p.yellow, gui = bold },
	},
	command = {
		a = { bg = bg, fg = p.red, gui = bold },
	},
	inactive = {
		a = { bg = bg, fg = p.cyan, gui = bold },
		b = { bg = bg, fg = p.magenta },
		c = { bg = bg, fg = p.dim, gui = italic },
	},
}
