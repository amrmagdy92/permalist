import prisma from "../helper/db.helper"
import { validateListItem, validateStatusFilter, validateItemID } from "../validators/listitem.validator"

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
const getListItems = (statusFilter) => {
    return new Promise((resolve, reject) => {
        let validationErrors
        statusFilter === "" || statusFilter === undefined? validationErrors = {} : validationErrors = validateStatusFilter(statusFilter)
        if (Object.keys(validationErrors).length > 0) {
            reject({
                code: 400,
                msg: validationErrors
            })
        } else {
            prisma.listitem.findMany({
                where:{
                    status: statusFilter
                }
            })
            .then( results => {
                results.length > 0 ?
                resolve({
                    code: 200,
                    msg: results
                }) :
                resolve({
                    code: 200,
                    msg: "No results were found under this filter."
                })
            })
            .catch( err => {
                reject({
                    code: 500,
                    msg: err
                })
            })
        }
    })
}
const readListItem = (itemID) => {
    return new Promise((resolve, reject) => {
        let validationErrors = validateItemID(itemID)
        if (Object.keys(validationErrors).length > 0) {
            reject({
                code: 400,
                msg: validationErrors
            })
        } else {
            prisma.listitem.findUnique({
                where: {
                    id: itemID
                }
            })
            .then( result => {
                result ?
                resolve({
                    code: 200,
                    msg: result
                }) :
                resolve({
                    code: 200,
                    msg: "Please provide a valid item ID"
                })
            })
            .catch( err => {
                reject({
                    code: 500,
                    msg: err
                })
            })
        }
    })
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