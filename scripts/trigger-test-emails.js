// Native fetch is available in Node 18+


const BASE_URL = 'http://localhost:3000';

async function triggerContact() {
    console.log('--- Triggering Contact Form ---');
    try {
        const res = await fetch(`${BASE_URL}/api/public/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test Trigger User',
                email: 'test.trigger@example.com',
                phone: '9800000000',
                subject: 'Automated Test Message',
                message: 'This is an automated test message to verify email sending.'
            })
        });
        const data = await res.json();
        console.log('Status:', res.status);
        console.log('Response:', data);
    } catch (error) {
        console.error('Error triggering contact:', error);
    }
}

async function triggerQuote() {
    console.log('\n--- Triggering Quote Request ---');
    try {
        const res = await fetch(`${BASE_URL}/api/quotes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test Quote Client',
                email: 'test.quote@example.com',
                phone: '9811111111',
                company: 'Triggered Test Co',
                websiteUrl: 'https://test-triggered.com',
                seoGoals: 'Verify email functionality'
            })
        });
        const data = await res.json();
        console.log('Status:', res.status);
        console.log('Response:', data);
    } catch (error) {
        console.error('Error triggering quote:', error);
    }
}

async function triggerApplication() {
    console.log('\n--- Triggering Job Application ---');
    try {
        // 1. Fetch a job to apply to
        const jobsRes = await fetch(`${BASE_URL}/api/jobs`);
        const jobsData = await jobsRes.json();

        if (!jobsData.jobs || jobsData.jobs.length === 0) {
            console.log('No jobs found to apply to. Skipping application test.');
            return;
        }

        const jobId = jobsData.jobs[0]._id;
        const jobTitle = jobsData.jobs[0].title;
        console.log(`Applying to job ID: ${jobId} (${jobTitle})`);

        // 2. Submit application
        const res = await fetch(`${BASE_URL}/api/applications`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fullName: 'Test Candidate',
                email: 'test.candidate@example.com',
                phone: '9822222222',
                address: 'Test City',
                workExperience: '2-5 years',
                expectedSalary: '50000',
                portfolioLink: 'https://test-portfolio.com',
                githubLink: 'https://github.com/test',
                job: jobId,
                jobTitle: jobTitle, // Required by model
                cvUrl: '/uploads/dummy-cv.pdf',
                coverLetter: 'I am applying via the test trigger script.'
            })
        });
        const data = await res.json();
        console.log('Status:', res.status);
        console.log('Response:', data);

    } catch (error) {
        console.error('Error triggering application:', error);
    }
}

async function run() {
    await triggerContact();
    await triggerQuote();
    await triggerApplication();
}

run();
