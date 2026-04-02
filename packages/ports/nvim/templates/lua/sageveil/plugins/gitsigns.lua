local palette = require("sageveil.palette")

---@param opts? PluginOptions
return function(opts)
	_ = opts

	return {
		GitSignsAdd = { fg = palette.green },
		GitSignsChange = { fg = palette.yellow },
		GitSignsDelete = { fg = palette.red },
	}
end
