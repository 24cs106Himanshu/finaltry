// Test login endpoint
const testLogin = async () => {
  const credentials = {
    email: "test@example.com",
    password: "test123456"
  };

  console.log("Testing login endpoint...");
  console.log("Credentials:", credentials);

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log("\n✅ Login successful!");
      console.log("Response:", JSON.stringify(data, null, 2));
      console.log("\nToken:", data.token);
      console.log("User:", data.user);
    } else {
      console.log("\n❌ Login failed!");
      console.log("Status:", response.status);
      console.log("Error:", data.message || data.error);
    }
  } catch (error) {
    console.error("\n❌ Request failed:");
    console.error("Error:", error.message);
  }
};

testLogin();
