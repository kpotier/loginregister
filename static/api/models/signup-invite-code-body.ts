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
/**
 * 
 * @export
 * @interface SignupInviteCodeBody
 */
export interface SignupInviteCodeBody {
    /**
     * 
     * @type {string}
     * @memberof SignupInviteCodeBody
     */
    verifyCode?: string;
    /**
     * 
     * @type {string}
     * @memberof SignupInviteCodeBody
     */
    email?: string;
    /**
     * 
     * @type {string}
     * @memberof SignupInviteCodeBody
     */
    pwd?: string;
    /**
     * 
     * @type {string}
     * @memberof SignupInviteCodeBody
     */
    locale?: string;
}
