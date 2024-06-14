import { Router } from "express"
import { createListItem, getListItems, readListItem, updateListItem, deleteListItem } from "../controllers/listitem.controller"

const router = Router()

router.route("/")
    .get((request, response) => {
        getListItems(request.query.status_filter)
            .then( result => {
                response.status(result.code).json({
                    response: result.msg
                })
            })
            .catch(result => {
                response.status(result.code).json({
                    response: result.msg
                })
            })
    })
    .post((request, response) => {
        createListItem(request.body.list_item)
            .then( result => {
                response.status(result.code).json({
                    response: result.msg
                })
            })
            .catch(result => {
                response.status(result.code).json({
                    response: result.msg
                })
            })
    })

router.route("/:id")
    .get((request, response) => {
        readListItem(request.params.id)
            .then( result => {
                response.status(result.code).json({
                    response: result.msg
                })
            })
            .catch(result => {
                response.status(result.code).json({
                    response: result.msg
                })
            })
    })
    .put((request, response) => {
        updateListItem(request.params.id, request.body.list_item)
            .then( result => {
                response.status(result.code).json({
                    response: result.msg
                })
            })
            .catch(result => {
                response.status(result.code).json({
                    response: result.msg
                })
            })
    })
    .delete((request, response) => {
        deleteListItem()
            .then()
            .catch()
    })

export default router