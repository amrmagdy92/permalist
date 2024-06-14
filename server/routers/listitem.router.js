import { Router } from "express"
import { createListItem, getListItems, readListItem, updateListItem, deleteListItem } from "../controllers/listitem.controller"

const router = Router()

router.route("/")
    .get((request, response) => {
        getListItems()
            .then()
            .catch()
    })
    .post((request, response) => {
        createListItem(request.body.list_item)
            .then( result => {
                response.status(result.code).json(result.msg)
            })
            .catch(result => {
                response.status(result.code).json(result.msg)
            })
    })

router.route("/:id")
    .get((request, response) => {
        readListItem()
            .then()
            .catch()
    })
    .patch((request, response) => {
        updateListItem()
            .then()
            .catch()
    })
    .delete((request, response) => {
        deleteListItem()
            .then()
            .catch()
    })

export default router