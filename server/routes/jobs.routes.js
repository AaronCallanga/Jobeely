import {Router} from 'express';

const router = new Router();

router.get('/search', (req, res) => {res.json({message: `Search Jobs`})})   // will only return the response of Rapid API
router.get('/saved', (req, res) => {res.json({message: `Saved Jobs`})}) //see all the bookmarked jobs
router.post('/save', (req, res) => {res.json({message: `Save Job`})})   //kind of bookmark job, saved to db
router.delete('/:id', (req, res) => {res.json({message: `Delete a saved Job by id ${req.params.id}`})})

export default router;

/*
function simplifyJobData(rawJob) {
    return {
        job_id: rawJob.job_id,
        title: rawJob.job_title,
        company: rawJob.employer_name,
        company_logo: rawJob.employer_logo,
        location: rawJob.job_location,
        employment_type: rawJob.job_employment_type,
        description: rawJob.job_description,
        apply_link: rawJob.job_apply_link,
        posted_at: rawJob.job_posted_at_datetime_utc,
        is_remote: rawJob.job_is_remote,
        qualifications: rawJob.job_highlights?.Qualifications || [],
        responsibilities: rawJob.job_highlights?.Responsibilities || [],
        job_google_link: rawJob.job_google_link,
        apply_sources: rawJob.apply_options?.map(opt => ({
            publisher: opt.publisher,
            apply_link: opt.apply_link,
            is_direct: opt.is_direct
        })) || []
    };
}

Use it
const simplifiedJobs = response.data.map(simplifyJobData);
res.json(simplifiedJobs);
*/