const User = require("./User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Mock users for when MongoDB is not connected
const mockUsers = [];

// Helper to check if MongoDB is connected
const isMongoConnected = () => {
  return mongoose.connection.readyState === 1;
};

exports.registerUser = async (req, res) => {
  try {
    const { name, firstName, lastName, email, password, role } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Derive name fields
    const derivedName = name || `${firstName || ""} ${lastName || ""}`.trim();
    const fallbackName = derivedName || (email ? email.split("@")[0] : "");

    if (!fallbackName) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Split name into firstName and lastName if not provided
    let finalFirstName = firstName;
    let finalLastName = lastName;
    
    if (!finalFirstName && !finalLastName) {
      const nameParts = fallbackName.split(" ");
      finalFirstName = nameParts[0] || fallbackName;
      finalLastName = nameParts.slice(1).join(" ") || "";
    }

    const normalizedEmail = email.toLowerCase();

    // Check if MongoDB is connected
    if (!isMongoConnected()) {
      // Mock mode
      const userExists = mockUsers.find(u => u.email === normalizedEmail);
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const mockUser = {
        _id: Date.now().toString(),
        id: Date.now().toString(),
        name: fallbackName,
        firstName: finalFirstName,
        lastName: finalLastName,
        email: normalizedEmail,
        password: hashedPassword,
        role: role || "patient",
      };
      mockUsers.push(mockUser);

      const token = jwt.sign(
        { id: mockUser._id, role: mockUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(201).json({
        message: "User registered successfully (mock mode)",
        token,
        user: {
          id: mockUser._id,
          name: mockUser.name,
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          email: mockUser.email,
          role: mockUser.role,
        },
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name: fallbackName,
      email: normalizedEmail,
      password: hashedPassword,
      role: role || "patient",
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const userResponse = {
      id: user._id,
      name: user.name,
      firstName: finalFirstName,
      lastName: finalLastName,
      email: user.email,
      role: user.role,
    };

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Registration error:", error);
    const status = error.name === "ValidationError" ? 400 : 500;
    res.status(status).json({ 
      message: error.message || "Registration failed",
      error: process.env.NODE_ENV === "development" ? error.stack : undefined
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const normalizedEmail = email.toLowerCase();

    // Check if MongoDB is connected
    if (!isMongoConnected()) {
      // Mock mode
      const user = mockUsers.find(u => u.email === normalizedEmail);
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({ 
        message: "Login successful (mock mode)",
        token, 
        user: {
          id: user._id,
          name: user.name,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        }
      });
    }

    // Find user
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Split name into firstName and lastName
    const nameParts = user.name.split(" ");
    const firstName = nameParts[0] || user.name;
    const lastName = nameParts.slice(1).join(" ") || "";

    const userResponse = {
      id: user._id,
      name: user.name,
      firstName: firstName,
      lastName: lastName,
      email: user.email,
      role: user.role,
    };

    res.json({ 
      message: "Login successful",
      token, 
      user: userResponse 
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Login failed",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

exports.verifyToken = async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (!isMongoConnected()) {
      // Mock mode
      const user = mockUsers.find(u => u._id === req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { password, ...userWithoutPassword } = user;
      return res.json({ user: userWithoutPassword });
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Split name into firstName and lastName
    const nameParts = user.name.split(" ");
    const firstName = nameParts[0] || user.name;
    const lastName = nameParts.slice(1).join(" ") || "";

    const userResponse = {
      id: user._id,
      name: user.name,
      firstName: firstName,
      lastName: lastName,
      email: user.email,
      role: user.role,
    };

    res.json({ user: userResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
