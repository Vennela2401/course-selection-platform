package com.app.course.controller;

import com.app.course.model.User;
import com.app.course.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // ✅ FIXED HERE
public class AuthController {

    @Autowired
    private UserService userService;

    // ================= REGISTER =================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        try {
            System.out.println("Register API called");
            System.out.println("Email: " + user.getEmail());

            User savedUser = userService.registerUser(user);

            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "Registration successful",
                    "user", savedUser
            ));

        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.status(500).body(Map.of(
                    "status", "error",
                    "message", e.getMessage() != null ? e.getMessage() : "Registration failed"
            ));
        }
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        try {
            User loggedInUser = userService.loginUser(
                    user.getEmail(),
                    user.getPassword()
            );

            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "Login successful",
                    "user", loggedInUser
            ));

        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.status(401).body(Map.of(
                    "status", "error",
                    "message", e.getMessage() != null ? e.getMessage() : "Login failed"
            ));
        }
    }

    // ================= FORGOT PASSWORD =================
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {

        String email = request.get("email");

        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", "Email is required"
            ));
        }

        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Password reset link sent to " + email
        ));
    }

    // ================= GOOGLE LOGIN =================
    @PostMapping("/google")
    public ResponseEntity<?> googleLogin() {

        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Google login successful (mock)",
                "provider", "google"
        ));
    }

    // ================= GITHUB LOGIN =================
    @PostMapping("/github")
    public ResponseEntity<?> githubLogin() {

        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "GitHub login successful (mock)",
                "provider", "github"
        ));
    }
}