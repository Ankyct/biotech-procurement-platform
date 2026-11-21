# Biotech Procurement Platform

#### Team name: Undecided

#### Members: Simon Cochran, Kelly Zheng Feng, Naresh Kharel, Wanzi Xiao



## Project Purpose
This project aims to build a procurement platform to improve the efficiency of the purchasing process. The platform will help lab members find and compare products from different vendors, organize purchasing information, and better manage their orders in one place.

## One thing we are unsure about 
Our platform depends on vendors being willing to join and participate. However, we are unsure whether all vendors would agree to use the platform. For this project, we will assume that all of Cello's Lab's existing vendors are willing to participate.

## Tech Stack

| Layer | Technology |
|---|---|
| Programming Language | Java |
| Frontend | React |
| Backend | Spring Boot |
| Database | PostgreSQL |
| APIs / External Services | TBD |
| Deployment / Hosting | TBD |
| Local Database Environment | Docker Compose |

## Architecture

The system architecture follows the subsystem decomposition developed in Sprint 3. The platform consists of eight subsystems:

| Subsystem | Responsibility | Folder |
|---|---|---|
| Authentication | User login and password reset | `backend/src/main/java/com/biotech/procurement/authentication/` |
| BuyerAccount | Buyer profile management | `backend/src/main/java/com/biotech/procurement/buyeraccount/` |
| VendorAccount | Vendor profiles and information | `backend/src/main/java/com/biotech/procurement/vendoraccount/` |
| ProductServices | Product search, details, and price comparison | `backend/src/main/java/com/biotech/procurement/productservices/` |
| OrderProcessing | Shopping cart, order placement, and cancellation | `backend/src/main/java/com/biotech/procurement/orderprocessing/` |
| OrderStatus | Order tracking and status updates | `backend/src/main/java/com/biotech/procurement/orderstatus/` |
| Payment | Payment processing | `backend/src/main/java/com/biotech/procurement/payment/` |
| Chat | Communication between buyers and vendors | `backend/src/main/java/com/biotech/procurement/chat/` |

The frontend is organized under `frontend/`, while database initialization scripts are stored in `database/init/`.

### Subsystem Decomposition Diagram

<img width="1316" height="1242" alt="UML Decomposition Diagram" src="https://github.com/user-attachments/assets/0108a650-939c-44be-8767-ae14eb3c73f7" />


### Deployment Diagram

![Deployment Diagram](docs/architecture/Sprint%204%20UML%20Deployment%20Diagram.jpg)


## How to Run the Project

### Prerequisites
- Java JDK 21 or later
- Maven Wrapper (included)
- Git
- Node.js 22 and npm

### Setup and Run

1. Clone the repository:

   ```bash
   git clone https://github.com/Ankyct/biotech-procurement-platform.git
   ```

2. Start the backend:

   ```bash
   cd biotech-procurement-platform/backend
   ```

   **Windows:**
   ```powershell
   .\mvnw.cmd spring-boot:run
   ```

   **macOS/Linux:**
   ```bash
   ./mvnw spring-boot:run
   ```

   The backend runs at `http://localhost:8080`.

3. Open another terminal and start the frontend:

   From the repository root:

   ```bash
   cd frontend
   npm ci
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

Users can search for products and services using the search bar and click a product to view its details.

### API Endpoints

The backend runs at `http://localhost:8080`. The following endpoints can be tested directly in a browser:

- `GET /api/products` — Returns a message confirming the ProductServices API is running.
- `GET /api/products/search?keyword=PCR` — Searches products by name or description.
- `GET /api/products/{id}` — Returns the details of a product by its ID.

Example URLs:

- http://localhost:8080/api/products
- http://localhost:8080/api/products/search?keyword=PCR
- http://localhost:8080/api/products/2

Currently, product search and product details use in-memory sample data. PostgreSQL integration will be added later.  

## Current Implementation Status

### What Works
- Spring Boot backend and React frontend.
- Product search by name or description.
- Partial and case-insensitive keyword matching.
- Search results displayed as product cards.
- Product details page showing vendor, price, description, and specifications.
- Navigation from search results to product details.
- GitHub Actions CI for backend builds and automated tests.

### What Is Not Implemented Yet
- Backend integration with PostgreSQL.
- Business logic for the remaining subsystems.
- Production hosting and database-backed product details.


## US4: Product and service details

The in-memory demo catalog includes two products and one service. It does not read
PostgreSQL; its IDs are independent of the database seed IDs. Prices use USD for
this MVP. `GET /api/products/{id}` returns `id`, `name`, `description`, `price`,
`vendor`, and a string-to-string `specifications` object. Missing numeric IDs return
404; malformed IDs return 400. The existing `/api/products` skeleton response remains
unchanged.

Run the backend and frontend as described in the How to Run section.

Users can search for products on the homepage and click a result to open `/products/{id}`. 
The detail page fetches product information from the backend and supports loading, not found, 
and retry states. Vite proxies `/api` to `localhost:8080`.

Product Search (US3) and Product Details (US4) are now integrated. 
Both features currently use the same in-memory sample data. Production hosting must serve
`index.html` for frontend routes and forward `/api` requests to Spring Boot.

Validation (also run by pull request CI):

```sh
cd backend
bash ./mvnw -B -ntp clean verify
cd ../frontend
npm ci
npm test
npm run build
```

## US3: Search for Products and Services

Users can search for products and services by entering a keyword in the search bar. The search supports partial and case-insensitive matching by product name or description.

Matching results are displayed as cards showing the product name, vendor, price, and description. Clicking a product opens its Product Details page.

The backend provides `GET /api/products/search?keyword=PCR` for product searches.

Currently, the search uses in-memory sample data. PostgreSQL integration will be added later.


## US1: Login to Profile

Users can click login at the top right of the application to login to their account. 

You may switch between a customer and vendor login by clicking on either the Customer or Vendor selection tabs above the login asking for email and password.

As of right now, this is only implemented as a demo and you may try logging in with the following inputs:

customer email: `customer@example.com`
customer password: `customer123`

vendor email: `vendor@example.com`
vendor password: `vendor@example.com`

Upon logging in, a new link pops up next to the now log out button and displays the users preferred name and account type.

Clicking on this will display the users profile, showing their email, preferred name, lab/company they are affiliated with, and account type. 