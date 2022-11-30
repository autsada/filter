import React, { useState, useEffect } from "react"

// Assumming these sets of data are received from the API.
const items1 = ["Red", "Football", "React", "Laravel"]
const items2 = ["Green", "Football", "Vue", "Node"]
const items3 = ["Blue", "Basketball", "Vue", "Node"]

/**
 * A dropdown component
 */
export default function CartItem({
  identifier,
  item,
  selectedItems,
  setSelectedItems,
  allSelectedItemsCount,
}) {
  // The items that will be set after fetching data from the API.
  const [items, setItems] = useState([])
  // The item when user selects from a dropdown.
  const [selected, setSelected] = useState()

  // Assumming we fetch items depending on the item props on the first render.
  useEffect(() => {
    if (item === 1) {
      setItems(items1)
      // Set the first item as a preselected
      const preselected = items1[0]
      setSelected(preselected)

      // Store the preselected in the parent's selected items array
      setSelectedItems((prev) => {
        // Find the index by identifier
        const index = prev.findIndex((i) => i.identifier === identifier)
        if (index >= 0) {
          const updatedState = [...prev]
          // Check to only add the selected value once
          updatedState[index].values = updatedState[index].values.includes(
            preselected
          )
            ? updatedState[index].values
            : [...updatedState[index].values, preselected]
          return updatedState
        } else {
          return [...prev, { identifier, values: [preselected] }]
        }
      })
    }
    if (item === 2) {
      setItems(items2)
      // Set the first item as a preselected
      const preselected = items2[0]
      setSelected(preselected)

      // Store the preselected in the parent's selected items array
      setSelectedItems((prev) => {
        // Find the index by identifier
        const index = prev.findIndex((i) => i.identifier === identifier)
        if (index >= 0) {
          const updatedState = [...prev]
          // Check to only add the selected value once
          updatedState[index].values = updatedState[index].values.includes(
            preselected
          )
            ? updatedState[index].values
            : [...updatedState[index].values, preselected]
          return updatedState
        } else {
          return [...prev, { identifier, values: [preselected] }]
        }
      })
    }
    if (item === 3) {
      setItems(items3)
      // Set the first item as a preselected
      const preselected = items3[0]
      setSelected(preselected)

      // Store the preselected in the parent's selected items array
      setSelectedItems((prev) => {
        // Find the index by identifier
        const index = prev.findIndex((i) => i.identifier === identifier)
        if (index >= 0) {
          const updatedState = [...prev]
          // Check to only add the selected value once
          updatedState[index].values = updatedState[index].values.includes(
            preselected
          )
            ? updatedState[index].values
            : [...updatedState[index].values, preselected]
          return updatedState
        } else {
          return [...prev, { identifier, values: [preselected] }]
        }
      })
    }
  }, [item])

  // A function to select item.
  function selectItem(e) {
    const item = e.target.value
    setSelected(item)

    // Put the selected item into the parent's selectedItems state.
    setSelectedItems((prev) => {
      // Find the index by identifier
      const index = prev.findIndex((i) => i.identifier === identifier)
      if (index >= 0) {
        // Create a new copy of the state, otherwise the component will not rerender and the UI will not update.
        const updatedState = [...prev]
        // Check to only add the selected value once
        updatedState[index].values = updatedState[index].values.includes(item)
          ? updatedState[index].values
          : [...updatedState[index].values, item]
        return updatedState
      } else {
        return [...prev, { identifier, values: [item] }]
      }
    })
  }

  // When the selectedItems in the parent's state changes, filter out that item from the items state.
  useEffect(() => {
    // console.log(`run: ${identifier}`, allSelectedItemsCount)
    if (allSelectedItemsCount > 0) {
      // Get the selected items from all other dropdowns
      const otherDropdownSelectedItems = selectedItems
        .filter((i) => i.identifier !== identifier)
        .reduce((values, i) => [...values, ...i.values], []) // This will return an array of selected items in other dropdowns

      // Filter out the items that duplicated with the selected item above.
      setItems((prev) =>
        prev.filter((i) => otherDropdownSelectedItems.indexOf(i) < 0)
      )
    }
  }, [identifier, allSelectedItemsCount])

  return (
    <div className="dropdown">
      {items.length > 0 && (
        <select value={selected} onChange={selectItem} className="select">
          {items.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}
