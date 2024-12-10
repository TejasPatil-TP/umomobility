# CubicAuth
The *CubicAuth* SDK can maintain *Cubic ID* authentication sessions.

## Contents

1. [Authenticate anonymously](#authenticate-anonymously)

## Authenticate anonymously

**Steps**
1. Wrap your auth requiring a *Cubic ID* JWT token in a closure passed to the following function on the *Auth.shared* singleton instance, passing `true` to the `canUseAnonymous` parameter:
``` swift
func retrieveAndRefreshTokenIfNeeded(canUseAnonymous: Bool,
                                                completion: @escaping JWTRetrievedCompletion)
```
