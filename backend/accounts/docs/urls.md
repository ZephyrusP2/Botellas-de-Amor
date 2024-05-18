# API Endpoints for User Management

## User Authentication

- **Registration:** `POST /api/user/register` - Allows users to create new accounts.
- **Login:** `POST /api/user/login` - Handles user login with email and password verification.
- **Admin Login:** `POST /api/admin/login` - Handles admin or operator login with email and password verification.

## User Data Management

- **User Data (Admin or Self):** `GET /api/user/data` - Retrieves or modifies a user's personal data.
- **User List (Admin Only):** `GET /api/user/list` - Retrieves a list of all users (restricted access).

## User CRUD Operations (Create, Read, Update, Delete)

- **Create User (Admin Only):** `POST /api/user/create` - Allows creation of a new user account.
- **Show User Details (Admin or Self):** `GET /api/user/show/<user_id>` - Retrieves the details of a specific user identified by their ID.
- **Update User Details (Admin or Self):** `PUT /api/user/update/<user_id>` - Allows updating the details of a specific user.
- **Delete User (Admin or Self):** `DELETE /api/user/delete/<user_id>` - Allows deleting a specific user account.

## Additional Endpoints

- **User's Bottles:** `GET /api/user/bottles` - Retrieves information about a user's recycled bottles.
- **Change Password (User):** `POST /api/user/change_password/<user_id>` - Allows users to change their passwords.
- **Reset Password (Admin):** `POST /api/user/reset_password/<user_id>` - Allows admins to reset a user's password.
