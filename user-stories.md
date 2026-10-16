# E1: Product Discovery and Vendor Information
Customers can search for products and services, view product details, and learn about vendors before placing an order.

## US1: Login to profile
As a customer, I can login to the system so that I can check my profile information.

FR: FR#1, FR#1.1, FR#1.2
Priority: Must
MVP: yes

- [ ] The customer can type in their username and password in login panel.
- [ ] An unmatched username and password will be rejected.
- [ ] The customer can view their profile information regarding their preferred names, avatar, lab/company affiliation.

## US2: Send messages in chat panel
As a customer, I can send a message to vendors so that I can learn more about product/service information.

FR: FR#2, FR#2.1
Priority: Must
MVP: yes

- [ ] The customer can access to the chat panel.
- [ ] The chat panel will display user's preferred name and avatar.
- [ ] The customer can type in message in the chat box.

## US3: Search for product/services
As a customer, I can search for product/service so that I can decide which product/services most fits my requirements and order them later.

FR: FR#3
Priority: Must
MVP: yes

- [ ] The customer can type in the search bar about what they need.
- [ ] By clicking the "search" button, a bunch lists of potentially suitable products or services presented by companies will be displayed.

## US4: Learn about product/services details
As a customer, I want to view detailed information about a product or service so that I can decide whether it meets my needs.

FR: FR#3.3
Priority: Must
MVP: yes

- [ ] The customer can click on a product or service from the search results.
- [ ] The product/service detail page displays its name, description, and price.
- [ ] The customer can view additional information provided by the vendor, such as product size, materials, or service specifications.

## US5: Access to vendor's official website
As a customer, I want to visit a vendor's official website so that I can learn more about the vendor and its products or services.

FR: FR#3.2
Priority: Must
MVP: yes

- [ ] The customer can see a website link on the vendor's profile if a website is provided.
- [ ] The customer can click the link to open the vendor's official website in a new browser tab.

# E2: Shopping Cart and Order Management
Customers can manage their shopping carts, place orders, and track order progress. Vendors can respond to orders and update their status.

## US6: Add Products/Services to Cart
As a customer, I want to add products/services to my shopping cart so that I can review my selections before placing an order.

FR: FR#4
Priority: Must
MVP: yes

- [ ] The customer can click an "Add to Cart" button on a product or service page.
- [ ] Selected product or service will show up in the shopping cart.
- [ ] The customer can view the product/service name, quantity, and price in the cart.
- [ ] The customer can remove an item from the cart.

## US7: Place an Order
As a customer, I want to place an order for items in my shopping cart so that I can buy products or services from vendors.

FR: FR#4.1
Priority: Must
MVP: yes

- [ ] The customer can review the selected items before submitting an order.
- [ ] The customer can click a "Place Order" button to submit the order.
- [ ] The system will create a unique order confirmation ID.

## US8: Update order status
As a vendor, I want to update the status of an confirmed orde so that customers can track the progress of their orders.

FR: FR#5
Priority: Must
MVP: yes

- [ ] The vendor can select an accepted order to update its status.
- [ ] The vendor can change the order status to "Preparing", "Shipped", "Out for Delivery", or "Delivered".
- [ ] The system should save the updated status.
- [ ] The customer can view the updated status on their order details page.

## US9: Cancel an order
As a customer, I want to cancel an eligible order so that I can save money on things I no longer need.

FR: FR#8
Priority: Must
MVP: yes

- [ ] A button of "Cancel Order" should be displayed on the order page.
- [ ] The customer can cancel an order that is still "Pending".
- [ ] The system asks the customer to confirm before customer clicking "Cancel Order" button.
- [ ] The system changes the order status to "Canceled" after confirmation.
- [ ] The customer cannot cancel an order that has already been shipped or delivered.

## US10: View Vendor Contact and Order Log
As a customer, I want to view a record of vendors I have contacted or ordered from so that I can easily find previous business interactions.

FR: FR#10
Priority: Could
MVP: yes

- [ ] The customer can access a vendor interaction log from their account.
- [ ] The log displays vendors the customer has contacted or placed orders with.
- [ ] Each record displays the vendor name and the type of interaction.
- [ ] The customer can click on a vendor in the log to open the vendor's profile.

## US11: Record Vendor Notes
As a customer, I want to add personal notes to vendor profiles so that I can remember important information about each vendor.

FR: FR#12
Priority: Could
MVP: yes

- [ ] The customer can type in a personal note for a vendor.
- [ ] The customer can save the note to their account.
- [ ] The customer can view their saved note when revisiting the vendor's profile.
- [ ] The customer can edit or delete an existing note.

## US12: Pay for an Order
As a customer, I want to pay for my order through the platform so that I can complete my purchase online.

FR: FR#4.2
Priority: Must
MVP: no

- [ ] The customer can select a payment option for an eligible order.
- [ ] The system displays the total amount before payment confirmation.
- [ ] The customer receives a success message when the payment is completed.
- [ ] The system displays an error message if the payment fails.





