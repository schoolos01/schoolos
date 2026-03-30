-- Initial D1 Migration
-- Generated from school-os.xlsx schema

-- 1. Class table
CREATE TABLE IF NOT EXISTS classes (
    class_id TEXT PRIMARY KEY,
    academic_year TEXT,
    class_value INTEGER
);

-- 2. Subject table
CREATE TABLE IF NOT EXISTS subjects (
    subject_id TEXT PRIMARY KEY,
    subject_name TEXT
);

-- 3. Teacher table
CREATE TABLE IF NOT EXISTS teachers (
    teacher_id TEXT PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    qualification TEXT,
    primary_subject TEXT,
    phone_number TEXT,
    gender TEXT,
    joining_date TEXT,
    salary REAL,
    employee_type TEXT
);

-- 4. Guardian table
CREATE TABLE IF NOT EXISTS guardians (
    guardian_id TEXT PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    phone_no INTEGER,
    student_id TEXT, -- Will be linked via FK if student exists
    relation_with_student TEXT,
    email TEXT
);

-- 5. Student table 
CREATE TABLE IF NOT EXISTS students (
    registration_number TEXT PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    class TEXT,
    section TEXT,
    address TEXT,
    guardian_id TEXT REFERENCES guardians(guardian_id),
    date_of_birth TEXT,
    gender TEXT,
    blood_group TEXT,
    mother_name TEXT,
    father_name TEXT,
    pwd_flag INTEGER,
    class_id TEXT REFERENCES classes(class_id)
);

-- 6. Admin table (placeholder for class connection if needed)
CREATE TABLE IF NOT EXISTS admins (
    admin_id TEXT PRIMARY KEY,
    class_id TEXT REFERENCES classes(class_id)
);

-- 7. class_subject_teacher junction table
CREATE TABLE IF NOT EXISTS class_subject_teacher (
    allocation_id TEXT PRIMARY KEY,
    class_id TEXT REFERENCES classes(class_id),
    subject_id TEXT REFERENCES subjects(subject_id),
    teacher_id TEXT REFERENCES teachers(teacher_id)
);
