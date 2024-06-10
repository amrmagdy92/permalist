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
        createListItem()
            .then()
            .catch()
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