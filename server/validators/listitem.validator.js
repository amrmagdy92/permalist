const validateStatusFilter = (filter) => {
    let errors = {}
    const validItemStatus = ["to_do", "in_progress", "done"]
    !validItemStatus.includes(filter)? errors.item_status = "Invalid list item status": null
    return errors
}

const validateListItem = (listItemData) => {
    let errors = {}
    let filterErrors = validateStatusFilter(listItemData.status)
    Object.keys(filterErrors).length > 0? errors.item_status = filterErrors.item_status : null
    listItemData.item_text == "" || typeof listItemData.item_text === "undefined"? errors.item_text = "Item requires a description text" : null
    return errors
}

export {
    validateListItem,
    validateStatusFilter
}