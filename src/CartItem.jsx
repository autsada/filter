import React, { useState, useEffect } from "react"

// Assumming these sets of data are received from the API.
const data = {
  1: ["Red", "Football", "React", "Laravel"],
  2: ["Green", "Football", "Vue", "Node"],
  3: ["Blue", "Basketball", "Vue", "Node"],
  4: ["Red", "Boxing", "Angular", "Laravel"],
}

/**
 * A dropdown component
 */
export default function CartItem({ item, selectedItems, setSelectedItems }) {
  // Fetched data.
  const [items, setItems] = useState([])
  // The filtered data.
  const [filteredItems, setFilteredItems] = useState([])
  // The item when user selects from a dropdown.
  const [selected, setSelected] = useState()

  // On the first render, put the items that fetched from the API to the `items`, this will run only once.
  useEffect(() => {
    setItems(data[item])
  }, [item])

  // When items are available, handle preselect the item.
  useEffect(() => {
    if (items.length > 0) {
      const getPreSelect = async () => {
        const preSelect = await handlePreSelect()
        setSelected(preSelect)
      }
      getPreSelect()
    }
  }, [items.length])

  // The logic to get a preselect and update the `selectedItems` for the first render.
  function handlePreSelect() {
    return new Promise((resolve, reject) => {
      const preSelect = items[0]
      setSelectedItems((prev) => {
        if (prev.includes(preSelect)) {
          resolve("") // use this resolved value to set the `selected`
          return prev
        } else {
          resolve(preSelect) // use this resolved value to set the `selected`
          return [...prev, preSelect]
        }
      })
    })
  }

  // When the `selectedItems` changed, update the `filteredItems`.
  useEffect(() => {
    // Make sure the original items are ready and the `selected` is set (not undefined) before doing filtering.
    if (items.length > 0 && typeof selected !== "undefined") {
      // Pass the most update `selectedItems` and `selected` to the filtering fn.
      filtering(selectedItems, selected)
    }
  }, [items.length, selectedItems, selected])

  // Filtering logic.
  function filtering(currentSelectedItems, currentSelected) {
    const filtered = items.filter(
      (i) =>
        currentSelectedItems.indexOf(i) < 0 ||
        (currentSelected && i === currentSelected)
    )

    // For the first render if `selected` not set, we have to reset the `selected` and put the new selected in the `selectedItems`.
    if (typeof currentSelected === "string" && !currentSelected) {
      const newSelect = filtered[0]
      setSelected(newSelect)
      setSelectedItems((prev) =>
        prev.includes(newSelect) ? prev : [...prev, newSelect]
      )
    }

    // Update the `filteredItems`.
    setFilteredItems(filtered)
  }

  // A function to select an option.
  function selectItem(e) {
    const newSelect = e.target.value

    // Set `selected`
    setSelected(newSelect)

    // Update the `selectedItems`.
    setSelectedItems((prev) => {
      // Find the index of the old selected.
      const index = prev.findIndex((i) => i === selected)
      if (index > -1) {
        // A. Found the selected item of the dropdown.
        // Replace the old selected with the new selected.
        const updatedList = [...prev]
        updatedList[index] = newSelect

        return updatedList
      } else {
        // B. Not Found the selected item of the dropdown.
        // Add the new selected.
        return [...prev, newSelect]
      }
    })
  }

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
