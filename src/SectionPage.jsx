import React, { useState } from "react"

import CartItem from "./CartItem"

/**
 * A Parent components
 */
export default function SectionPage() {
  const [selectedItems, setSelectedItems] = useState([]) // array of objects - for example [{identifier: 1, value: [a, b, c]}]

  // Use this value as a dependency in the child `useEffect` to identify if the selectedItems array changes in order to update the child dropdown UI.
  const allSelectedItemsCount = selectedItems.reduce((sum, i) => {
    // `i` is an object --> {identifier: xx, values: [a, b, c]}
    return sum + i.values.length
  }, 0)

  return (
    <div className="section">
      <h4>Section Page</h4>

      <div className="dropdowns">
        <CartItem
          identifier={1}
          item={1}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          allSelectedItemsCount={allSelectedItemsCount}
        />
        <CartItem
          identifier={2}
          item={2}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          allSelectedItemsCount={allSelectedItemsCount}
        />
        <CartItem
          identifier={3}
          item={3}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          allSelectedItemsCount={allSelectedItemsCount}
        />
      </div>
    </div>
  )
}
