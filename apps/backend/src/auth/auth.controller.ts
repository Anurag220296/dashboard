import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

@Controller("auth")
export class AuthController {

  @Post("login")
  login(
    @Body() body: { username: string; password: string },
    @Res({ passthrough: true }) res: Response
  ) {
    console.log("LOGIN HIT", body);

    // hardcoded credentials (as requested)
    if (body.username !== "anurag" || body.password !== "sisodia") {
      return { success: false };
    }

    const token = "mock-jwt-token";

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    return {
      success: true,
      user: {
        username: "anurag",
      },
    };
  }

  @Get("me")
  me(@Req() req: Request) {
    const token = req.cookies?.token;

    if (!token) {
      return { authenticated: false };
    }

    return {
      authenticated: true,
      user: {
        username: "anurag",
      },
    };
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("token");
    return { success: true };
  }
}
