export const sendToken = (user, res, statusCode = 200) => {
  const token = user.getJWT();

  const isProduction = process.env.IS_PRODUCTION === "true";
    console.log(isProduction)
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
    })
    .json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
};
