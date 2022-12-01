import React, { useState, useEffect } from "react"

// Assumming this data is received from the API.
const data = ["Blue", "Basketball", "Vue", "Node"]

/**
 * A dropdown component
 */
export default function CartItem({
  allItems,
  setAllItems,
  selectedItems,
  setSelectedItems,
  nonSelectedItems,
  itemToRemove,
  setItemToRemove,
}) {
  // The filtered data.
  const [filteredItems, setFilteredItems] = useState([])
  // Preselect item.
  const [preSelect, setPreSelect] = useState()
  // The item when user selects from a dropdown.
  const [selected, setSelected] = useState()

  // On the first render, put the items that fetched from the API to the `allItems` state in the parent, make sure to put only unique items, this will run only once.
  useEffect(() => {
    setAllItems((prev) => {
      const uniqueItems = data.filter((i) => prev.indexOf(i) < 0)
      return [...prev, ...uniqueItems]
    })
  }, [])

  // When all items are available, set `preselected` and `selected` (same value), this will run only once.
  useEffect(() => {
    if (allItems.length > 0) {
      const handlePreSelect = async () => {
        const ps = await getPreSelect()
        setPreSelect(ps)
        setSelected(ps)
      }

      handlePreSelect()
    }
  }, [allItems.length])

  // The function to get a preselect item for each dropdown, need to update the `selectedItems` on the parent in this function.
  function getPreSelect() {
    return new Promise((resolve, reject) => {
      setSelectedItems((prev) => {
        // Find the first item in the `allItems` state that is not already selected by other dropdowns.
        const nonSelectedItem = allItems.filter((i) => prev.indexOf(i) < 0)[0]
        resolve(nonSelectedItem)
        return nonSelectedItem ? [...prev, nonSelectedItem] : prev
      })
    })
  }

  // Once the `preselect` is set, update the dropdowns option, this will run only once.
  useEffect(() => {
    if (preSelect) {
      setFilteredItems((prev) =>
        prev.includes(preSelect) ? prev : [preSelect, ...prev]
      )
    }
  }, [preSelect])

  // When the `nonSelectedItems` changed, put them in the `filteredItems` for displaying.
  useEffect(() => {
    if (nonSelectedItems.length > 0) {
      setFilteredItems((prev) => {
        const newItems = nonSelectedItems.filter((i) => prev.indexOf(i) < 0)
        return [...prev, ...newItems]
      })
    }
  }, [nonSelectedItems])

  // When `selected` and `itemToRemove` changed, update the `filteredItems`
  useEffect(() => {
    if (itemToRemove) {
      if (itemToRemove !== selected) {
        setFilteredItems((prev) => prev.filter((i) => i !== itemToRemove))
      }
    }
  }, [selected, itemToRemove])

  // A function to select item.
  function selectItem(e) {
    const item = e.target.value

    // Set `selected`
    setSelected(item)

    // Update the `selectedItems` state.
    setSelectedItems((prev) => {
      const updatedList = [...prev]
      // 1. Change the previous selected to the new selected.
      const oldSelectedIndex = prev.indexOf(selected)
      if (oldSelectedIndex > -1) {
        updatedList[oldSelectedIndex] = item
      }

      return updatedList
    })

    // Update the `itemToRemove` state.
    setItemToRemove(item)
  }

  return (
    <div className="dropdown">
      {filteredItems.length > 0 && (
        <select
          value={selected || preSelect}
          onChange={selectItem}
          className="select"
        >
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
