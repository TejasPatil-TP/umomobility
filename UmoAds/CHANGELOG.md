# UmoAds Change Log

This document contains all changes made to the _UmoAds_ for each release along with upgrade steps.

## [2.5.2] - 2023-1-30

* Compile with Xcode 13.4.1

## [2.5.1] - 2023-1-24

* Change CubicAuth dependency from 1.4.0 to 1.4.x

## [2.5.0] - 2022-12-15

* Use CubicAuth 1.4.0 to support internationalization

## [2.4.3] - 2022-8-2

* Open tap targets using default OS handling instead of custom web view

## [2.4.2] - 2022-8-1

* Restore Objective-C visibility to UMOAdKitBannerParams

## [2.4.1] - 2022-7-26

* Fixed SDWebImage dependency removal

## [2.4.0] - 2022-7-25

### Changed

* Add support for SK Ad Network

### Migration Steps

* Follow Apple's guide for configuring an app found [here](https://developer.apple.com/documentation/storekit/skadnetwork/configuring_a_source_app) using the following identifiers:
 - qyJfv329m4.skadnetwork
 - cdkw7geqsh.skadnetwork

## [2.3.8] - 2022-5-17

* Support App Store placeholder link

## [2.3.7] - 2022-5-9

* Fix refresh showing placeholder under ad issue

## [2.3.6] - 2022-4-26

* Update license

## [2.3.5] - 2022-4-21

* Fix auto-refresh interval priority order to app > hosted config > default

## [2.3.4] - 2022-4-20

* Fix objective-c runtime threading issue
* Display placeholder image on empty content fetch

## [2.3.3] - 2022-4-14

* Make UMOAdKitBannerParams and UMOAdKitAdPosition Objective-C compatible

## [2.3.2] - 2022-4-12

* Improved ability to use both assigned banner parameter values and hosted banner parameter values

## [2.3.1] - 2022-4-12

* Read app name and version from bundle's localized info dictionary

## [2.3.0] - 2022-4-7

### Changed

* Fix rendering issue of programmatic ads
* Externalize HTML template file to adapt to new programmatic ad types

### Migration Steps

* Rename AKBannerState to UMOAdKitBannerState (if used)
* Update UMOAdKitBannerAdListener (if used) function names:
* onUMOAdKitBannerEvent to onBannerEvent
* onUMOAdKitAppGetUpdatedQSParams to getQSParams
* Replace AKBannerState with UMOAdKitBannerState (if used)

## [2.2.4] - 2022-1-21

* Revert to placeholder when new ad is not returned from server

## [2.2.3] - 2021-12-16

* Fix display of programmatic ads

## [2.2.2] - 2021-12-9

* Fit ad content to full area

## [2.2.1] - 2021-11-29

* Fix banner prefetch and show race condition

## [2.2.0] - 2021-11-17

* Cache parameters for faster ad load-time

## [2.1.0] - 2021-11-16

* Update dev-2 environment to demo
* Display placeholder image faster
* Add API to `Ads` to set placeholder URL: `setGenericPlaceholderClickURL`

## [2.0.8] - 2021-11-10

* Compile with Xcode 12

## [2.0.7]

* Update CubicAuth dependency to ~> 1.2

## [2.0.6]

* Fix environment switch issue

## [2.0.5]

* Add `BANNER_LOAD_STARTED` event
* Fix overlap of placeholder and ad display

## [2.0.4]

* Reduce iOS deployment target from 12.1 to 12.0

## [2.0.3]

* Remove Ad Identifier usage, making App Tracking no longer required

## [2.0.2]

* Give UmoAdKitParams Objective-C members

## [2.0.1]

### Changed

* Update copyright headers

## [2.0.0]

New ads backend and APIs.

### Added

* New UMOAdKit classes to use the new backend, such as `UMOAdKitBannerView`

### Changed

* Now uses _CubicAuth_ SDK as a dependency.

### Migration Steps 1.x => 2.x

* Add NSCalendarsUsageDescription to your Info.plist if it does not already exist — the new SDK has the ability to create calendar events via ad interaction
 * In AppDelegate/Startup:
     1. No changes to JWTProvider/general authentication
     1. Replace `Ads.shared.updateRegionId(X)` with `Ads.shared.updateUmoRegionId(X)`, only in the _Umo_ app.
     1. No changes to clientId or clientSecret
     1. Placeholder: Use the following function, where the `assetTitle` parameter is the name of the image in your assets folder, and it must be as big as the widest phone device supported at the existing aspect ratio (size 414x65 recommended). `Ads.shared.setGenericPlaceholder(assetTitle: "placeholder_umo_banner")`
     1. Set the publisher ID like so: `Ads.shared.umoAdKitParams.publisherId = "YOUR_PUBLISHER_ID"`
     1. Begin prefetching the ad like so: `Ads.shared.prefetchAd(spotId: "YOUR_AD_SLOT_ID", hostedParamsOverride: nil, bannerType: .ADAPTIVE_GWxAH, completion: { _ in })`
 - In the view controller holding the ad:
     1. Retrieve the banner view like so: `let bannerView = Ads.shared.getOrGenerateBannerAd(spotId: "YOUR_AD_SLOT_ID")`
     1. Add the ad to the view hierarchy by pinning to the superview's sides, one vertical edge, then add the aspect ratio constraint like so: `bannerView.addAdaptiveAspectRatioConstraint()`
     1. Load the ad with the following function:
     ``` swift
     Ads.shared.showAd(spotId: "YOUR_AD_SLOT_ID", bannerView: bannerView, assignHostedParams: true, bannerType: .ADAPTIVE_GWxAH) { result in
         switch result {
         case .success(_):
             print("show success")
         case .failure(let error):
             print("show failure: \(error.localizedDescription)")
         }
     }
     ```
     1. In the view controller's deinit, add the following: `Ads.shared.parentViewControllerDeinitializingFor(adView: bannerView)`
     1. In the view controller's viewWillAppear, add the following: `Ads.shared.parentViewControllerAppearingFor(adView: bannerView)`

## [1.0.0] - 2021-04-29

First _UmoAds_ SDK release.

### Added

* Image and HTML Ads display and reporting functionality.

### Changed

### Fixed
