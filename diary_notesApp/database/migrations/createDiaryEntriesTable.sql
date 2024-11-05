CREATE TABLE DiaryEntries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL
);

CREATE PROCEDURE InsertDiaryEntry(IN entryTitle VARCHAR(255), IN entryContent TEXT)
BEGIN
    INSERT INTO DiaryEntries (title, content) VALUES (entryTitle, entryContent);
END;

CREATE PROCEDURE GetAllDiaryEntries()
BEGIN
    SELECT * FROM DiaryEntries;
END;

CREATE PROCEDURE GetDiaryEntryById(IN entryId INT)
BEGIN
    SELECT * FROM DiaryEntries WHERE id = entryId;
END;

CREATE PROCEDURE UpdateDiaryEntry(IN entryId INT, IN newTitle VARCHAR(255), IN newContent TEXT)
BEGIN
    UPDATE DiaryEntries SET title = newTitle, content = newContent WHERE id = entryId;
END;

CREATE PROCEDURE DeleteDiaryEntry(IN entryId INT)
BEGIN
    DELETE FROM DiaryEntries WHERE id = entryId;
END;
