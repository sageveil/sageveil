$ENV:FZF_DEFAULT_OPTS = @"
	--color=fg:<%= it.ansi.base.white %>,bg:<%= it.ansi.base.black %>,hl:<%= it.ansi.base.green %>
	--color=fg+:<%= it.ansi.base.white %>,bg+:<%= it.extras.highlight %>,hl+:<%= it.ansi.bright.green %>
	--color=border:<%= it.extras.border %>,header:<%= it.extras.muted %>,gutter:<%= it.ansi.base.black %>
	--color=spinner:<%= it.ansi.base.green %>,info:<%= it.extras.muted %>,separator:<%= it.extras.border %>
	--color=pointer:<%= it.ansi.bright.green %>,marker:<%= it.ansi.base.green %>,prompt:<%= it.ansi.base.green %>
"@
