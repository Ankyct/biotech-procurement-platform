# Biotech Procurement Platform

#### Team name: Undecided

#### Members: Simon Cochran, Kelly Zheng Feng, Naresh Kharel, Wanzi Xiao



## Project Purpose
This project aims to build a procurement platform for Cello's Lab to improve the efficiency of the purchasing process. The platform will help lab members find and compare products from different vendors, organize purchasing information, and better manage their orders in one place.

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

![Deployment Diagram](docs/architecture/deployment-diagram.png)


## How to Run the Project Skeleton

### Prerequisites
- Java JDK 21 or later (tested with JDK 25)
- Maven Wrapper (included in the repository)
- Git

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
- Product search, item details, and price comparison.
- Backend integration with PostgreSQL.
- Business logic for the remaining subsystems.
- Frontend-backend integration.
