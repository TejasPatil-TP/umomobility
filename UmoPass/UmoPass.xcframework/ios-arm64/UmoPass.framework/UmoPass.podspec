
Pod::Spec.new do |spec|
  spec.name         = 'UmoPass'
  spec.version      = '0.4.3'
  spec.license      = { :type => 'MIT' }
  spec.homepage     = 'https://github.com/cts-platforms/app-sdk-ios'
  spec.authors      = { 'Patrick Dunshee' => 'patrick.dunshee@cubic.com' }
  spec.summary      = 'UmoPass SDK'
  spec.source       = { :git => 'git@github.com:cts-platforms/app-sdk-ios-internal.git', :tag => 'v0.1.0' }
  #spec.vendored_frameworks = 'buildproducts/universal/UmoPass/UmoPass.framework'
  spec.source_files = "Pass/**/*.{swift}"
  spec.framework    = 'SystemConfiguration'
  spec.swift_version = '5.0'
  spec.ios.deployment_target = '12.0'
  spec.osx.deployment_target = '10.10'
  spec.dependency 'CubicAuth', '~> 1.4'
end
