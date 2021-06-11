# appointment-manager-api


## Functions the API(web service)
  - Allows organizations to create a time slot for an appointment.
  - Allows clients to book an appointment with an organization.

### functions of an organization
- Create an account.
- Create a time slot.
- Delete time slot create they create.
- View all time slots.
- View time slot booked by clients.
- Edit the time slot they create.
   
### Functions of a client
  - Create an account.
  - View all available time slots created by organizations.
  - Book an appointment with an organization.
  - View appointments they create.
  - Receives SMS notification upon successful booking an appointment.
  - Receives SMS notification 15 minutes before time.
    
### Technology, Tools, programming language, frameworks used:
  - Java Script
  - Node JS
  - Postman
  - MongoDB
  - Robo 3T
  - NPM modules:
    * axios
    * bcrypt
    * express
    * jsonwebtoken
    * mongodb
    * mongoose
    * validator
### Third-party Integration Libraries:
  - Arkesel SMS notification library

# Endpoints
  ### Organization
  * POST: Create account -> /api/v1/register/users
  * POST: User login -> /api/v1/login/users
  * GET: View user profile details -> /api/v1/users/me
  * POST: Create time slot -> /api/v1/create/slots
  * GET: Get or fetch all time slot -> /api/v1/slots
  * PATCH: Update time slo created -> /api/v1/slot/{slot_id}
  * DELETE: Delete time slot -> /api/v1/slot/{slot_id}
  * GET: View appointments booked by clients -> /api/v1/bookings/all
  * POST: Logout from current account -> /api/v1/users/logout
  * POST: Logout from all accounts -> /api/v1/users/logoutAll

  ### Client
  * POST: Create account -> /api/v1/register/users
  * POST: User login -> /api/v1/login/users
  * GET: View user profile details -> /api/v1/users/me
  * POST: Create an appointment -> /api/v1/book/slot
  * GET: Get or fetch appointments a specific client created -> /api/v1/book/slot/me
  * POST: Logout from current account -> /api/v1/users/logout
  * POST: Logout from all accounts -> /api/v1/users/logoutAll



