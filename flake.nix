{
  description = "Flake with development shell";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
  };

  outputs = {
    self,
    nixpkgs,
  }: let
    allSystems = [
      "x86_64-linux" # 64-bit Intel/AMD Linux
      "aarch64-linux" # 64-bit ARM Linux
      "x86_64-darwin" # 64-bit Intel macOS
      "aarch64-darwin" # 64-bit ARM macOS
    ];

    forAllSystems = f:
      nixpkgs.lib.genAttrs allSystems (system:
        f {
          pkgs = import nixpkgs {inherit system;};
        });
  in {
    devShells = forAllSystems ({pkgs}: {
      default = pkgs.mkShell {
        name = "sageveil-sh";
        packages = with pkgs; [
          nodejs_24
          (pnpm.override {nodejs = nodejs_24;})
          typescript
          vtsls
          vscode-langservers-extracted
          gh
        ];
      };
    });
  };
}
