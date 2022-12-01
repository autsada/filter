import React, { useState, useEffect } from "react"

// Assumming this data is received from the API.
const data = ["Blue", "Basketball", "Vue", "Node"]

/**
 * A dropdown component
 */
export default function CartItem({
  identifier,
  selectedItems,
  setSelectedItems,
  selectedItemsCount,
}) {
  // The original data from the API.
  const [items, setItems] = useState([])
  // The filtered data.
  const [filteredItems, setFilteredItems] = useState([])
  const [preSelect, setPreSelect] = useState()
  // The item when user selects from a dropdown.
  const [selected, setSelected] = useState()

  // Set original items on the first render (this will only run once).
  useEffect(() => {
    setItems(data)
    setFilteredItems(data)
    const newSelected = data[0]
    let oldSelected
    setSelected((prev) => {
      oldSelected = prev
      return newSelected
    })
    handleUpdatedSelectedItems(oldSelected, newSelected)
  }, [])

  // When `updatedItems` changed, update the `filteredItems`
  useEffect(() => {
    if (items.length === 0) return
    if (selectedItems.length > 0) {
      // Update the dropdowns options
      const concernSelectedItems = selectedItems.filter(
        (it) => it.identifier !== identifier
      )
      setFilteredItems(
        items.filter(
          (i) => concernSelectedItems.map((it) => it.value).indexOf(i) < 0
        )
      )
    }
  }, [items, selectedItems, identifier])

  // When the `filteredItems` changed, update the (pre) `selected`
  useEffect(() => {
    if (filteredItems.length > 0) {
      const preselected = filteredItems[0]
      handleUpdatedSelectedItems(selected, preselected)
    }
  }, [selected, filteredItems])

  function handleUpdatedSelectedItems(oldSelected, newSelected) {
    setSelectedItems((prevSelectedItems) => {
      // A. The `newSelected` is NOT in the `selectedItems`.
      if (!prevSelectedItems.map((it) => it.value).includes(newSelected)) {
        let updatedSelectedItems = [...prevSelectedItems]
        // If the `oldSelected` is already in the `selectedItems`.
        if (updatedSelectedItems.map((it) => it.value).includes(oldSelected)) {
          // A-1. Remove the `oldSelected` from the `selectedItems`.
          const oldSelectedIndex = updatedSelectedItems.findIndex(
            (it) => it.value === oldSelected
          )
          if (oldSelectedIndex > -1)
            updatedSelectedItems.splice(oldSelectedIndex, 1)
        }

        // A-3. Add the `newSelected` into the `selectedItems`.
        return [...updatedSelectedItems, { identifier, value: newSelected }]
      } else {
        // B. The `newSelected` is already in the `selectedItems`.
        // B-1. Reset `selected` to `undefined`.
        // setSelected()

        // B-2. Return the previous state.
        return prevSelectedItems
      }
    })
  }

  // A function to select item.
  function selectItem(e) {
    const item = e.target.value

    console.log("selected -->", item)
    // setSelected(item)
    // handleUpdatedSelectedItems(selected, item)
  }

  // console.log(`identifier: ${identifier} -->`, selected)
  // console.log("all -->", selectedItems)
  return (
    <div className="dropdown">
      {filteredItems.length > 0 && (
        <select value={selected} onChange={selectItem} className="select">
          {filteredItems.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}
