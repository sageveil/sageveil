set shell := ["zsh", "-cu"]

alias g := generate-all
alias t := test-all

default:
  @just --list

# Install workspace dependencies.
init:
  pnpm install
  pnpm prepare

# Show available Nx projects.
projects:
  pnpm nx show projects

# Create a new port package.
new-port name *args='':
  pnpm nx g @sageveil/nx:port --name {{name}} {{args}}

# Generate artifacts for all ports.
generate-all:
  pnpm nx run-many -t generate

# Generate artifacts for a port project.
generate port:
  pnpm nx run {{port}}:generate

# Clean generated artifacts for all port projects.
clean-all:
  pnpm nx run-many -t clean 

# Clean generated artifacts for a port project.
clean port:
  pnpm nx run {{port}}:clean

# Run lint for all projects.
lint-all:
  pnpm nx run-many -t lint

# Run lint for a single project.
lint project:
  pnpm nx run {{project}}:lint

# Run typecheck for a single project.
typecheck project:
  pnpm nx run {{project}}:typecheck

# Run all tests.
test-all:
  pnpm nx run-many -t test

# Run tests for a single project.
test project:
  pnpm nx run {{project}}:test

# Build the site.
site-build:
  pnpm nx run site:build

# Start the site dev server.
site-dev:
  pnpm nx run site:serve

# Preview the site production build.
site-preview:
  pnpm nx run site:preview

# Generate the site port manifest.
site-generate-ports:
  pnpm nx run site:generate-ports

