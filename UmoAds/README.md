# UmoAds
The *UmoAds* SDK allows easy use of *Umo Ads* platform.

## Contents

1. [Configure for anonymous ads authentication](#configure-for-anonymous-ads-authentication)
1. [Set a JWT token manually](#set-a-jwt-token-manually)
1. [Configure your own JWT provider](#configure-your-own-jwt-provider)
1. [Configure a placeholder image](#configure-a-placeholder-image)
1. [Display an ad](#display-an-ad)
1. [Listen to ad loading results](#listen-to-ad-loading-results)

## Configure for anonymous ads authentication

**Steps**
1. Find your Cubic client identifier and client secret. If you do not have these, please contact Cubic support.
1. Pass the client identifier and secret to the following function found in *Ads.swift*:
``` swift
func setClientId(_ clientId: String, clientSecret: String)
```

## Set a JWT token manually

**Details**

Use if you want to handle authentication entirely on your own including refreshing the token when it is about to expire.

**Steps**
1. Call the following function found in *Ads.swift*:
``` swift
func setJWTToken(_ jwtToken: String)
```

## Configure your own JWT provider

**Details**

Use this if you have a way to authenticate and get a JWT token and want to be called upon to refresh the token when it is expired or about to be expired.

**Steps**
1. Configure your `JWTProviderClosure` to call your own asynchronous authentication function, then return the result to the completion parameter of the closure. An example could look like this:
```swift
let provider: JWTProviderClosure = { completion in
    myAuthenticationFunction { result // where `result` is of type `(Result<JWTToken, Error>)`
      completion(result)
    }
}
```
2. Set your provider with the following function found in *Ads.swift*, and specify whether or not you want your provider to immediately be called upon being set:
```swift
func setJWTTokenProvider(callProviderImmediately: Bool, jwtTokenProvider: JWTProviderClosure?)
```

## Configure a placeholder image

**Details**

A placeholder image can be defined that shows before an ad finishes loading and when the ad fails to load. Only one placeholder image can be defined per `AdSize`. The ad should fit the aspect ratio of the `AdSize`, the dimensions of which can be found in *AdSize.swift*.

**Steps**
1. Call the following function found in *Ads.swift* for each ad size you want to define a placeholder for:
```swift
func setPlaceholderImage(adSize: AdSize, placeholder: UIImage)
```

## Display an ad

**Details**

Each spot in your app layout with an ad is considered one ad slot, and should have its own ad slot identifier for analytics purposes.

**Prerequisites**
- An authenticated session via [provider](#configure-your-own-jwt-provider) or [manually](#set-a-jwt-token-manually), or anonymously via valid [client identifier and secret](#configure-for-anonymous-ads-authentication)
- A valid ad slot identifier. If you do not have this, contact Cubic support.

**Steps**
1. Create a `GenericAdView` instance with your ad slot identifier and corresponding `AdSize` for that ad slot. If your ad slot identifier was "abc" and that ad slot was of size "mobile banner", it would look like this:
``` swift
let genericAdView = GenericAdView(adSlotId: "abc", adSize: .mobileBanner)
```
2. Add the view to your view hierarchy according to your design specifications. The view will not add its own constraints in order to give your app full control, but you can use the following convenience function on the `GenericAdView` to define the aspect ratio so your ad does not get stretched:
```swift
func addAspectRatioConstraints() -> NSLayoutConstraint
```
3. Load the ad with the following function found in *Ads.swift*:
```swift
func loadAd(adView: BaseAdView, completion: EmptyCompletion? = nil)
```

## Listen to ad loading results

**Details**

There are multiple ways to detect when an ad loads successfully or unsuccessfully. Three ways are listed here, each with different purposes.

**Options**
1. To listen to every ad load in your app including automatic refreshes in one location, create your own object that conforms to the `AdListener` protocol, then assign it to the `Ads` singleton with the following function found in *Ads.swift*:
```swift
func setUniversalAdListener(_ adListener: AdListener)
```
2. To listen to a single ad view's loading including automatic refreshes, create your own object that conforms to the `AdViewListener` protocol, then assign it to the `adViewListener` property found on the `BaseAdView`.
3. To listen to a single ad view's initial loading only, simply use the completion block provided in the required loading function found in *Ads.swift*:
```swift
func loadAd(adView: BaseAdView, completion: EmptyCompletion? = nil)
```
