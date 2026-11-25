# Managing course content (no rebuild required)

All course content lives in the database. Changes are visible to students on the next page load — no redeploy.

| What | Table | Notes |
|---|---|---|
| Modules (title, weeks, summary, outcomes) | `modules` | |
| Lessons & workshops (title, duration, week, order, preview, published) | `lessons` | `content_status`: `in_preparation` (outline, cannot be completed), `sample`, `ready` |
| Written lesson, exercise, assignment, video | `lesson_content` | `body` JSON: intro, objectives, sections, examples, demonstration, mistakes, reflection · `exercise` JSON: title, instructions, prompt, min_chars · `assignment` JSON: title, brief, min_words, required |
| Video | `lesson_content.video_url`, `captions_url` (WebVTT), `lessons.video_status` | Set `video_status = 'published'` only for real instructor recordings |
| Quiz questions and answer keys | `quiz_questions` | Students never see `correct_index`; pass mark 70% |
| Downloadable materials | `lesson_resources` | `is_sample = true` shows a "Sample" label |

**Who can edit:** accounts with the `content_editor`, `academic_director` or `academy_owner` role (enforced by Row Level Security). Until the admin interface (Stage 7), edit in Supabase → Table Editor.

**Publishing a real instructor video:** upload the MP4 and the `.vtt` captions file (e.g. to Supabase Storage or a video host), put the URLs in `lesson_content`, then set `lessons.video_status = 'published'`. Sample files in `public/media/sample` and `public/materials/sample` must be replaced before launch.

**Bulk authoring from code:** edit `src/content/lessons.ts`, run `npm run content:generate`, apply the regenerated `supabase/migrations/20261125000003_curriculum_content.sql`. Note that this overwrites database edits for the affected lessons.

**Enrolment** (until Stripe in Stage 7): a `student_support` or `academy_owner` account inserts a row into `enrollments`:
```sql
insert into public.enrollments (user_id, cohort)
select id, 'Cohort 1' from auth.users where email = 'student@example.com';
```
