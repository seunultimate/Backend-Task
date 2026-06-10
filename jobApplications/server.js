express = require("express");
const jobApplication = express();
const PORT = 3300;
jobApplication.use = express.json()

const data = [
    { id: '1', CompanyName: 'Google', Position: 'Software Engineer', Status: 'Applied', 
        DateOfApplication: '2025-05-01' },
    { id: '2', CompanyName: 'Microsoft', Position: 'Data Analyst', Status: 'Interviewing', 
        DateOfApplication: '2025-05-06' },
    { id: '3', CompanyName: 'Amazon', Position: 'Product Manager', Status: 'Rejected', 
        DateOfApplication: '2026-05-01 - 2025-05-30' }
];

jobApplication.post('/applications', (req, res) =>{
    const { CompanyName, Position, Status, DateOfApplication } = req.body;
    if (!CompanyName || !Position || !Status || !DateOfApplication) {
        return res.status(400).json({
             success: false, 
             message: 'All fields are required' });
    }

const newApplication = { id: data.length + 1,
    CompanyName, Position, Status, DateOfApplication }; 
    data.push(newApplication);
    res.status(201).json({  
        success: true, 
        message: 'Application submitted successfully', 
        application: newApplication });
});


// Get all applications
jobApplication.get('/applications', (req, res) =>{
    res.status(200).json({
        success: true, 
        count: data.length,
        applications: data,
        message: 'applications listed'
    })
})

//get application by id
jobApplication.get('/applications/:id', (req, res) => {
    const {id} = req.params;
    const application = data.find(
        (application) => application.id === id);
   
   if (!application) {
    return res.status(404).json({
        success: false,
        message: 'no application found with the id'
    })
   }

    res.status(200).json({
        success: true,
        application,
        message: 'application found'
    });
});

//put application by id
jobApplication.put('/applications/:id', (req, res) => {
    const {id} = req.params;
    const application = data.find(
        (application) => application.id === id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'no application found with the id'
            })
        }

        const { CompanyName, Position, Status, DateOfApplication } = req.body;
        if (CompanyName !== undefined) application.CompanyName = CompanyName;
        if (Position !== undefined) application.Position = Position;
        if (Status !== undefined) application.Status = Status;
        if (DateOfApplication !== undefined) application.DateOfApplication = DateOfApplication;

        return res.status(200).json({
            success: true,
            application,
            message: 'application updated successfully'
        })
})

//delete application by id
jobApplication.delete('/applications/:id', (req, res) => {
    const {id} = req.params;
    const applicationIndex = data.findIndex(
        (application) => application.id === id);

        if (applicationIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'no application found with the id'
            })
        }
        
        const deletedApplication = data[applicationIndex];
        data.splice(applicationIndex, 1);
        return res.status(200).json({
            success: true,
            application: deletedApplication,
            message: 'application deleted successfully'
        })
})


jobApplication.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})