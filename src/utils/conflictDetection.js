// Conflict detection utility functions

/**
 * Parse time string (e.g., "09:00-10:30") to start and end times
 */
export const parseTime = (timeString) => {
  const [start, end] = timeString.split('-');
  const [startHour, startMin] = start.split(':').map(Number);
  const [endHour, endMin] = end.split(':').map(Number);
  
  return {
    start: startHour * 60 + startMin, // Convert to minutes
    end: endHour * 60 + endMin
  };
};

/**
 * Check if two time slots overlap
 */
export const timeOverlaps = (time1, time2) => {
  const t1 = parseTime(time1);
  const t2 = parseTime(time2);
  
  return !(t1.end <= t2.start || t1.start >= t2.end);
};

/**
 * Check if two courses have overlapping days
 */
export const daysOverlap = (days1, days2) => {
  return days1.some(day => days2.includes(day));
};

/**
 * Check if two courses have a scheduling conflict
 */
export const hasConflict = (course1, course2) => {
  if (!course1.schedule || !course2.schedule) return false;
  
  const daysOverlap = course1.schedule.days.some(day => 
    course2.schedule.days.includes(day)
  );
  
  if (!daysOverlap) return false;
  
  return timeOverlaps(course1.schedule.time, course2.schedule.time);
};

/**
 * Check if a course conflicts with any course in a list
 */
export const hasConflictWithList = (course, courseList) => {
  return courseList.some(registeredCourse => 
    registeredCourse.id !== course.id && hasConflict(course, registeredCourse)
  );
};

/**
 * Get all conflicts for a list of courses
 */
export const getAllConflicts = (courses) => {
  const conflicts = [];
  
  for (let i = 0; i < courses.length; i++) {
    for (let j = i + 1; j < courses.length; j++) {
      if (hasConflict(courses[i], courses[j])) {
        conflicts.push({
          course1: courses[i],
          course2: courses[j]
        });
      }
    }
  }
  
  return conflicts;
};
