module.exports.validateTokenExpiration = (token) => {
  try {
    console.log("HELLO HELLO");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("TESTEST")
    console.log("Decoded expiration:", decodedToken.exp);

    // Get current time in seconds
    const currentTime = Math.floor(Date.now() / 1000);
    console.log("Current time:", currentTime);

    if (currentTime > decodedToken.exp) {
      // Token has expired
      console.log("Token has expired");
      return false;
    }

    // Token is still valid
    console.log("Token is still valid");
    return true;
  } catch (error) {
    console.log("NO HELLO");
    // Token validation failed
    return false;
  }
};