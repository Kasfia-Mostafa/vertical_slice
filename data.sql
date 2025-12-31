-- Task 1 & 2: Main University Table
CREATE TABLE
  universities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    degree_level VARCHAR(50) NOT NULL, -- e.g., 'Bachelors', 'Masters'
    tuition INTEGER NOT NULL, -- Annual fee in USD
    min_gpa DECIMAL(3, 2) NOT NULL, -- e.g., 3.50
    min_ielts DECIMAL(2, 1) NOT NULL, -- e.g., 7.5
    image_url TEXT -- URL for the card visual
  );

-- Task 4: Applications Table
CREATE TABLE
  applications (
    id SERIAL PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    student_email VARCHAR(255),
    university_id INTEGER REFERENCES universities (id) ON DELETE CASCADE,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'Pending'
  );

INSERT INTO
  universities (
    name,
    country,
    degree_level,
    tuition,
    min_gpa,
    min_ielts,
    image_url
  )
VALUES
  (
    'Harvard University',
    'USA',
    'Masters',
    54000,
    3.9,
    8.0,
    'https://images.unsplash.com/photo-1590231204765-12b10cedb4fa?q=80&w=1332&auto=format&fit=crop'
  ),
  (
    'Stanford University',
    'USA',
    'Masters',
    52000,
    3.8,
    7.5,
    'https://images.unsplash.com/photo-1590231204765-12b10cedb4fa?q=80&w=1332&auto=format&fit=crop'
  ),
  (
    'University of Melbourne',
    'Australia',
    'Masters',
    32000,
    3.4,
    7.0,
    'https://images.unsplash.com/photo-1574958269340-fa927503f3dd?q=80&w=1048&auto=format&fit=crop'
  ),
  (
    'ETH Zurich',
    'Switzerland',
    'Bachelors',
    2000,
    3.5,
    7.0,
    'https://images.unsplash.com/flagged/photo-1554473675-d0904f3cbf38?q=80&w=1170&auto=format&fit=crop'
  ),
  (
    'University of Amsterdam',
    'Netherlands',
    'Bachelors',
    12000,
    3.0,
    6.5,
    'https://images.unsplash.com/photo-1590579906355-9ea60292515b?q=80&w=1478&auto=format&fit=crop'
  ),
  (
    'McGill University',
    'Canada',
    'Masters',
    28000,
    3.6,
    7.0,
    'https://images.unsplash.com/photo-1678111196398-16e3cc95ce91?q=80&w=1170&auto=format&fit=crop'
  ),
  (
    'National University of Singapore',
    'Singapore',
    'Masters',
    35000,
    3.7,
    7.5,
    'https://images.unsplash.com/photo-1595134561159-11a5fbf6b3f4?q=80&w=1329&auto=format&fit=crop'
  ),
  (
    'Tsinghua University',
    'China',
    'Bachelors',
    6000,
    3.5,
    6.5,
    'https://images.unsplash.com/photo-1650225554926-b70324a698ae?q=80&w=1170&auto=format&fit=crop'
  ),
  (
    'University of Tokyo',
    'Japan',
    'Masters',
    8000,
    3.3,
    7.0,
    'https://images.unsplash.com/photo-1620650764196-fd37ec58c687?q=80&w=1169&auto=format&fit=crop'
  ),
  (
    'Sorbonne University',
    'France',
    'Bachelors',
    3000,
    3.0,
    6.5,
    'https://images.unsplash.com/photo-1606996704899-fa6204d20c6c?q=80&w=1075&auto=format&fit=crop'
  ),
  (
    'Seoul National University',
    'South Korea',
    'Masters',
    10000,
    3.4,
    7.0,
    'https://images.unsplash.com/photo-1613896809181-3c1a5b6083a5?q=80&w=1170&auto=format&fit=crop'
  ),
  (
    'University of Copenhagen',
    'Denmark',
    'Bachelors',
    15000,
    3.0,
    6.5,
    'https://images.unsplash.com/photo-1561525985-654e6a2fa04a?q=80&w=2070&auto=format&fit=crop'
  ),
  (
    'Lund University',
    'Sweden',
    'Masters',
    18000,
    3.2,
    6.5,
    'https://images.unsplash.com/photo-1613901118748-3da557eb37cf?q=80&w=1170&auto=format&fit=crop'
  ),
  (
    'KU Leuven',
    'Belgium',
    'Bachelors',
    4000,
    3.0,
    6.5,
    'https://images.unsplash.com/photo-1577212183172-b76b13704f51?q=80&w=1074&auto=format&fit=crop'
  ),
  (
    'University of British Columbia',
    'Canada',
    'Bachelors',
    38000,
    3.5,
    7.0,
    'https://images.unsplash.com/photo-1610525840724-9405937a8681?q=80&w=1170&auto=format&fit=crop'
  ),
  (
    'University of Edinburgh',
    'UK',
    'Masters',
    31000,
    3.5,
    7.0,
    'https://images.unsplash.com/photo-1682186909370-386d10c3290b?q=80&w=1074&auto=format&fit=crop'
  ),
  (
    'University of Sydney',
    'Australia',
    'Bachelors',
    42000,
    3.2,
    6.5,
    'https://images.unsplash.com/photo-1565969358191-749f3c6dec6e?q=80&w=1171&auto=format&fit=crop'
  ),
  (
    'King’s College London',
    'UK',
    'Bachelors',
    29000,
    3.4,
    7.0,
    'https://images.unsplash.com/photo-1671709363686-a7899fb1238e?q=80&w=1170&auto=format&fit=crop'
  ),
  (
    'University of Vienna',
    'Austria',
    'Bachelors',
    1500,
    3.0,
    6.0,
    'https://images.unsplash.com/photo-1741528803484-a14f1ae76f2e?q=80&w=1170&auto=format&fit=crop'
  ),
  (
    'University of Helsinki',
    'Finland',
    'Masters',
    13000,
    3.1,
    6.5,
    'https://images.unsplash.com/photo-1688872294305-15c3242ed3d8?q=80&w=1244&auto=format&fit=crop'
  );
