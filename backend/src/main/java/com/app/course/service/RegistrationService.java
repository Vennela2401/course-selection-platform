package com.app.course.service;

import com.app.course.model.Course;
import com.app.course.model.Registration;
import com.app.course.model.User;
import com.app.course.repository.CourseRepository;
import com.app.course.repository.RegistrationRepository;
import com.app.course.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RegistrationService {

    @Autowired
    private RegistrationRepository registrationRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    private static final int MAX_CREDITS = 20;

    public Registration registerForCourse(Long studentId, Long courseId) {

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Course newCourse = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (registrationRepository.existsByStudentIdAndCourseId(studentId, courseId)) {
            throw new RuntimeException("Already registered");
        }

        List<Registration> currentRegistrations =
                registrationRepository.findByStudentId(studentId);

        // CREDIT CHECK
        int totalCredits = currentRegistrations.stream()
                .mapToInt(reg -> reg.getCourse().getCredits())
                .sum();

        if (totalCredits + newCourse.getCredits() > MAX_CREDITS) {
            throw new RuntimeException("Credit limit exceeded");
        }

        // TIME CHECK
        LocalTime newStart = LocalTime.parse(newCourse.getStartTime());
        LocalTime newEnd = LocalTime.parse(newCourse.getEndTime());

        for (Registration reg : currentRegistrations) {

            Course existing = reg.getCourse();

            if (existing.getDayOfWeek().equalsIgnoreCase(newCourse.getDayOfWeek())) {

                LocalTime existingStart = LocalTime.parse(existing.getStartTime());
                LocalTime existingEnd = LocalTime.parse(existing.getEndTime());

                if (newStart.isBefore(existingEnd) && newEnd.isAfter(existingStart)) {
                    throw new RuntimeException("Schedule conflict with: " + existing.getTitle());
                }
            }
        }

        Registration registration = new Registration();
        registration.setStudent(student);
        registration.setCourse(newCourse);

        return registrationRepository.save(registration);
    }

    public List<Course> getStudentSchedule(Long studentId) {
        return registrationRepository.findByStudentId(studentId)
                .stream()
                .map(Registration::getCourse)
                .collect(Collectors.toList());
    }

    public int getStudentCredits(Long studentId) {
        return registrationRepository.findByStudentId(studentId)
                .stream()
                .mapToInt(reg -> reg.getCourse().getCredits())
                .sum();
    }

    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }
}