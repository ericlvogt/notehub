# Guiding Document
The main objectives of this product:
1. Share notes taken for a specific course or purpose
2. Easily find notes shared by others based on the course or purpose of their study
3. Allow users to access notes from anywhere

## Data Schema

The target audience are students looking to share notes for classes
For starters it will be helpful to emulate a successful site
- Similarly to GitHub We will utilize a path like schema to represent data on the site
- Similarly to GitHub note repositories will have the structure user/noteRepository
- A fair name for a repository will be eric/enel-101
- Courses will behave similarly to Twitch categories the courses to note repositories will have a one to many relationship for now so each note repository can only have one related course.
    - It may be helpful in the future to change this to many to many to encourage a second-brain strategy to note taking where relationships can be drawn between topics
- Topics - allow courses (and maybe notes) to be tagged with topics so similar courses can be categorized
- Schools and Classes should only be able to be created by mods? This is to avoid duplication

## Features

Features shall be documented as user stories on GitHub.

Some early ideas are:

### User Base
Users should be able to log into the application to be able to personalize their experience on the platform. For instance users should be able to have liked note topics, notes, be able to own authorship of the notes they write, and personalize their UX.

### Easy Access
Allow users to easily access notes from anywhere and any machine. Users should be able to work offline on notes and merge notes with the stored version once complete.

### Not a Text Editor
This application will not serve as a text editor the main intent is to make it easy to share and look up notes not to serve as an editor. Similar to GitHub it may be convenient to allow users to edit uploaded notes in case there are small corrections to be made. To make this convenient it may be necessary to allow for in application editing.

### Version Control
Ideally notes should be able to be stored under version control to keep history of changes and ease to rollback unwanted modifications.

## Challenges

### Note Formats
A challenge for this application will be what formats will be supported and how will they be stored. Notes are taken across many different available applications and formats from written on paper, Microsoft Word documents, Microsoft OneNote, Google Docs, Notion, LaTeX etc. Additionally many subjects require mathematical notation, drawings, and graphs.

Some possible solutions to handling this include allowing users to upload photographs or scanned copies of written notes.

## Artificial Intelligence Integration
If many notes are uploaded for the same course or study AI could propose a consolidated version of notes with all the most important information for a specific topic or lecture.

## Token Economy
Could utilize tokens to reward users with notes viewed or liked.