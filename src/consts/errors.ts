export enum StatusCode400Errors {
    ErrCountryNotFoundInDB      = "country not found",
    ErrNominationNotFoundInDB   = "nomination not found",
    ErrEmailAlreadyInUse        = "email already in use",
    ErrAtoi                     = "string to int error",
    ErrTimeParse                = "string to time error",
    ErrIncorrectPasswordOrEmail = "incorrect password or email",
    ErrNotFoundInDB             = "not found",
    ErrShortPassword            = "please input password, at least 8 symbols",
    ErrPasswordResetLinkInvalid = "password reset link invalid",
	ErrPasswordResetLinkExpired = "password reset link expired",
    ErrUserWithEmailNotFound    = "user with this email not found",
}

export enum StatusCode401Errors {
    ErrTokenExpired = "token expired",
    ErrNotStandardToken = "token claims are not of type *StandardClaims",
}

export enum StatusCode403Errors {
    ErrUserIsNotActive = "user is not active. please check your email",
    ErrProjectPageIsBanned = "the projectPage is banned. no access",
    ErrAccessDenied = "access denied",
    ErrDoesNotMatchAgeCategory = "does not match the age category",
}

export enum StatusCode503Errors {
    ErrActivationLinkUnavailable = "activation link is currently unavailable"
}