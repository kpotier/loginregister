/* tslint:disable */
/* eslint-disable */
/**
 * auth.proto
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { AuthRefreshToken } from './auth-refresh-token';
import { AuthUser } from './auth-user';
/**
 * 
 * @export
 * @interface AuthSignInResponse
 */
export interface AuthSignInResponse {
    /**
     * 
     * @type {string}
     * @memberof AuthSignInResponse
     */
    accessToken?: string;
    /**
     * 
     * @type {AuthRefreshToken}
     * @memberof AuthSignInResponse
     */
    refreshToken?: AuthRefreshToken;
    /**
     * 
     * @type {string}
     * @memberof AuthSignInResponse
     */
    aESKey?: string;
    /**
     * 
     * @type {AuthUser}
     * @memberof AuthSignInResponse
     */
    user?: AuthUser;
}
