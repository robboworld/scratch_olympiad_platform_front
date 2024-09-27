import { notification } from "antd"
import { GraphQLError } from "graphql"
import { ApolloError } from "apollo-client"
import { ArgsProps } from "antd/es/notification/interface"

import {
    StatusCode400Errors,
    StatusCode401Errors,
    StatusCode403Errors,
    StatusCode503Errors
} from '@/consts'
import { ExtensionErr } from "@/models"

export function handlingGraphqlErrors(error: ApolloError) {
    error.graphQLErrors.map(({ extensions }: GraphQLError) => {
        const { err }: any = extensions
        const { Code, Message }: ExtensionErr = err
        let notificationErr: ArgsProps = { message: '' }
        switch (Code) {
            case 400:
                notificationErr.message = 'Query error'
                notificationErr.description = handling400CodeError(Message)
                break
            case 401:
                notificationErr.message = 'Authorization error'
                notificationErr.description = handling401CodeError(Message)
                break
            case 403:
                notificationErr.message = 'Access error'
                notificationErr.description = handling403CodeError(Message)
                break
            case 500:
                notificationErr.message = 'Server side error'
                notificationErr.description = handling403CodeError(Message)
                break
            case 503:
                notificationErr.message = 'Function no available'
                notificationErr.description = handling503CodeError(Message)
                break
        }
        notification.error(notificationErr)
    })
}

function handling400CodeError(message: string): string {
    let description: string = ''
    switch (message) {
        case StatusCode400Errors.ErrCountryNotFoundInDB:
            description = 'Country not found.'
            break
        case StatusCode400Errors.ErrNominationNotFoundInDB:
            description = 'Nomination not found.'
            break
        case StatusCode400Errors.ErrEmailAlreadyInUse:
            description = 'Email already in use.'
            break
        case StatusCode400Errors.ErrAtoi:
            description = 'Incorrect data format.'
            break
        case StatusCode400Errors.ErrTimeParse:
            description = 'String to time error.'
            break
        case StatusCode400Errors.ErrIncorrectPasswordOrEmail:
            description = 'Wrong email or password. Please try again.'
            break
        case StatusCode400Errors.ErrNotFoundInDB:
            description = 'Entity no found.'
            break
        case StatusCode400Errors.ErrShortPassword:
            description = 'Password needs to be at least 8 character long.'
            break
        case StatusCode400Errors.ErrPasswordResetLinkInvalid:
            description = 'Password reset link invalid.'
            break
        case StatusCode400Errors.ErrPasswordResetLinkExpired:
            description = 'Password reset link expired.'
            break
        case StatusCode400Errors.ErrUserWithEmailNotFound:
            description = 'User with this email not found.'
            break
        case StatusCode400Errors.ErrApplicationAlreadySubmitted:
            description = 'application already submitted.'
            break
    }
    return description;
}

function handling401CodeError(message: string): string {
    let description: string = ''
    switch (message) {
        case StatusCode401Errors.ErrTokenExpired:
            description = 'Please, log in.'
            break
        case StatusCode401Errors.ErrNotStandardToken:
            description = 'Incorrect data format for authentication.'
            break
    }
    return description;
}

function handling403CodeError(message: string): string {
    let description: string = ''
    switch (message) {
        case StatusCode403Errors.ErrUserIsNotActive:
            description = 'Your account is not activated. Please, check your email.'
            break
        case StatusCode403Errors.ErrProjectPageIsBanned:
            description = 'This project was blocked by administrator.'
            break
        case StatusCode403Errors.ErrAccessDenied:
            description = 'Access denied.'
            break
        case StatusCode403Errors.ErrDoesNotMatchAgeCategory:
            description = 'Does not match the age category.'
            break
    }
    return description;
}

function handling503CodeError(message: string): string {
    let description: string = ''
    switch (message) {
        case StatusCode503Errors.ErrActivationLinkUnavailable:
            description = 'Activation by link is not available at the moment..'
            break
    }
    return description;
}