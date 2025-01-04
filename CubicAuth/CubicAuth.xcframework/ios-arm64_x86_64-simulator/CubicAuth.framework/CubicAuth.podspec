
Pod::Spec.new do |spec|
  spec.name         = 'CubicAuth'
  spec.version      = '1.4.3'
  spec.license      = { :type => 'MIT' }
  spec.homepage     = 'https://github.com/cts-platforms/app-sdk-ios'
  spec.authors      = { 'Patrick Dunshee' => 'patrick.dunshee@cubic.com' }
  spec.summary      = 'CubicAuth SDK'
  spec.source       = { :git => 'git@github.com:cts-platforms/app-sdk-ios-internal.git', :tag => 'v0.1.0' }
  #spec.vendored_frameworks = 'buildproducts/universal/CubicAuth/CubicAuth.framework'
  spec.source_files = "Auth/**/*.{swift}"
  spec.framework    = 'SystemConfiguration'
  spec.swift_version = '5.0'
  spec.ios.deployment_target = '12.0'
  spec.osx.deployment_target = '10.10'
end
