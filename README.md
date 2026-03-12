# Employee Management System

A full-stack Employee Management System built with **ASP.NET Core Web API**, **React (Vite)**, **SQL Server**, and **ADO.NET**.
The application allows users to manage employees and departments through a modern web interface.

<img width="1010" height="338" alt="Screenshot 2026-03-12 104028" src="https://github.com/user-attachments/assets/7edfcf4e-de56-468b-aabf-deac5aede3fd" />

This project demonstrates a **layered architecture** with Repository, Service, and Controller layers, along with client-side validation and RESTful API communication.

---

# Features

## Department Management

* Create departments
* Update department details
* Delete departments
* View department list
* Prevent duplicate department codes

## Employee Management

* Create employees
* Update employee details
* Delete employees
* View employee list
* Assign employees to departments

## Validation

### Client-side validation (React)

* Required fields
* Email format validation
* Minimum employee age (18)
* Salary must be greater than zero

### Server-side validation

* Prevent duplicate department codes
* Proper HTTP response handling

## User Interface

* Responsive layout using **Bootstrap**
* Form validation feedback
* Navigation between pages
* Clean table views for employees and departments

---

# Tech Stack

## Backend

* ASP.NET Core Web API
* ADO.NET
* SQL Server
* Repository Pattern
* Service Layer Architecture

## Frontend

* React (Vite)
* React Router
* Axios
* Bootstrap

---

# Project Architecture

The backend follows a layered architecture:

```
Controllers
   ↓
Services
   ↓
Repositories
   ↓
SQL Server Database
```

### Controllers

Handle HTTP requests and responses.

### Services

Contain business logic and validation rules.

### Repositories

Handle database operations using ADO.NET.

---

# API Endpoints

## Department API

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| GET    | /api/department      | Get all departments  |
| GET    | /api/department/{id} | Get department by ID |
| POST   | /api/department      | Create department    |
| PUT    | /api/department/{id} | Update department    |
| DELETE | /api/department/{id} | Delete department    |

---

## Employee API

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| GET    | /api/employee      | Get all employees  |
| GET    | /api/employee/{id} | Get employee by ID |
| POST   | /api/employee      | Create employee    |
| PUT    | /api/employee/{id} | Update employee    |
| DELETE | /api/employee/{id} | Delete employee    |

---

# Database Structure

## Department Table

| Column         | Type     |
| -------------- | -------- |
| DepartmentId   | int (PK) |
| DepartmentCode | nvarchar |
| DepartmentName | nvarchar |

## Employee Table

| Column       | Type     |
| ------------ | -------- |
| EmployeeId   | int (PK) |
| FirstName    | nvarchar |
| LastName     | nvarchar |
| Email        | nvarchar |
| DateOfBirth  | date     |
| Salary       | decimal  |
| DepartmentId | int (FK) |

