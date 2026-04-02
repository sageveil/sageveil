set -Ux FZF_DEFAULT_OPTS "
	--color=fg:<%= it.extras.muted %>,bg:<%= it.extras.overlay %>,hl:<%= it.ansi.bright.white %>
	--color=fg+:<%= it.extras.muted %>,bg+:<%= it.extras.highlight %>,hl+:<%= it.ansi.bright.white %>
	--color=border:<%= it.extras.border %>,header:<%= it.ansi.base.green %>,gutter:<%= it.extras.surface %>
	--color=spinner:<%= it.ansi.base.yellow %>,info:<%= it.ansi.base.blue %>,separator:<%= it.extras.border %>
	--color=pointer:<%= it.ansi.base.magenta %>,marker:<%= it.extras.highlight %>,prompt:<%= it.extras.muted %>"
