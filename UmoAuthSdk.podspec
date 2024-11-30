Pod::Spec.new do |s|
    s.name             = 'UmoAuthSdk'
    s.version          = '1.0.12-internal'
    s.summary          = 'Umo auth sdk module for passenger authentication'
    s.homepage         = 'https://github.com/cts-platforms/umo-authsdk'
    s.license          = { :type => 'Proprietary', :file => 'LICENSE' }
    s.author           = { 'anand-kulk' => 'anand.kulkarni@cubic.com' }
    s.platform         = :ios, '13.0'
    # Download pre-built XCFrameworks from GitHub Releases instead of git
    s.source           = { 
      :http => "https://github.com/cts-platforms/umo-authsdk/releases/download/#{s.version}/UmoAuthSdk-XCFrameworks.zip"
    }
    
    # Specify the Flutter and App XCFrameworks (now at root of extracted ZIP)
    s.vendored_frameworks = [
      'Flutter.xcframework',
      'FlutterPluginRegistrant.xcframework',
      'App.xcframework',
      'UmoAuthSdk.xcframework',
      'amplify_auth_cognito.xcframework',
      'amplify_secure_storage.xcframework',
      'device_info_plus.xcframework',
      'package_info_plus.xcframework',
      'path_provider_foundation.xcframework',
      'url_launcher_ios.xcframework',
      'sms_autofill.xcframework'
    ]
  
    # If there are any resource bundles or plugins with resources, include them here
    #s.resource_bundles = {
    #  'UmoAuthsdkResources' => ['./umo-authsdk/assets/**/*']
    #}
  
    # Specify any system frameworks that your module depends on (e.g., UIKit)
    #s.frameworks = 'UIKit'
  
    # Any other dependencies (if required)
  end
