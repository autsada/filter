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
  // Preselect item.
  const [preSelect, setPreSelect] = useState()
  // The item when user selects from a dropdown.
  const [selected, setSelected] = useState()

  // On the first render, put the items that fetched from the API to the `items`, this will run only once.
  useEffect(() => {
    setItems(data[item])
  }, [item])

  // When items are available, set `preSelect` and update `selectedItems` state on the parent, this will run only once.
  useEffect(() => {
    if (items.length > 0) {
      const preSelect = items[0]
      setPreSelect(preSelect)
      setSelectedItems((prev) =>
        prev.map((i) => i.value).includes(preSelect)
          ? prev
          : [...prev, { identifier: item, value: preSelect }]
      )
    }
  }, [items.length])

  // When the `selectedItems` changed, update the `filteredItems`.
  useEffect(() => {
    if (items.length > 0 && selectedItems.length > 0) {
      filtering(selectedItems)
    }
  }, [items.length, selectedItems])

  // Filtering logic.
  function filtering(currentSelectedItems) {
    const filtered = items.filter((i) => {
      const includedItem = currentSelectedItems.find((sl) => sl.value === i)
      if (includedItem) {
        if (includedItem.identifier === item) return true
        else return false
      } else {
        return true
      }
    })

    // For the first render, if the `preSelect` of the dropdown has been already taked by other dropdowns, we need to reset the `preSelect` and update the `selectedItems`.
    const newPreSelect = filtered[0]
    if (
      newPreSelect &&
      !selected &&
      preSelect !== newPreSelect &&
      currentSelectedItems.findIndex((i) => i.identifier === item) < 0
    ) {
      setPreSelect(newPreSelect)
      setSelectedItems((prev) => {
        return prev.map((i) => i.value).includes(newPreSelect)
          ? prev
          : [...prev, { identifier: item, value: newPreSelect }]
      })
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
      // Find the index of the already selected item of the dropdown.
      const index = prev.findIndex((i) => i.identifier === item)
      if (index > -1) {
        // Found the selected item of the dropdown.
        const updatedList = [...prev]
        // Asign the new selected to the existing selected item in the `selectedItems` state.
        updatedList[index].value = newSelect

        return updatedList
      } else {
        // Not Found the selected item of the dropdown.
        return [...prev, { identifier: item, value: newSelect }]
      }
    })
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
