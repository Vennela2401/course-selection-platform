package com.app.course.service;

import com.app.course.model.Course;
import com.app.course.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    // ================= GET ALL COURSES =================
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // ================= ADD COURSE =================
    public Course addCourse(Course course) {
        if (course.getTitle() == null || course.getTitle().isEmpty()) {
            throw new RuntimeException("Course title is required");
        }
        return courseRepository.save(course);
    }

    // ================= GET COURSE BY ID =================
    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));
    }

    // ================= UPDATE COURSE =================
    public Course updateCourse(Long id, Course courseDetails) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));

        // Update only if values are not null (safe update)
        if (courseDetails.getTitle() != null) {
            course.setTitle(courseDetails.getTitle());
        }

        if (courseDetails.getDescription() != null) {
            course.setDescription(courseDetails.getDescription());
        }

        course.setCredits(courseDetails.getCredits());

        if (courseDetails.getDayOfWeek() != null) {
            course.setDayOfWeek(courseDetails.getDayOfWeek());
        }

        if (courseDetails.getStartTime() != null) {
            course.setStartTime(courseDetails.getStartTime());
        }

        if (courseDetails.getEndTime() != null) {
            course.setEndTime(courseDetails.getEndTime());
        }

        return courseRepository.save(course);
    }

    // ================= DELETE COURSE =================
    public void deleteCourse(Long id) {

        if (!courseRepository.existsById(id)) {
            throw new RuntimeException("Cannot delete. Course not found with id: " + id);
        }

        courseRepository.deleteById(id);
    }
}