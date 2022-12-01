import React, { useState, useEffect } from "react"

import CartItem from "./CartItem"

/**
 * A Parent components
 */
export default function SectionPage() {
  const [allItems, setAllItems] = useState([]) // All unique items from all dropdowns
  const [selectedItems, setSelectedItems] = useState([]) // array of seleted items
  const [nonSelectedItems, setNonSelectedItems] = useState([]) // These items will be distributed to all dropdowns
  const [itemToRemove, setItemToRemove] = useState() // This is the item to be remove from the dropdowns that doesn't select it.

  // When `allItems` is set, and `selectedItems` changed, update the `nonSelectedItems`.
  useEffect(() => {
    if (allItems.length === 0) return
    if (selectedItems.length > 0) {
      setNonSelectedItems(allItems.filter((i) => selectedItems.indexOf(i) < 0))
    }
  }, [allItems.length, selectedItems])

  return (
    <div className="section">
      <h4>Section Page</h4>

      <div className="dropdowns">
        <CartItem
          allItems={allItems}
          setAllItems={setAllItems}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          nonSelectedItems={nonSelectedItems}
          setNonSelectedItems={setNonSelectedItems}
          itemToRemove={itemToRemove}
          setItemToRemove={setItemToRemove}
        />
        <CartItem
          allItems={allItems}
          setAllItems={setAllItems}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          nonSelectedItems={nonSelectedItems}
          setNonSelectedItems={setNonSelectedItems}
          itemToRemove={itemToRemove}
          setItemToRemove={setItemToRemove}
        />
        <CartItem
          allItems={allItems}
          setAllItems={setAllItems}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          nonSelectedItems={nonSelectedItems}
          setNonSelectedItems={setNonSelectedItems}
          itemToRemove={itemToRemove}
          setItemToRemove={setItemToRemove}
        />
      </div>
    </div>
  )
}
