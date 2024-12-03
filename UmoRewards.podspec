Pod::Spec.new do |spec|
  spec.name         = 'UmoRewards'
  spec.version      = '0.1.2'
  spec.license      = 'COPYRIGHT - CUBIC (“CUBIC”). ALL RIGHTS RESERVED. Information Contained Herein is Proprietary and Confidential. The document is the property of CUBIC and may not be disclosed distributed, or reproduced without the express written permission of CUBIC.'
  spec.homepage     = 'https://github.com/cts-platforms/app-sdk-ios'
  spec.authors      = { 'Cubic' => 'CTSPlatformsMobileSupport@cubic.com' }
  spec.summary      = 'UmoRewards'
  spec.source       = { :git => 'https://github.com/cts-platforms/app-sdk-ios.git', :tag => 'UmoRewards-0.1.2' }
  spec.vendored_frameworks = 'UmoRewards/UmoRewards.xcframework'
  spec.framework    = 'SystemConfiguration'
  spec.swift_version = '5.0'
  spec.ios.deployment_target = '10.0'
  spec.dependency 'SDWebImage', '~> 5.7'
  spec.dependency 'SSZipArchive', '~> 2.2'

end