Team presentation
Team name: Early Birds

Team members:

Vladyslav Zavdskyi
Nadja Brandenstein
Jesper Svoldgaard

About this project

Windmill farm!🌬️

WindmillFarm is a real-time wind turbine monitoring system developed as part of a school project at EASV. 🌬️

It is a web application designed for windmill inspectors who need to monitor and control wind turbines remotely. Telemetry data such as wind speed, rotor speed, power output and more is streamed live from a public MQTT broker directly into the dashboard.
The inspector can select individual turbines from a dropdown and see all their metrics update in real-time through interactive graphs. Alerts are automatically displayed when something is wrong with a turbine, and operators can send control commands such as starting, stopping or adjusting blade pitch directly from the UI.
All telemetry, alerts and commands are saved to a database so there is always a complete history of everything that has happened across the wind farm.

Program must be written in
C# for backend and API
React + TypeScript for frontend
"The application must contain

Real-time telemetry monitoring per turbine
Graphical dashboard with live updating charts
Turbine controls (start, stop, blade pitch adjustment) with authentication
Complete history of all telemetry, alerts and commands saved to a database

We have made so it contains

Real-time telemetry streamed from a public MQTT broker
Live graphs for all turbine metrics (wind speed, rotor speed, power output, temperature, vibration and more)
Turbine selector dropdown to monitor individual turbines
Alert feed showing incoming warnings from the broker
Control panel for sending commands to turbines
Full telemetry and alert history persisted in a relational database

Current state of the project
The current state of the project is that the core functionality is working.
Telemetry data flows from the MQTT broker through the backend and into the live dashboard in real-time.
The database correctly stores all incoming data and the frontend updates automatically without any polling."

Security Policies
This project implements multiple security mechanisms to protect user data and ensure secure authentication and authorization.

1. JWT (JSON Web Token) Authentication
The application uses JWT for stateless authentication.
After logging in, the user receives a signed token that must be included with each request.
Tokens are signed using HMAC-SHA512.
The signing secret is stored as JwtKey (should be stored securely in production).
The token includes an expiration time and is validated on every request.
Validation checks the token’s issuer, audience, expiration, and signature.
2. Password Hashing (Argon2id + Salt)
Passwords are never stored in plain text.
We use NSecArgon2IdPasswordHasher, which applies the Argon2id algorithm—one of the strongest password hashing algorithms.
How passwords are handled:

A unique cryptographic salt is generated for each password.
Passwords are hashed using Argon2id, which is memory-hard and resistant to brute-force and GPU attacks.
Only the final hash (not the password or salt) is stored in the database.
3. Token Signing with HMAC-SHA512
JWT tokens are signed using the following configuration:

public const string SignatureAlgorithm = SecurityAlgorithms.HmacSha512;

This ensures:

Strong token integrity
Protection against tampering
Prevention of token forgery
4. Secure Configuration Storage
Sensitive values such as:

public const string JwtKey = "JwtKey";

Are not hard-coded in production.
They must be stored in secure locations such as:

Environment variables
User secrets
Secret managers or vaults
5. Additional Security Measures
HTTPS is required to encrypt network traffic
Token expiration is enforced to limit the lifetime of compromised tokens
Role/claim-based authorization ensures users can only access permitted resources

