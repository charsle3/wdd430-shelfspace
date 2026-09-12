# Feature Specification: ShelfSpace Reading Tracker

**Project Title**: ShelfSpace  
**Description**: ShelfSpace is a personal reading tracker that helps readers organize books they want to read, are currently reading, or have completed. Users manage their personal library, update reading progress, and leave ratings or reviews for completed books.  
**Purpose**: Provide a simple, private place to maintain an accurate record of reading activity and reflect on finished books.  
**Target Audience**: Individuals who want lightweight personal reading organization without the complexity of a social reading network.  
**Feature Branch**: `001-reading-tracker`  
**Created**: 2026-09-12  
**Status**: Draft

## User Scenarios & Testing

### User Story 1 - Sign Up (Priority: P1)

A new reader creates an account so their personal library and reading activity are available only to them.

**Why this priority**: Account ownership is required before private reading data can be stored safely.

**Independent Test**: Submit valid account details and verify an authenticated empty library; submit duplicate or invalid details and verify rejection.

**Acceptance Scenarios**:

1. **Given** no account exists for an email, **When** the reader submits a valid email and password, **Then** an account is created and the reader is signed in with an empty library.
2. **Given** an account already exists, **When** the reader submits the same email, **Then** no duplicate account is created and a clear error is shown.
3. **Given** required details are missing or invalid, **When** the form is submitted, **Then** the account is not created and invalid fields are identified.

### User Story 2 - Create a Library Entry (Priority: P1)

An authenticated reader adds a book and assigns an initial status.

**Why this priority**: Adding books is the core action that enables all later progress and review workflows.

**Independent Test**: Add a valid book with each supported initial status and verify it appears in the authenticated reader's library.

**Acceptance Scenarios**:

1. **Given** an authenticated reader, **When** they submit a title, author, and valid status, **Then** the book appears in the selected status group.
2. **Given** the book already exists in the reader's library, **When** they add it again, **Then** an unintended duplicate is prevented and the conflict is explained.
3. **Given** required book details are missing, **When** the form is submitted, **Then** no entry is created and missing details are identified.

### User Story 3 - Read the Personal Library (Priority: P1)

An authenticated reader views their books, statuses, progress, ratings, and reviews.

**Why this priority**: The library view is the primary way readers understand their reading activity.

**Independent Test**: Seed books in each status and verify only the signed-in reader's books appear, including an empty state when none exist.

**Acceptance Scenarios**:

1. **Given** books in multiple statuses, **When** the reader opens the library, **Then** all books are visible and grouped or filterable by status.
2. **Given** no books, **When** the reader opens the library, **Then** an empty state explains how to add a book.
3. **Given** another reader owns a book, **When** the reader requests their library, **Then** that book is excluded.

### User Story 4 - Update Reading Progress (Priority: P1)

An authenticated reader updates a book's status and progress as they read.

**Why this priority**: Current progress is the main ongoing value of the tracker.

**Independent Test**: Update a book from want-to-read to currently-reading and then completed, verifying validation and saved state.

**Acceptance Scenarios**:

1. **Given** an owned book, **When** the reader submits progress from 0 through 100, **Then** the saved percentage is displayed.
2. **Given** progress reaches 100 percent, **When** the update is saved, **Then** the book can be marked completed and becomes review-eligible.
3. **Given** progress is below 0 or above 100, **When** submitted, **Then** the update is rejected and existing progress remains unchanged.

### User Story 5 - Rate and Review a Completed Book (Priority: P2)

An authenticated reader records a 1-5 rating and optional written review for a completed book.

**Why this priority**: Reflection is useful after reading but depends on library and progress workflows.

**Independent Test**: Complete a book, save a valid rating and review, retrieve it, and verify unfinished books are rejected.

**Acceptance Scenarios**:

1. **Given** an owned completed book, **When** valid rating and optional review text are submitted, **Then** both are saved and displayed.
2. **Given** an unfinished book, **When** a rating or review is submitted, **Then** the request is rejected with an explanation.
3. **Given** existing reflection content, **When** new content is submitted, **Then** the previous content is replaced.

### User Story 6 - Delete a Library Entry (Priority: P2)

An authenticated reader removes a book they no longer want to track.

**Why this priority**: Readers need control over outdated or mistaken entries, but deletion is less frequent than tracking.

