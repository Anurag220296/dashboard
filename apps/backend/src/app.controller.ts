import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  UseGuards,
  UnauthorizedException,
} from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "@nestjs/passport";
import { Roles, RolesGuard } from "./auth/roles.guard";
import { User, ApiResponse } from "./types"; // <-- local types

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): ApiResponse<string> {
    return {
      success: true,
      message: "Dashboard API is running",
      data: "Dashboard API is running",
    };
  }

  @Post("login")
  async login(
    @Body() body: { username: string; password: string },
    @Res({ passthrough: true }) res: Response
  ): Promise<ApiResponse<null>> {
    const { username, password } = body;

    if (username !== "anurag" || password !== "sisodia") {
      throw new UnauthorizedException("Invalid credentials");
    }

    const user: User = { id: "1", email: "admin@dashboard.com", role: "ADMIN" };
    const token = this.authService.generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
    });

    return {
      success: true,
      message: "Logged in successfully",
      data: null,
    };
  }

  @Get("me")
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("ADMIN")
  me(): ApiResponse<User> {
    const user: User = { id: "1", email: "admin@dashboard.com", role: "ADMIN" };
    return { success: true, message: "User fetched successfully", data: user };
  }
}
