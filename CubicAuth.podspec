Pod::Spec.new do |spec|
  spec.name         = 'CubicAuth'
  spec.version      = '1.4.3'
  spec.license      = 'COPYRIGHT - CUBIC (“CUBIC”). ALL RIGHTS RESERVED. Information Contained Herein is Proprietary and Confidential. The document is the property of CUBIC and may not be disclosed distributed, or reproduced without the express written permission of CUBIC.'
  spec.homepage     = 'https://github.com/cts-platforms/app-sdk-ios'
  spec.authors      = { 'Cubic' => 'CTSPlatformsMobileSupport@cubic.com' }
  spec.summary      = 'CubicAuth'
  spec.source       = { :git => 'https://github.com/cts-platforms/app-sdk-ios.git', :tag => 'CubicAuth-1.4.3' }
  spec.vendored_frameworks = 'CubicAuth/CubicAuth.xcframework'
  spec.framework    = 'SystemConfiguration'
  spec.swift_version = '5.0'
  spec.ios.deployment_target = '12.0'

end