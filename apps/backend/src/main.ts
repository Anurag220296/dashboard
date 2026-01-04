import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: [
      "http://localhost:3000",                      
      "http://localhost:4000",                      
      "https://frontend-production-980a.up.railway.app",
    ],
    credentials: true,
  });

  await app.listen(4000);
  console.log("Backend running on http://localhost:4000");
}
bootstrap();
