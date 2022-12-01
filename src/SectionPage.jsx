import React, { useState } from "react"

import CartItem from "./CartItem"

/**
 * A Parent components
 */
export default function SectionPage() {
  const [selectedItems, setSelectedItems] = useState([]) // array of seleted items

  // Use this value as a dependency in the child `useEffect` to identify if the selectedItems array changes in order to update the child dropdown UI.
  const selectedItemsCount = selectedItems.length

  return (
    <div className="section">
      <h4>Section Page</h4>

      <div className="dropdowns">
        <CartItem
          identifier={1}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          selectedItemsCount={selectedItemsCount}
        />
        <CartItem
          identifier={2}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          selectedItemsCount={selectedItemsCount}
        />
        <CartItem
          identifier={3}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          selectedItemsCount={selectedItemsCount}
        />
      </div>
    </div>
  )
}
