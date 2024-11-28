// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "UmoAuthSdk",
    platforms: [
        .iOS(.v17)
    ],
    products: [
        .library(
            name: "UmoAuthSdk",
            targets: [
                          "amplify_auth_cognito",
                          "amplify_secure_storage",
                          "App",
                          "device_info_plus",
                          "Flutter",
                          "FlutterPluginRegistrant",
                          "package_info_plus",
                          "path_provider_foundation",
                          "UmoAuthSdk",
                          "url_launcher_ios"
            ]
        )
    ],
    dependencies: [
        // Dependencies declare other packages that this package depends on.
    ],
    targets: [
        .binaryTarget(
            name: "amplify_auth_cognito",
            url: "https://github.com/cts-platforms/umo-authsdk/releases/download/1.0.12-internal/amplify_auth_cognito.xcframework.zip",
            checksum: "62e25b8b10c1992d1268bc17c5d2a568d11880b3a0ee6f92f8337309811d10fd"
        ),
        .binaryTarget(
            name: "amplify_secure_storage",
            url: "https://github.com/cts-platforms/umo-authsdk/releases/download/1.0.12-internal/amplify_secure_storage.xcframework.zip",
            checksum: "0a580d97a4ba12b67b4131caa8b386c7ef9d8d5c5087678306253efdad1c5218"
        ),
        .binaryTarget(
            name: "App",
            url: "https://github.com/cts-platforms/umo-authsdk/releases/download/1.0.12-internal/App.xcframework.zip",
            checksum: "1c2ad5265cddae3ba075ddbe3d8f8143c46af6ac5ed69b09bfad3d16e5efea94"
        ),
        .binaryTarget(
            name: "device_info_plus",
            url: "https://github.com/cts-platforms/umo-authsdk/releases/download/1.0.12-internal/device_info_plus.xcframework.zip",
            checksum: "69b7b2902ac0007a2b4376486c509d01f65130f2d1c4b4588d93db1c02562945"
        ),
        .binaryTarget(
            name: "Flutter",
            url: "https://github.com/cts-platforms/umo-authsdk/releases/download/1.0.12-internal/Flutter.xcframework.zip",
            checksum: "a2983d4bbceb79d8c9aaaea007dc1fba162d406d4ea5863f4de8c9a201f64e3f"
        ),
        .binaryTarget(
            name: "FlutterPluginRegistrant",
            url: "https://github.com/cts-platforms/umo-authsdk/releases/download/1.0.12-internal/FlutterPluginRegistrant.xcframework.zip",
            checksum: "f379232f707463775ca533a11d73cdfdf6085f7d18f9faba524be21b7edf57d1"
        ),
        .binaryTarget(
            name: "package_info_plus",
            url: "https://github.com/cts-platforms/umo-authsdk/releases/download/1.0.12-internal/package_info_plus.xcframework.zip",
            checksum: "e3d6a18a290855e47a60a04038b051be12651bd12b67b7ee61042ff47bb9d305"
        ),
        .binaryTarget(
            name: "path_provider_foundation",
            url: "https://github.com/cts-platforms/umo-authsdk/releases/download/1.0.12-internal/path_provider_foundation.xcframework.zip",
            checksum: "35b55f4bf445fb13903eed40e3642919591f7901398967c5771a201087f1e275"
        ),
        .binaryTarget(
            name: "UmoAuthSdk",
            url: "https://github.com/cts-platforms/umo-authsdk/releases/download/1.0.12-internal/UmoAuthSdk.xcframework.zip",
            checksum: "74b66b260d914dbfa633a6ed3f418e73c97f94767fb17231fb504d58dbf5e076"
        ),
        .binaryTarget(
            name: "url_launcher_ios",
            url: "https://github.com/cts-platforms/umo-authsdk/releases/download/1.0.12-internal/url_launcher_ios.xcframework.zip",
            checksum: "7c19734b42f999d2da5ff0e9492d96b0134b08e21f60878fff6af5ec5e98764f"
        )
    ]
)
