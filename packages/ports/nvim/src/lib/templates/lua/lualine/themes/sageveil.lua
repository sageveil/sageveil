local p = require("sageveil.palette")

return {
	normal = {
		a = { bg = p.yellow, fg = p.black, gui = "bold" },
		b = { bg = p.surface, fg = p.yellow_bright },
		c = { bg = p.black, fg = p.white },
	},
	insert = {
		a = { bg = p.cyan, fg = p.black, gui = "bold" },
		b = { bg = p.surface, fg = p.cyan },
		c = { bg = p.black, fg = p.white },
	},
	visual = {
		a = { bg = p.magenta, fg = p.black, gui = "bold" },
		b = { bg = p.surface, fg = p.magenta },
		c = { bg = p.black, fg = p.white },
	},
	replace = {
		a = { bg = p.green, fg = p.black, gui = "bold" },
		b = { bg = p.surface, fg = p.green },
		c = { bg = p.black, fg = p.white },
	},
	command = {
		a = { bg = p.red, fg = p.white, gui = "bold" },
		b = { bg = p.surface, fg = p.red },
		c = { bg = p.black, fg = p.white },
	},
	inactive = {
		a = { bg = p.black, fg = p.dim, gui = "bold" },
		b = { bg = p.black, fg = p.dim },
		c = { bg = p.black, fg = p.dim },
	},
}
