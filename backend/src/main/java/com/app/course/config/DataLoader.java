package com.app.course.config;

import com.app.course.model.Course;
import com.app.course.model.User;
import com.app.course.repository.CourseRepository;
import com.app.course.repository.UserRepository;
import com.app.course.service.SafeBCryptPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@SuppressWarnings("null")
public class DataLoader implements CommandLineRunner {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) {
        if (courseRepository.count() == 0) {
            var courses = List.of(
                    createCourse("Data Structures", "Core data structures and algorithms", 4, "Monday", "09:00", "11:00"),
                    createCourse("Operating Systems", "Process management and scheduling", 4, "Tuesday", "10:00", "12:00"),
                    createCourse("Database Systems", "Relational databases and SQL", 3, "Wednesday", "14:00", "16:00"),
                    createCourse("Computer Networks", "Network layers and protocols", 4, "Thursday", "09:00", "11:00"),
                    createCourse("Mathematical Optimization", "Optimization models and techniques", 3, "Friday", "10:00", "12:00"),
                    createCourse("Artificial Intelligence & ML", "AI fundamentals and machine learning", 4, "Monday", "14:00", "16:00"),
                    createCourse("Software Engineering", "Agile development and quality assurance", 3, "Tuesday", "09:00", "11:00"),
                    createCourse("Cloud Computing", "Cloud platforms and services", 3, "Wednesday", "14:00", "16:00")
            );
            courseRepository.saveAll(courses);
        }

        if (userRepository.count() == 0) {
            var encoder = new SafeBCryptPasswordEncoder();

            var admin = new User();
            admin.setName("Admin User");
            admin.setEmail("admin@courseapp.com");
            admin.setPassword(encoder.encode("admin123"));
            admin.setRole("ADMIN");
            userRepository.save(admin);

            var student = new User();
            student.setName("Student User");
            student.setEmail("student@courseapp.com");
            student.setPassword(encoder.encode("student123"));
            student.setRole("STUDENT");
            userRepository.save(student);
        }
    }

    private Course createCourse(String title, String description, int credits, String dayOfWeek, String startTime, String endTime) {
        var course = new Course();
        course.setTitle(title);
        course.setDescription(description);
        course.setCredits(credits);
        course.setDayOfWeek(dayOfWeek);
        course.setStartTime(startTime);
        course.setEndTime(endTime);
        return course;
    }
}
