import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import organizationRoutes from "./routes/organizationRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import path from "path";
import fileRoutes from "./routes/fileRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import organizationMemberRoutes from "./routes/organizationMemberRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js";

const app = express();

const clientOrigin = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/files", fileRoutes);

app.use(
  "/uploads",
  express.static(
    path.resolve("uploads")
  )
);
app.use("/api/events", eventRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/organizations", organizationMemberRoutes);
app.use("/api/meetings", meetingRoutes);


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: " Welcome to Nexora API",
  });
});



export default app;