import jwt from "jsonwebtoken";



// Function to decode and verify the token
export const decodeAndVerifyToken = (token: string) => {
  try {
    // Decode the token (Note: This doesn't perform any verification)
    const decodedToken = jwt.decode(token, { complete: true });

    // Verify the token using the provided secret key
    jwt.verify(token, "5z", (err, decoded) => {
      if (err) {
        console.error("Invalid token:", err.message);
        return false;
      }

      // If the token is valid, you can access its contents in the 'decoded' variable
      console.log("Decoded Token:", decoded);

      return true;
    });
  } catch (error) {
    console.error("Error decoding or verifying token:", error);
    return false;
  }
};

// Call the function with your token and secret key