**Independent Test**: Delete an owned book and verify it disappears; attempt to delete another reader's book and verify it remains untouched.

**Acceptance Scenarios**:

1. **Given** an owned book, **When** deletion is confirmed, **Then** the book, progress, and reflection are removed from that library.
2. **Given** deletion has not been confirmed, **When** the reader cancels, **Then** the book remains unchanged.
3. **Given** a missing or another reader's book identifier, **When** deletion is requested, **Then** no other data is affected and a suitable error is returned.

### Edge Cases

- Expired or missing sessions reject protected requests and ask the reader to sign in again.
- Whitespace-only account, book, or review fields are rejected with field-specific feedback.
- Ratings outside 1-5 and progress outside 0-100 are rejected without changing stored data.
- Missing entries return not-found behavior without exposing another reader's data.
- Repeated create requests do not create duplicate library entries.

## Requirements

### Functional Requirements

- **FR-001**: The system MUST allow a reader to create an account with a unique, valid email and password.
- **FR-002**: The system MUST prevent unauthenticated access to personal library data.
- **FR-003**: The system MUST allow an authenticated reader to create a library entry with title, author, and status.
- **FR-004**: The system MUST support want-to-read, currently-reading, and completed statuses.
- **FR-005**: The system MUST allow a reader to retrieve their complete library and an individual entry.
- **FR-006**: The system MUST allow a reader to update an owned entry's book details, status, and progress.
- **FR-007**: The system MUST validate progress as a whole-number percentage from 0 through 100.
- **FR-008**: The system MUST allow ratings from 1 through 5 and optional review text only for completed owned books.
- **FR-009**: The system MUST allow a reader to delete an owned entry after explicit confirmation.
- **FR-010**: The system MUST enforce ownership for every create, read, update, and delete operation.
- **FR-011**: The system MUST return consistent success and error information for validation, authentication, authorization, not-found, and duplicate-entry failures.

### API Endpoints

Protected endpoints require an authenticated session and operate only on the signed-in reader's data.

| Method | Endpoint | Priority | Purpose |
|--------|----------|----------|---------|
| POST | `/api/auth/signup` | P1 | Create an account and start a session. |
| GET | `/api/books` | P1 | List the reader's library, optionally filtered by status. |
| POST | `/api/books` | P1 | Add a book to the reader's library. |
| GET | `/api/books/:id` | P1 | Retrieve one owned entry with progress and review. |
| PATCH | `/api/books/:id` | P1 | Update owned book details, status, or progress. |
| DELETE | `/api/books/:id` | P2 | Delete an owned entry after confirmation. |
| PUT | `/api/books/:id/review` | P2 | Create or replace a completed-book rating and review. |

Successful create and update operations MUST return the resulting resource. Invalid input MUST return field-level feedback; authentication failures, authorization failures, and missing resources MUST not disclose private data.

### Key Entities

- **Reader**: A ShelfSpace account owner identified by a unique email and protected credential.
- **Book**: A work tracked in a reader's library, including title, author, status, and progress.
- **Library Entry**: The reader-specific relationship between a Reader and a Book, including ownership and tracking state.
- **Review**: An optional reflection for a completed entry, containing a 1-5 rating and optional text.

## Success Criteria

### Measurable Outcomes

- **SC-001**: At least 90% of first-time readers complete account creation and view their empty library in under 2 minutes during usability testing.
- **SC-002**: At least 95% of valid library create, read, update, and delete actions succeed on the first attempt in acceptance testing.
- **SC-003**: At least 95% of library list requests return current books within 2 seconds under the expected pilot workload.
- **SC-004**: 100% of authorization tests prevent a reader from viewing or modifying another reader's entry.
- **SC-005**: At least 90% of readers identify all three reading statuses without assistance.
- **SC-006**: 100% of invalid review ratings and unfinished-book reviews are rejected without changing stored data.

## Assumptions

- Email and password sign-up is the initial account flow; social sign-in is outside scope.
- A reader has one library entry per book and may replace its rating or review.
- Book metadata is entered by the reader; external catalog search is outside scope.
- The initial release has one private library per account and excludes sharing, follows, and public reviews.
- Implementation proceeds P1 account and library tracking first, followed by P2 reviews and deletion hardening.
