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


## How to Run the Project Skeleton

### Prerequisites
- Java JDK 21 or later (tested with JDK 25)
- Maven Wrapper (included in the repository)
- Git
- Node v26.13.0

### Setup and Run

1. Clone the repository:

   ```bash
   git clone https://github.com/Ankyct/biotech-procurement-platform.git
   ```

2. Navigate to the backend directory:

   ```bash
   cd biotech-procurement-platform/backend
   ```

3. Start the Spring Boot application:

   **Windows:**
   ```powershell
   .\mvnw.cmd spring-boot:run
   ```

   **macOS/Linux:**
   ```bash
   ./mvnw spring-boot:run
   ```

### Verify That It Works

Once Spring Boot starts successfully, open the following URL in a browser:

http://localhost:8080/api/products

Expected response:

```text
ProductServices API is running
```

This endpoint serves as the initial implementation of the ProductServices subsystem and verifies that the project skeleton can run.

## Current Implementation Status

### What Works
- Spring Boot backend starts successfully on port 8080.
- The project contains the eight subsystem packages defined in Sprint 3.
- ProductServices includes an initial `ProductController` class.
- The `GET /api/products` endpoint responds successfully with a test message.

### What Is Not Implemented Yet
- Product search and price comparison (US3 integration pending).
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

Run the backend as described above, then in a second terminal (Node.js 22):

```sh
cd frontend
npm ci
npm run dev
```

Open the Vite URL shown in the terminal. The demo catalog links to `/products/1`,
`/products/2`, and `/products/3`. The detail page fetches the backend API and supports
loading, not found, and retry states. Vite proxies `/api` to `localhost:8080`.

US3 integration contract: search results must contain the unique product `id` and
link to `/products/{id}`. Replace the demo catalog with US3 results when ready;
coordinate real IDs before switching to PostgreSQL. Production hosting must serve
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
