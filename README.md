# HQ - Frontend Coding Challenge
## General Overview
This challenge reflects a typical project you might encounter on our team. You will build a responsive marketplace where customers can add products to their cart, proceed to checkout, and successfully place an order. This test aims to assess your proficiency in frontend development, component creation, state management, API integration, user experience optimization, and more.

### Setup Instructions
1. **Environment Variables**
    - Create a `.env` file in the root directory with the following:
      ```
      NEXT_PUBLIC_API_URL="http://localhost:8000"
      ```

2. **Backend Setup**
    - Ensure your backend application is running as per the provided instructions.

3. **Frontend Application**
    - Start your frontend application by executing:
      ```
      yarn dev
      ```
    - Access your application at `http://localhost:3000`

## Objectives
  Clone the respository and complete the following tasks.

### User Story
  Customer is shown a responsive marketplace where they can add products to the cart. For this test, the customer will need to add more than one product to the cart before proceeding to checkout (figure out how this is going to work). In checkout, customers will be prompted for a delivery address. Inputted addresses should become delivery options for the other products. Each vendor charges a service fee that the customer can see as part of the overall total.
  
### Functional Requirements
  - **Marketplace:**
    - Utilize the provided endpoint to fetch marketplace data and render a responsive interface.
      - It's important to note that we're also interested in observing your debugging process.
    - Allow customers to add products to their cart. A minimum of two products is required to proceed to checkout.
  - **Error Management:**
    - Manage errors effectively (and proactively) for both the user and developer.
    - **BONUS:** Develop an error logger to log messages directly to the console.
  - **Service Fee Integration:**
    - Create a `/service-fee` endpoint that returns the service fee set for particular vendors and add that to the total of the cart.
  - **Checkout Process:**
    - Customers should be prompted for a delivery address on the first product. This address should be reusable for subsequent products, or they can input another delivery address.
      - **BONUS:** Make the address available for other products in the cart without re-rendering the page.
    - After a suuccessful checkout, redirect customers to a `/thank-you` page

### Technical Requirements
  - Follow clean coding principles, adhering to DRY and SOLID standards.
  - Ensure the application is responsive and user-friendly across devices.

## Submission Guidelines
Please ensure your submission meets all functional and technical requirements. 

