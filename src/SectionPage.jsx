import React, { useState } from "react"

import CartItem from "./CartItem"

/**
 * A Parent components
 */
export default function SectionPage() {
  const [selectedItems, setSelectedItems] = useState([]) // array of seleted items

  return (
    <div className="section">
      <h4>Section Page</h4>

      <div className="dropdowns">
        <CartItem
          item={1}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
        <CartItem
          item={2}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
        <CartItem
          item={3}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
        <CartItem
          item={4}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </div>
    </div>
  )
}
