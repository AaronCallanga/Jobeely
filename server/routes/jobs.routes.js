import {Router} from 'express';
import JobController from '../controllers/jobs.controllers.js';


const router = new Router();

router.get('/search', JobController.searchJobs)   // will only return the response of Rapid API
router.get('/saved', JobController.getSavedJobs) //see all the bookmarked jobs, maybe allow ai to give advice or give recommendation base on the saved jobs
router.post('/save', JobController.saveJob)   //kind of bookmark job, saved to db
router.get('/:id', JobController.getSavedJobDetail)
router.delete('/:id', JobController.deleteSavedJob)

export default router;

/* https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch
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