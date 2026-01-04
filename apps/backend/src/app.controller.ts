import { Controller, Post, Body, Res, Get, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth/auth.service";
import { ApiResponse, User } from "@dashboard/shared-types";
import { AuthGuard } from "@nestjs/passport";
import { Roles, RolesGuard } from "./auth/roles.guard";

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly authService: AuthService) {}

  // LOGIN endpoint with username/password
  @Post("login")
  login(
    @Body() body: { username: string; password: string },
    @Res({ passthrough: true }) res: Response
  ) {
    const { username, password } = body;

    // simple in-memory validation
    if (username !== "anurag" || password !== "sisodia") {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user: User = {
      id: "1",
      email: "admin@dashboard.com",
      role: "ADMIN",
    };

    const token = this.authService.generateToken(user);

    // save token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    return { success: true, message: "Logged in" };
  }

  // protected endpoint
  @Get("me")
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("ADMIN")
  me(@Res({ passthrough: true }) res: Response): ApiResponse<User> {
    return {
      success: true,
      data: {
        id: "1",
        email: "admin@dashboard.com",
        role: "ADMIN",
      },
    };
  }
}
