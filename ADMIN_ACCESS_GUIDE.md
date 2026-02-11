# Quick Admin Setup Guide

## 🚀 Three Ways to Access the Admin Panel

### Method 1: Use Hardcoded Admin (Fastest)

Login with these credentials:

- **Email:** `admin@gmail.com`
- **Password:** `Admin@123`

Then go to: `http://localhost:5173/admin`

---

### Method 2: Create Admin User with Script

1. Navigate to backend folder:

   ```bash
   cd backend
   ```

2. Run the admin creation script:

   ```bash
   node createAdmin.js
   ```

3. This will create an admin user with:
   - Email: `admin@example.com`
   - Password: `Admin123!`

4. Login and visit `/admin`

---

### Method 3: Manually Update User in MongoDB

#### Using MongoDB Compass:

1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Select database: `sitarayza_ecommerce`
4. Go to `users` collection
5. Find your user document
6. Edit the document and change:
   ```json
   "role": "admin"
   ```
7. Save the document

#### Using MongoDB Shell:

```javascript
use sitarayza_ecommerce
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

---

## ✅ Verify Admin Access

After setting up admin:

1. **Logout** if you're currently logged in
2. Go to: `http://localhost:5173/login`
3. Login with your admin credentials
4. You should be automatically redirected to: `http://localhost:5173/admin`
5. The navbar should show a "Dashboard" button

---

## 🔍 Troubleshooting

### Not redirecting to admin panel?

- Open browser console (F12)
- Check for any errors
- Verify `localStorage` has:
  - `token`: (your JWT token)
  - `isAdmin`: `"true"`

### Can't access /admin?

- Make sure you're logged in as admin
- Check the browser console for "ProtectedAdminRoute" logs
- Try logging out and logging back in

### Dashboard link not showing?

- The navbar only shows "Dashboard" link when:
  - User is logged in (`token` exists)
  - User is admin (`isAdmin` is `"true"`)
- Try refreshing the page after login

---

## 📱 Admin Panel Routes

Once logged in as admin, you can access:

- `/admin` - Dashboard with statistics
- `/admin/products` - Manage products (CRUD)
- `/admin/users` - Manage users
- `/admin/orders` - Manage orders

All routes are protected and require admin authentication!

---

## 🔐 Security Notes

- The hardcoded admin credentials are for development only
- In production, remove the hardcoded admin check from `authRoutes.js`
- Use environment variables for sensitive data
- Consider implementing 2FA for admin accounts
