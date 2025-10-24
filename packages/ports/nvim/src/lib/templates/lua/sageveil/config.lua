local config = {}

---@type Options
config.options = {
	overrides = {},
	style = {
		bold = true,
		italic = true,
		transparent = false,
	},
}

---@param options Options | nil
function config.extend_options(options)
	config.options = vim.tbl_deep_extend("force", config.options, options or {})
end

return config
