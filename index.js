import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Products } from "./model/product.model.js";
import productRoute from "./routes/product.route.js";
import authRoute from "./routes/user.route.js";
import cors from "cors";

import bcrypt from "bcrypt";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./model/user.model.js";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(cors());
app.use(express.json());

// enhance home page of the server
app.get("/", (req, res) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Server Status - Online</title>
    <style>
        /* Base Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            background-color: #f8fafc;
            color: #334155;
            line-height: 1.6;
        }

        /* Navigation */
        nav {
            background-color: white;
            padding: 1.2rem 5%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        
        .logo {
            font-size: 1.4rem;
            font-weight: 700;
            color: #0f172a;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .status-dot {
            width: 10px;
            height: 10px;
            background-color: #22c55e; /* Green for online */
            border-radius: 50%;
            display: inline-block;
            box-shadow: 0 0 8px #22c55e;
        }

        /* Hero Section */
        .hero {
            background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
            color: white;
            padding: 6rem 2rem;
            text-align: center;
        }

        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1.2rem;
            font-weight: 800;
            letter-spacing: -0.05em;
        }

        .hero p {
            font-size: 1.2rem;
            max-width: 600px;
            margin: 0 auto;
            color: #94a3b8;
        }

        /* Content Section */
        .container {
            max-width: 900px;
            margin: -3rem auto 4rem auto;
            padding: 0 1.5rem;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
        }

        .card {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
            border: 1px solid #e2e8f0;
        }

        .card h2 {
            color: #0f172a;
            margin-bottom: 1rem;
            font-size: 1.3rem;
        }

        .card p {
            margin-bottom: 1rem;
            color: #475569;
        }
        
        .code-block {
            background-color: #f1f5f9;
            padding: 0.8rem;
            border-radius: 6px;
            font-family: monospace;
            font-size: 0.9rem;
            color: #334155;
            border: 1px solid #e2e8f0;
        }

        /* Footer */
        footer {
            text-align: center;
            padding: 2rem;
            color: #64748b;
            font-size: 0.9rem;
            border-top: 1px solid #e2e8f0;
            margin-top: 2rem;
        }
    </style>
</head>
<body>

    <!-- Navigation -->
    <nav>
        <a href="#" class="logo">
            <span class="status-dot"></span>
            Backend API Server
        </a>
    </nav>

    <!-- Hero Section -->
    <header class="hero">
        <h1>Server is Running</h1>
        <p>Welcome to the root endpoint. This server is up and actively listening for incoming HTTP requests.</p>
    </header>

    <!-- Info Cards Section -->
    <main class="container">
        <!-- Card 1 -->
        <div class="card">
            <h2>What is this place?</h2>
            <p>You have reached the root directory (<code>/</code>) of our Node.js and Express backend. </p>
            <p>This server's primary job is to process logic, communicate with databases, and return data to frontend applications (like mobile apps or React websites).</p>
        </div>

        <!-- Card 2 -->
        <div class="card">
            <h2>How it works</h2>
            <p>Instead of displaying web pages, backend servers usually respond with raw data called <strong>JSON</strong>.</p>
            <p>For example, a frontend app might make a GET request to an endpoint like this:</p>
            <div class="code-block">
                GET /api/products
            </div>
            <div class="code-block">
                GET /api/products/:id
            </div>
            <div class="code-block">
                POST /api/products
            </div>
            <div class="code-block">
                DELETE /api/products/:id
            </div>
            <p style="margin-top: 1rem;">And this server will respond with the requested user data!</p>
        </div>
    </main>

    <!-- Footer -->
    <footer>
        <p>&copy; 2026 API Backend Service. All systems nominal.</p>
    </footer>

</body>
</html>`;
  return res.send(html);
});

app.use("/api/products", productRoute);

app.use("/api/auth", authRoute);

// connecting Database
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Successfully connected to mongosedb");
    app.listen(PORT, (req, res) => {
      console.log(`Server running on Port : http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoseDB connection error", error.message);
    app.listen(PORT, (req, res) => {
      console.log(`Server running on Port :  http://localhost:${PORT}`);
    });
    process.exit(1);
  });
