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

![Deployment Diagram](docs/architecture/deployment-diagram.png)
