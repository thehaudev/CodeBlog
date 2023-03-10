const jwt = require('jsonwebtoken')
import { DataInTokenData } from "../interfaces/auth.interface"
import { User } from "../interfaces/users.interface"
require('dotenv').config()
const { ACTIVATION_TOKEN_SECRET, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env

export const createTokenCookie = (userData: User): { token: string, cookie: string, expiresIn: number } => {
    const dataStoredInToken: DataInTokenData = { _id: userData._id }
    const expiresIn: number = 60 * 60 * 24
    const secretKey: string | undefined = process.env.ACCESS_TOKEN_SECRET

    const token = jwt.sign(dataStoredInToken, secretKey, { expiresIn: expiresIn })
    const cookie = `Authorization=${token}; HttpOnly; Max-Age=${expiresIn};`
    return { token, cookie, expiresIn }
}

export const createActivationToken = (Payload: {}) => {
    return jwt.sign(Payload, ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' })
}

export const createAccessToken = (Payload: {}) => {
    return jwt.sign(Payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

export const createRefreshToken = (Payload: {}) => {
    return jwt.sign(Payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}
// public createToken(userData: User): TokenData {
//     const dataStoredInToken: DataInTokenData = { _id: userData._id }
//     const expiresIn: number = 60 * 60 * 24
//     const secretKey: string | undefined = process.env.SECRET_KEY

//     return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn: expiresIn }) }
// }

// public createCookie(tokenData: TokenData): string {
//     return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`
// }