const validateListItem = (listItemData) => {
    let errors = {}
    const validItemStatus = ["to_do", "in_progress", "done"]
    listItemData.item_text == "" || typeof listItemData.item_text === "undefined"? errors.item_text = "Item requires a description text" : null
    validItemStatus.includes(listItemData.status)? errors.item_status = "Item requires status text": null
    return errors
}

export {
    validateListItem
}