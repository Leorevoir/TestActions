{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
        version = pkgs.lib.strings.trim (builtins.readFile ./VERSION.md);
      in
      with pkgs;
      {

        devShells.default = mkShell {
          nativeBuildInputs = [
            cmake
            ninja
            mold
          ];
          shellHook = ''
            export PKG_CONFIG_PATH=${
              pkgs.lib.makeLibraryPath [
              ]
            }:$PKG_CONFIG_PATH
            export LD_LIBRARY_PATH=${
              pkgs.lib.makeLibraryPath [
              ]
            }:$LD_LIBRARY_PATH
          '';
        };

        packages.default = stdenv.mkDerivation {
          pname = "MemTide";
          inherit version;

          src = self;
          nativeBuildInputs = [
            cmake
            ninja
          ];

          configurePhase = ''
            cmake -S . -B Build -G Ninja -DCMAKE_BUILD_TYPE=Release
          '';

          buildPhase = ''
            cmake --build Build --parallel $NIX_BUILD_CORES
          '';

          installPhase = ''
            mkdir -p $out/bin $out/lib
            cp Build/MemTide $out/bin/
            cp -P Build/Source/MemTideCore/*.so* $out/lib/ || true
            cp -P Build/Source/MemTideCommon/*.so* $out/lib/ || true
          '';
        };

      }
    );
}
