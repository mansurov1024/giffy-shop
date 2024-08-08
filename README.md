# giffy-shop
1. git clone git@github.com:mansurov1024/giffy-shop.git
2. cd giffy-shop
3. make
4. Open in browser: http://localhost/login

Test user:
email: johndoe@test.com
password === 123456

A CRM feature can be added as a separate instance, interacting with the database and providing an API for external CRM integration.

A payment gateway can be integrated as another instance to handle payment processing.

When a user clicks the "buy" button, an order with "pending" status is created and stored in the database before redirecting to the payment gateway.

Currently, the user is hardcoded for testing purposes.