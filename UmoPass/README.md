# UmoPass
The *UmoPass* SDK allows easy use of *Umo Pass* ticketing systems.

## Contents

1. [Register a new user](#register-a-new-user)
1. [Sign in an existing user](#sign-in)
1. [Select an agency](#select-an-agency)
1. [Add a credit card](#add-a-credit-card)
1. [Delete a credit card](#delete-a-credit-card)
1. [Purchase a fare product](#purchase-a-fare-product)
1. [Configure Autoload](#configure-autoload)
1. [Convert card account to mobile account](#convert-card-account-to-mobile-account)
1. [Convert a card with no associated account into a mobile account](#convert-a-card-with-no-associated-account-into-a-mobile-account)
1. [Display account QR code](#display-account-qr-code)
1. [Display retail bar code](#display-retail-bar-code)

## Register a new user

**Steps**
1. Call the following function found in *Pass.swift*:
``` swift
func register(username: String,
              password: String,
              phoneNumber: String?,
              email: String?,
              cardNumber: String?,
              currentLocation: CLLocationCoordinate2D?,
              completion: @escaping EmptyCompletion)
```

## Sign In

**Prerequisites**
- An existing TouchPass user. A new user can be created by [registering](#register-a-new-user)

**Steps**
1. Call the following function found in *Pass.swift*:
``` swift
func signIn(username: String,
            password: String,
            deviceChangeIfNeeded: Bool = true,
            currentLocation: CLLocationCoordinate2D?,
            completion: @escaping EmptyCompletion)
```

## Select an agency

**Prerequisites**
- A [signed-in](#sign-in) user

**Steps**
1. Fetch agencies to select using one of the following two functions found in *Pass.swift*:
``` swift
func fetchAgencies(completion: @escaping AgencyListCompletion)
func fetchAgencies(near location: CLLocationCoordinate2D,
                   completion: @escaping AgencyListCompletion)
```
2. Pass the desired agency to the following function found in *Pass.swift*:
``` swift
func selectAgency(agency: Agency,
                  completion: @escaping EmptyCompletion)
```

## Add a credit card

*Note*: This will only add a credit card for the agency the user currently has selected. A separate payment method must be added for each agency that a product is to be purchased from. Only one payment method can be configured per agency at a time. To replace a credit card, you must [delete the current credit card](#delete-a-credit-card) first.

**Prerequisites**
- A [signed-in](#sign-in) user
- An agency [selected](#select-an-agency)

**Steps**
1. Ascertain credit card number validity and type with `validatedCreditCardFormat` found in *Pass.swift*.
2. Confirm the `CardType` is supported by the current agency by checking `supportedCardTypes` found on `agency` in *Pass.swift*.
3. Construct a `AddCreditCardModel` instance with the credit card info.
4. Pass the `AddCreditCardModel` instance to the following function found in *Pass.swift*:
``` swift
func addCreditCard(addCardModel: AddCreditCardModel,
                   completion: @escaping EmptyCompletion)
```

## Delete a credit card

**Prerequisites**
- A [signed-in](#sign-in) user

**Steps**
1. Get the credit card identifier, found on the current `user` property `paymentInfo` under `id`.
2. Pass the identifier to the following function found in *Pass.swift*:
``` swift
func deleteCreditCard(id: Int,
                      completion: @escaping EmptyCompletion)
```

## Purchase a fare product

**Prerequisites**
- A [signed-in](#sign-in) user
- An agency [selected](#select-an-agency)
- A [payment method](#add-a-credit-card) added for the selected agency

**Steps**
1. Fetch fare products viable for the signed-in user to purchase with the following function found in *Pass.swift*:
``` swift
func fetchFareProducts(completion: @escaping FareProductsCompletion)
```
2. Construct `ProductPurchase` instances to specify which fare products to purchase, how many of each, and if each product should have *autoload* enabled.
``` swift
let productPurchase = ProductPurchase(pass: passProduct, quantity: currentQuantity, shouldAutoload: false)
```
3. Pass the `ProductPurchase` instances to the following function found in *Pass.swift*:
``` swift
func purchaseFareProducts(products: [ProductPurchase],
                          completion: @escaping PassPurchaseCompletion)
```

## Configure Autoload

**Prerequisites**
- A [signed-in](#sign-in) user
- An agency [selected](#select-an-agency)

**Steps**
1. Call the following function found in *Pass.swift*:
```swift
func updateAutoload(enabled: Bool,
                    amount: Double,
                    completion: @escaping EmptyCompletion)
```

## Convert card account to mobile account

**Details**

This will convert a card account to a mobile account so the account can be used with the mobile app. Note that this is a one-way conversion -- once the account has been converted the card will be inactive and should be returned to the transit agency.

**Prerequisites**
- A configured user account with an active card
- The number of the card

**Steps**
1. Call the following function found in *Pass.swift*:
```swift
func convertCardAccountToMobileAccount(username: String,
                                       password: String,
                                       completion: @escaping EmptyCompletion)
```

## Convert a card with no associated account into a mobile account

**Details**

This will convert a card to a mobile account so the balances and passes associated with the card may be used with a mobile account instead. Note that this is a one-way conversion -- once the account has been converted the card will be inactive and should be returned to the transit agency.

**Prerequisites**
- An active card number

**Steps**
1. Check the card number is valid for use with the following function found in *Pass.swift*:
```swift
func checkCardValidity(cardNumber: String,
                       completion: @escaping EmptyCompletion)
```
2. Warn the user that this is a one-way conversion and their card will become unusable after the conversion is complete.
3. If the card number is valid, pass the card number along with new user registration details to the following function found in *Pass.swift*:
```swift
func register(username: String,
              phoneNumber: String,
              password: String,
              cardNumber: String?,
              completion: @escaping EmptyCompletion)
```

## Display account QR code

**Details**

This will return a QR code image that, when scanned by an official reader, will be connected to the current user's account so the reader can check if the user has the proper stored value or pass needed to ride the vehicle of the reader.

**Steps**
1. Configure and display a `UIImageView` to have a 1:1 aspect ratio and take up nearly the entire device's screen width without distorting.
2. Call the following function found in *Pass.swift* and assign the returned `UIImage` to the `UIImageView` instance's `image` property:
```swift
func generateQRCode(mediaId: Int64? = nil,
                    key: String? = nil,
                    location: CLLocationCoordinate2D?) -> UIImage?
```
3. Repeat step 2 every 0.2 seconds while the `UIImageView` is being displayed.

## Display retail bar code

**Details**

This will return a one dimensional bar code image for use by retailers.

**Steps**
1. Configure and display a `UIImageView` to have a 302:47 (width:height) aspect ratio and take up nearly the entire device's screen width without distorting.
2. Call the following function found in *Pass.swift* and assign the returned `UIImage` to the `UIImageView` instance's `image` property:
```swift
func generateRetailBarcode(cardNumber: String? = nil) -> UIImage?
```
