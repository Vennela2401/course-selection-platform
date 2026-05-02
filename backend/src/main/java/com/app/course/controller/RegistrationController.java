package com.app.course.controller;

import com.app.course.model.Course;
import com.app.course.model.Registration;
import com.app.course.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {
    @Autowired
    private RegistrationService registrationService;

    @PostMapping("/register")
    public ResponseEntity<?> registerCourse(@RequestParam @NonNull Long studentId, @RequestParam @NonNull Long courseId) {
        try {
            Registration reg = registrationService.registerForCourse(studentId, courseId);
            return ResponseEntity.ok(reg);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/register")
    public ResponseEntity<?> unregisterCourse(@RequestParam @NonNull Long studentId, @RequestParam @NonNull Long courseId) {
        try {
            registrationService.unregisterFromCourse(studentId, courseId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Course>> getStudentSchedule(@PathVariable @NonNull Long studentId) {
        return ResponseEntity.ok(registrationService.getStudentSchedule(studentId));
    }

    @GetMapping("/credits/{studentId}")
    public ResponseEntity<Integer> getStudentCredits(@PathVariable @NonNull Long studentId) {
        return ResponseEntity.ok(registrationService.getStudentCredits(studentId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Registration>> getAllRegistrations() {
        return ResponseEntity.ok(registrationService.getAllRegistrations());
    }
}
