# Admin Panel Setup & Usage Guide

## 🎉 Complete Admin Panel - Features

Your Sitarayza E-commerce store now has a **fully functional admin panel** with:

### ✅ Dashboard

- Total Revenue statistics
- Total Orders, Products, and Users count
- Order status breakdown (Pending/Delivered)
- Recent orders list with details

### ✅ Products Management

- **View all products** in a table with images
- **Add new products** with full details (title, description, price, category, sizes, colors, stock, images)
- **Edit existing products**
- **Delete products**
- **Search products** by name or category
- Support for men, women, and child categories

### ✅ Users Management

- **View all users** with their details
- **Edit user information** (name, email, phone, role)
- **Delete users**
- **Change user roles** (user/admin)
- **Search users** by name or email

### ✅ Orders Management

- **View all orders** with customer details
- **Update order status** (pending/delivered/cancelled)
- **View full order details** (items, customer info, totals)
- **Delete orders**
- **Filter orders** by status (All/Pending/Delivered/Cancelled)

---

## 🚀 Getting Started

### Backend Setup

1. **Navigate to backend folder:**

   ```bash
   cd backend
   ```

2. **Create `.env` file:**

   ```bash
   copy .env.example .env
   ```

3. **Edit `.env` file with your MongoDB URI:**

   ```
   MONGO_URI=mongodb://localhost:27017/sitarayza_ecommerce
   JWT_SECRET=your_super_secret_jwt_key
   PORT=5000
   ```

4. **Install dependencies (if not already done):**

   ```bash
   npm install
   ```

5. **Start the backend server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend folder:**

   ```bash
   cd Frontend
   ```

2. **Install dependencies (if not already done):**

   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## 🔐 How to Create an Admin User

Since regular signup creates users with role "user", you need to manually create an admin user:

### Option 1: Using MongoDB Compass or CLI

1. Open your MongoDB database
2. Find the `users` collection
3. Find your user document
4. Change the `role` field from `"user"` to `"admin"`

### Option 2: Using MongoDB Shell

```javascript
use sitarayza_ecommerce
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

---

## 📱 Accessing the Admin Panel

1. **Login with admin credentials:**
   - Go to: `http://localhost:5173/login`
   - Enter your admin email and password

2. **Access admin panel:**
   - Click on "Dashboard" in the navbar (only visible to admins)
   - Or directly visit: `http://localhost:5173/admin`

3. **Admin panel navigation:**
   - `/admin` - Dashboard with statistics
   - `/admin/products` - Products management
   - `/admin/users` - Users management
   - `/admin/orders` - Orders management

---

## 🔧 Backend API Endpoints

### Admin Routes (Requires Admin Authentication)

**Base URL:** `http://localhost:5000/api/admin`

#### Dashboard Stats

- `GET /stats` - Get dashboard statistics

#### Products

- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `POST /products` - Create new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

#### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get single user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

#### Orders

- `PUT /orders/:id` - Update order status
- `DELETE /orders/:id` - Delete order

### Authentication Headers

All admin routes require an authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## 📋 Product Schema

When adding/editing products, use this structure:

```json
{
  "title": "Product Name",
  "description": "Product description",
  "price": 1999,
  "category": "men", // or "women", "child"
  "sizes": ["LG", "MD", "SM"],
  "colors": ["Black", "White", "Blue"],
  "image": "/path/to/image.jpg",
  "stock": 100,
  "featured": false
}
```

---

## 🎨 Features Highlights

### Responsive Design

- Mobile-friendly sidebar navigation
- Responsive tables and cards
- Touch-friendly controls

### Protected Routes

- Admin routes are protected
- Automatic redirect to login if not authenticated
- Role-based access control

### Real-time Updates

- Instant search filtering
- Live status updates for orders
- Automatic data refresh after operations

### User Experience

- Loading states for all operations
- Confirmation dialogs for destructive actions
- Success/error notifications
- Clean and modern UI with Tailwind CSS

---

## 🔒 Security Features

1. **JWT Authentication** - Secure token-based auth
2. **Admin Middleware** - Server-side role verification
3. **Protected Routes** - Client-side route protection
4. **Password Hashing** - bcryptjs for secure passwords
5. **CORS Configuration** - Controlled API access

---

## 📝 Common Tasks

### Adding a New Product

1. Go to `/admin/products`
2. Click "Add Product" button
3. Fill in all product details
4. Click "Add Product" to save

### Updating Order Status

1. Go to `/admin/orders`
2. Find the order in the table
3. Use the dropdown in the Status column
4. Select new status - updates automatically

### Making a User Admin

1. Go to `/admin/users`
2. Click the edit icon next to the user
3. Change Role to "Admin"
4. Click "Update User"

---

## 🐛 Troubleshooting

**Can't access admin panel:**

- Make sure you're logged in
- Verify your user has `role: "admin"` in the database
- Check browser console for errors

**Backend not connecting:**

- Verify MongoDB is running
- Check `.env` file configuration
- Ensure backend server is running on port 5000

**Frontend not loading:**

- Check if frontend dev server is running
- Verify port 5173 is available
- Clear browser cache

---

## 🎯 Next Steps

You can now:

- Add products to your store
- Manage user accounts
- Process orders
- View sales statistics
- Expand the admin panel with more features

Enjoy your fully functional admin panel! 🚀
