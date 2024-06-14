import prisma from "../helper/db.helper"
import { validateListItem } from "../validators/listitem.validator"

const createListItem = (itemData) => {
    return new Promise((resolve, reject) => {
        let validationErrors = validateListItem(itemData)
        if (Object.keys(validationErrors).length > 0) {
            reject({
                code: 400,
                msg: validationErrors
            })
        } else {
            prisma.listitem.create({
                data: itemData
            })
            .then( results => {
                resolve({
                    code: 200,
                    msg: results
                })
            })
            .catch( err => {
                console.log(err)
                reject({
                    code: 500,
                    msg: err
                })
            })
        }
    })
}
const getListItems = () => {
    return new Promise((resolve, reject) => {})
}
const readListItem = () => {
    return new Promise((resolve, reject) => {})
}
const updateListItem = () => {
    return new Promise((resolve, reject) => {})
}
const deleteListItem = () => {
    return new Promise((resolve, reject) => {})
}

export {
    createListItem,
    getListItems,
    readListItem,
    updateListItem,
    deleteListItem
}