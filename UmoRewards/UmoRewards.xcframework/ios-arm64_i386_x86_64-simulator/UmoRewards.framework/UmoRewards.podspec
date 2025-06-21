
Pod::Spec.new do |spec|
  spec.name         = 'UmoRewards'
  spec.version      = '0.1.1'
  spec.license      = { :type => 'MIT' }
  spec.homepage     = 'https://github.com/cts-platforms/app-sdk-ios-internal/SDK/UmoRewards'
  spec.authors      = { 'Patrick Dunshee' => 'patrick.dunshee@cubic.com' }
  spec.summary      = 'Umo Rewards'
  spec.source       = { :git => 'git@github.com:cts-platforms/app-sdk-ios-internal.git', :tag => 'v0.1.1' }
  #spec.vendored_frameworks = 'buildproducts/universal/UmoRewards/UmoRewards.framework'
  spec.source_files = "Rewards/**/*.{swift}"
  spec.framework    = 'SystemConfiguration'
  spec.swift_version = '5.0'
  spec.ios.deployment_target = '10.0'
  spec.osx.deployment_target = '10.10'
  spec.dependency 'SDWebImage', '~> 5.7'
  spec.dependency 'SSZipArchive', '~> 2.2'
  spec.resources = 'Rewards/**/*.{pfx}'
end
