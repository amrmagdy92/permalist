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
const updateListItem = (itemID, itemData) => {
    return new Promise((resolve, reject) => {
        let validationErrors
        const itemIDValidation = validateItemID(itemID)
        if (Object.keys(itemIDValidation).length > 0) {
            validationErrors = itemIDValidation
            reject({
                code: 400,
                msg: validationErrors
            })
        } else {
            const itemValidation = validateListItem({
                item_text: itemData.item_text,
                status: itemData.status
            })
            if (Object.keys(itemValidation).length > 0) {
                reject({
                    code: 400,
                    msg: "Invalid item data"
                })
            } else {
                prisma.listitem.update({
                    where: {
                        id: itemID
                    },
                    data: {
                        item_text: itemData.item_text,
                        status: itemData.status
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
        }
    })
}
const deleteListItem = (itemID) => {
    return new Promise((resolve, reject) => {
        let validationErrors = validateItemID(itemID)
        if (Object.keys(validationErrors).length > 0) {
            reject({
                code: 400,
                msg: validationErrors
            })
        } else {
            prisma.listitem.delete({
                where: {
                    id: itemID
                }
            })
            .then( result => {
                result ?
                resolve({
                    code: 200,
                    msg: "Item has been deleted successfully"
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

export {
    createListItem,
    getListItems,
    readListItem,
    updateListItem,
    deleteListItem
}