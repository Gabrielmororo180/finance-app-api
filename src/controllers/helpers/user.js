import { badRequest } from '../helpers.js'

export const generateInvalidPasswordResponse = () => {
    return badRequest({
        message: 'Password must be at least 6 characters long',
    })
}

export const gerenateInvalidEmailResponse = () => {
    return badRequest({ message: 'Invalid email format' })
}

export const generateInvalididResponse = () => {
    return badRequest({ message: 'User ID is not valid' })
}
