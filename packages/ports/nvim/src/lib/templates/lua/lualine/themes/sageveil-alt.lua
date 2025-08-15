local p = require("sageveil.palette")

return {
	normal = {
		a = { bg = p.black, fg = p.cyan, gui = "bold" },
		b = { bg = p.black, fg = p.magenta },
		c = { bg = p.black, fg = p.muted, gui = "italic" },
	},
	insert = {
		a = { bg = p.black, fg = p.yellow, gui = "bold" },
	},
	visual = {
		a = { bg = p.black, fg = p.magenta, gui = "bold" },
	},
	replace = {
		a = { bg = p.black, fg = p.green, gui = "bold" },
	},
	command = {
		a = { bg = p.black, fg = p.red, gui = "bold" },
	},
	inactive = {
		a = { bg = p.black, fg = p.cyan, gui = "bold" },
		b = { bg = p.black, fg = p.magenta },
		c = { bg = p.black, fg = p.dim, gui = "italic" },
	},
}
