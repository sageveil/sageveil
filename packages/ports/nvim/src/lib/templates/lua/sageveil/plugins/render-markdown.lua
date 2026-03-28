local palette = require("sageveil.palette")

---@param opts? PluginOptions
return function(opts)
	local bold = opts and opts.bold
	local italic = opts and opts.italic

	return {
		-- Headings (icon color)
		RenderMarkdownH1 = { fg = palette.green_bright, bold = bold },
		RenderMarkdownH2 = { fg = palette.magenta, bold = bold },
		RenderMarkdownH3 = { fg = palette.green, bold = bold },
		RenderMarkdownH4 = { fg = palette.cyan, bold = bold },
		RenderMarkdownH5 = { fg = palette.blue, bold = bold },
		RenderMarkdownH6 = { fg = palette.muted, bold = bold },

		-- Heading background lines (blended into black)
		RenderMarkdownH1Bg = { bg = palette.green_bright, blend = 30 },
		RenderMarkdownH2Bg = { bg = palette.magenta, blend = 30 },
		RenderMarkdownH3Bg = { bg = palette.green, blend = 30 },
		RenderMarkdownH4Bg = { bg = palette.cyan, blend = 30 },
		RenderMarkdownH5Bg = { bg = palette.blue, blend = 30 },
		RenderMarkdownH6Bg = { bg = palette.muted, blend = 30 },

		-- Code blocks
		RenderMarkdownCode = { bg = palette.overlay },
		RenderMarkdownCodeInfo = { fg = palette.muted, italic = italic },

		-- Quotes
		RenderMarkdownQuote = { fg = palette.dim, italic = italic },

		-- Lists
		RenderMarkdownBullet = { fg = palette.green },

		-- Checkboxes
		RenderMarkdownUnchecked = { fg = palette.muted },
		RenderMarkdownChecked = { fg = palette.green },
		RenderMarkdownTodo = { fg = palette.yellow },

		-- Tables
		RenderMarkdownTableHead = { fg = palette.green_bright, bold = bold },

		-- Links
		RenderMarkdownLink = { fg = palette.magenta },
		RenderMarkdownLinkTitle = { fg = palette.magenta_bright, underline = true },
	}
end
