/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n                    mutation RefreshToken($refreshToken: String!) {\n                            RefreshToken(refreshToken: $refreshToken) { \n                                ... on SignInResponse {\n                                accessToken\n                            }\n                        }\n                    }\n                ": types.RefreshTokenDocument,
    "\n    mutation UpdateUser($input: UpdateUser!){\n        UpdateUser(input: $input) {\n            ... on UserHttp {\n                id\n                email\n                fullName\n                fullNameNative\n            }\n        }\n    }\n": types.UpdateUserDocument,
    "\n    mutation SignIn($input: SignIn!){\n        SignIn(input: $input) {\n            ... on SignInResponse {\n                accessToken\n                refreshToken\n            }\n        }\n    }\n": types.SignInDocument,
    "\n    mutation SignUp($input: SignUp!){\n        SignUp(input: $input) {\n            ... on Response{\n                    ok\n                }\n            }\n        }\n": types.SignUpDocument,
    "\n    mutation CreateUser($input: NewUser!){\n        CreateUser(input: $input) {\n            ... on UserHttp {\n                id\n                email\n                fullName\n                fullNameNative\n            }\n        }\n    }\n": types.CreateUserDocument,
    "\n    mutation SetUserIsActive($id: ID!, $isActive: Boolean!){\n        SetUserIsActive(id: $id, isActive: $isActive) {\n            ok\n        }\n    }\n": types.SetUserIsActiveDocument,
    "\n    mutation ConfirmActivation($activationLink: String!){\n        ConfirmActivation(activationLink: $activationLink) {\n            ... on SignInResponse {\n                accessToken\n                refreshToken\n            }\n        }\n    }\n": types.ConfirmActivationDocument,
    "\n    mutation ResetPassword($resetLink: String!){\n        ResetPassword(resetLink: $resetLink) {\n            ok\n        }\n    }\n": types.ResetPasswordDocument,
    "\n    mutation SetActivationByLink($activationByLink: Boolean!){\n        SetActivationByLink(activationByLink: $activationByLink) {\n            ok\n        }\n    }\n": types.SetActivationByLinkDocument,
    "\n    mutation UpdateProjectPage($input: UpdateProjectPage!){\n        UpdateProjectPage(input: $input) {\n            id\n        }\n    }\n": types.UpdateProjectPageDocument,
    "\n    mutation DeleteProjectPage($id: ID!){\n        DeleteProjectPage(id: $id) {\n            ok\n        }\n    }\n": types.DeleteProjectPageDocument,
    "\n    mutation DeleteUser($id: ID!){\n        DeleteUser(id: $id) {\n            ok\n        }\n    }\n": types.DeleteUserDocument,
    "\n    mutation SetIsBanned($projectPageId: ID!, $isBanned: Boolean!){\n        SetIsBanned(projectPageId: $projectPageId, isBanned: $isBanned) {\n            ok\n        }\n    }\n": types.SetIsBannedDocument,
    "\n    mutation ForgotPassword($email: String!) {\n        ForgotPassword(email: $email) {\n            ok\n        }\n    }\n": types.ForgotPasswordDocument,
    "\n    mutation CreateApplication($input: NewApplication!){\n        CreateApplication(input: $input) {\n            ... on ApplicationHttp {\n                id\n                nomination\n            }\n        }\n    }\n": types.CreateApplicationDocument,
    "\n    query GetUserById($id: ID!){\n        GetUserById(id: $id) {\n            ... on UserHttp {\n                id\n                email\n                fullName\n                fullNameNative\n                city\n                country\n                birthdate \n                createdAt\n                role\n                updatedAt\n                isActive\n            }\n        }\n    }\n": types.GetUserByIdDocument,
    "\n    query GetAllUsers($page: Int, $pageSize: Int, $active: Boolean!, $roles: [Role!]!){\n        GetAllUsers(page: $page, pageSize: $pageSize, active: $active, roles: $roles) {\n            users {\n                id\n                email\n                fullName\n                fullNameNative\n            }\n            countRows\n        }\n    }\n": types.GetAllUsersDocument,
    "\n    query GetAllProjectPagesByAccessToken($page: Int, $pageSize: Int){\n        GetAllProjectPagesByAccessToken(page: $page, pageSize: $pageSize) {\n            projectPages{\n                id\n                title\n                isShared\n                isBanned\n            }\n            countRows\n        }\n    }\n": types.GetAllProjectPagesByAccessTokenDocument,
    "\n    query GetAllProjectPagesByAuthorId($id: ID!, $page: Int, $pageSize: Int){\n        GetAllProjectPagesByAuthorId(id: $id, page: $page, pageSize: $pageSize) {\n            projectPages{\n                id\n                title\n                isShared\n                isBanned\n            }\n            countRows\n        }\n    }\n": types.GetAllProjectPagesByAuthorIdDocument,
    "\n    query GetProjectPageById($id: ID!){\n        GetProjectPageById(id: $id) {\n            id\n            authorId\n            createdAt\n            updatedAt\n            projectId\n            title\n            instruction\n            notes\n            linkToScratch\n            isShared\n            isBanned\n            projectUpdatedAt\n        }\n    }\n": types.GetProjectPageByIdDocument,
    "\n  query GetAllCountries {\n  GetAllCountries {\n    countries {\n      name\n    }\n    countRows\n  }\n}\n": types.GetAllCountriesDocument,
    "\n  query GetAllNominations {\n  GetAllNominations {\n    nominations {\n      name\n    }\n    countRows\n  }\n}\n": types.GetAllNominationsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n                    mutation RefreshToken($refreshToken: String!) {\n                            RefreshToken(refreshToken: $refreshToken) { \n                                ... on SignInResponse {\n                                accessToken\n                            }\n                        }\n                    }\n                "): (typeof documents)["\n                    mutation RefreshToken($refreshToken: String!) {\n                            RefreshToken(refreshToken: $refreshToken) { \n                                ... on SignInResponse {\n                                accessToken\n                            }\n                        }\n                    }\n                "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateUser($input: UpdateUser!){\n        UpdateUser(input: $input) {\n            ... on UserHttp {\n                id\n                email\n                fullName\n                fullNameNative\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateUser($input: UpdateUser!){\n        UpdateUser(input: $input) {\n            ... on UserHttp {\n                id\n                email\n                fullName\n                fullNameNative\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation SignIn($input: SignIn!){\n        SignIn(input: $input) {\n            ... on SignInResponse {\n                accessToken\n                refreshToken\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation SignIn($input: SignIn!){\n        SignIn(input: $input) {\n            ... on SignInResponse {\n                accessToken\n                refreshToken\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation SignUp($input: SignUp!){\n        SignUp(input: $input) {\n            ... on Response{\n                    ok\n                }\n            }\n        }\n"): (typeof documents)["\n    mutation SignUp($input: SignUp!){\n        SignUp(input: $input) {\n            ... on Response{\n                    ok\n                }\n            }\n        }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateUser($input: NewUser!){\n        CreateUser(input: $input) {\n            ... on UserHttp {\n                id\n                email\n                fullName\n                fullNameNative\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation CreateUser($input: NewUser!){\n        CreateUser(input: $input) {\n            ... on UserHttp {\n                id\n                email\n                fullName\n                fullNameNative\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation SetUserIsActive($id: ID!, $isActive: Boolean!){\n        SetUserIsActive(id: $id, isActive: $isActive) {\n            ok\n        }\n    }\n"): (typeof documents)["\n    mutation SetUserIsActive($id: ID!, $isActive: Boolean!){\n        SetUserIsActive(id: $id, isActive: $isActive) {\n            ok\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation ConfirmActivation($activationLink: String!){\n        ConfirmActivation(activationLink: $activationLink) {\n            ... on SignInResponse {\n                accessToken\n                refreshToken\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation ConfirmActivation($activationLink: String!){\n        ConfirmActivation(activationLink: $activationLink) {\n            ... on SignInResponse {\n                accessToken\n                refreshToken\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation ResetPassword($resetLink: String!){\n        ResetPassword(resetLink: $resetLink) {\n            ok\n        }\n    }\n"): (typeof documents)["\n    mutation ResetPassword($resetLink: String!){\n        ResetPassword(resetLink: $resetLink) {\n            ok\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation SetActivationByLink($activationByLink: Boolean!){\n        SetActivationByLink(activationByLink: $activationByLink) {\n            ok\n        }\n    }\n"): (typeof documents)["\n    mutation SetActivationByLink($activationByLink: Boolean!){\n        SetActivationByLink(activationByLink: $activationByLink) {\n            ok\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateProjectPage($input: UpdateProjectPage!){\n        UpdateProjectPage(input: $input) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateProjectPage($input: UpdateProjectPage!){\n        UpdateProjectPage(input: $input) {\n            id\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteProjectPage($id: ID!){\n        DeleteProjectPage(id: $id) {\n            ok\n        }\n    }\n"): (typeof documents)["\n    mutation DeleteProjectPage($id: ID!){\n        DeleteProjectPage(id: $id) {\n            ok\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteUser($id: ID!){\n        DeleteUser(id: $id) {\n            ok\n        }\n    }\n"): (typeof documents)["\n    mutation DeleteUser($id: ID!){\n        DeleteUser(id: $id) {\n            ok\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation SetIsBanned($projectPageId: ID!, $isBanned: Boolean!){\n        SetIsBanned(projectPageId: $projectPageId, isBanned: $isBanned) {\n            ok\n        }\n    }\n"): (typeof documents)["\n    mutation SetIsBanned($projectPageId: ID!, $isBanned: Boolean!){\n        SetIsBanned(projectPageId: $projectPageId, isBanned: $isBanned) {\n            ok\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation ForgotPassword($email: String!) {\n        ForgotPassword(email: $email) {\n            ok\n        }\n    }\n"): (typeof documents)["\n    mutation ForgotPassword($email: String!) {\n        ForgotPassword(email: $email) {\n            ok\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateApplication($input: NewApplication!){\n        CreateApplication(input: $input) {\n            ... on ApplicationHttp {\n                id\n                nomination\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation CreateApplication($input: NewApplication!){\n        CreateApplication(input: $input) {\n            ... on ApplicationHttp {\n                id\n                nomination\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetUserById($id: ID!){\n        GetUserById(id: $id) {\n            ... on UserHttp {\n                id\n                email\n                fullName\n                fullNameNative\n                city\n                country\n                birthdate \n                createdAt\n                role\n                updatedAt\n                isActive\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetUserById($id: ID!){\n        GetUserById(id: $id) {\n            ... on UserHttp {\n                id\n                email\n                fullName\n                fullNameNative\n                city\n                country\n                birthdate \n                createdAt\n                role\n                updatedAt\n                isActive\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetAllUsers($page: Int, $pageSize: Int, $active: Boolean!, $roles: [Role!]!){\n        GetAllUsers(page: $page, pageSize: $pageSize, active: $active, roles: $roles) {\n            users {\n                id\n                email\n                fullName\n                fullNameNative\n            }\n            countRows\n        }\n    }\n"): (typeof documents)["\n    query GetAllUsers($page: Int, $pageSize: Int, $active: Boolean!, $roles: [Role!]!){\n        GetAllUsers(page: $page, pageSize: $pageSize, active: $active, roles: $roles) {\n            users {\n                id\n                email\n                fullName\n                fullNameNative\n            }\n            countRows\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetAllProjectPagesByAccessToken($page: Int, $pageSize: Int){\n        GetAllProjectPagesByAccessToken(page: $page, pageSize: $pageSize) {\n            projectPages{\n                id\n                title\n                isShared\n                isBanned\n            }\n            countRows\n        }\n    }\n"): (typeof documents)["\n    query GetAllProjectPagesByAccessToken($page: Int, $pageSize: Int){\n        GetAllProjectPagesByAccessToken(page: $page, pageSize: $pageSize) {\n            projectPages{\n                id\n                title\n                isShared\n                isBanned\n            }\n            countRows\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetAllProjectPagesByAuthorId($id: ID!, $page: Int, $pageSize: Int){\n        GetAllProjectPagesByAuthorId(id: $id, page: $page, pageSize: $pageSize) {\n            projectPages{\n                id\n                title\n                isShared\n                isBanned\n            }\n            countRows\n        }\n    }\n"): (typeof documents)["\n    query GetAllProjectPagesByAuthorId($id: ID!, $page: Int, $pageSize: Int){\n        GetAllProjectPagesByAuthorId(id: $id, page: $page, pageSize: $pageSize) {\n            projectPages{\n                id\n                title\n                isShared\n                isBanned\n            }\n            countRows\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetProjectPageById($id: ID!){\n        GetProjectPageById(id: $id) {\n            id\n            authorId\n            createdAt\n            updatedAt\n            projectId\n            title\n            instruction\n            notes\n            linkToScratch\n            isShared\n            isBanned\n            projectUpdatedAt\n        }\n    }\n"): (typeof documents)["\n    query GetProjectPageById($id: ID!){\n        GetProjectPageById(id: $id) {\n            id\n            authorId\n            createdAt\n            updatedAt\n            projectId\n            title\n            instruction\n            notes\n            linkToScratch\n            isShared\n            isBanned\n            projectUpdatedAt\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllCountries {\n  GetAllCountries {\n    countries {\n      name\n    }\n    countRows\n  }\n}\n"): (typeof documents)["\n  query GetAllCountries {\n  GetAllCountries {\n    countries {\n      name\n    }\n    countRows\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllNominations {\n  GetAllNominations {\n    nominations {\n      name\n    }\n    countRows\n  }\n}\n"): (typeof documents)["\n  query GetAllNominations {\n  GetAllNominations {\n    nominations {\n      name\n    }\n    countRows\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;