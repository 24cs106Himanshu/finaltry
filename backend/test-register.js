// Test registration endpoint
// Run this after the server is running: node test-register.js

const testRegistration = async () => {
  const testUser = {
    name: "Test User",
    email: "test@example.com",
    password: "test123456",
    role: "patient"
  };

  console.log("Testing registration endpoint...");
  console.log("User data:", testUser);

  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testUser),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log("\n✅ Registration successful!");
      console.log("Response:", JSON.stringify(data, null, 2));
      console.log("\nToken:", data.token);
      console.log("User:", data.user);
    } else {
      console.log("\n❌ Registration failed!");
      console.log("Status:", response.status);
      console.log("Error:", data.message || data.error);
    }
  } catch (error) {
    console.error("\n❌ Request failed:");
    console.error("Error:", error.message);
    console.error("\nMake sure the server is running on http://localhost:5000");
  }
};

testRegistration();
