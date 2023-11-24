const fs = require('fs');
const path = require('path');
const { Application, User, Job } = require("../models");
const sendEmail = require("../utils/email");
const client = require('../utils/redisClient');
// const { Redis } = require('ioredis')
// const client = new Redis()


// exports.getAllJobs = async (req, res) => {
//     try{

//         const jobs = await Job.findAll({
//             include: [
//                 {
//                     model: User, // Ganti dengan nama model yang sesuai untuk User
//                     as: 'recruiter', // Pastikan 'as' sesuai dengan yang didefinisikan di asosiasi model
//                 }
//             ]
//         });

//         res.status(200).json({message: 'Success', data: jobs });
//     }catch(error){
//         res.status(500).json({ message: 'Internal server error: ' + error });
//     }
// }

// exports.getAllJobs = async (req, res) => {
//     try{
//         const caching = await client.get('jobs')
//         if (caching) {
//             res.status(200).json({message: 'Success', data: JSON.parse(caching) });
//         }
//         const jobs = await Job.findAll({
//             include: [
//                 {
//                     model: User, // Ganti dengan nama model yang sesuai untuk User
//                     as: 'recruiter', // Pastikan 'as' sesuai dengan yang didefinisikan di asosiasi model
//                 }
//             ]
//         });
//         await client.set('jobs', JSON.stringify(jobs))
//         res.status(200).json({message: 'Success', data: jobs });
//     }catch(error){
//         res.status(500).json({ message: 'Internal server error: ' + error });
//     }
// }



exports.getAllJobs = async (req, res) => {
    // const redisKey = 'allJobs'; // Key untuk cache

    try {
        const cachedJobs = await client.get(process.env.REDIS_KEY);

        if (cachedJobs) {
            // Jika ada di cache
            return res.status(200).json({ message: 'Data from cache', data: JSON.parse(cachedJobs) });
        } else {
            // Jika tidak ada di cache, query database
            const jobs = await Job.findAll({
                include: [ /* ... */ ]
            });

            // Simpan hasil ke Redis dengan TTL 1 jam
            await client.set(process.env.REDIS_KEY, JSON.stringify(jobs), {
                EX: 3600 // TTL dalam detik
            });

            return res.status(200).json({ message: 'Success', data: jobs });
        }
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return res.status(500).json({ message: 'Internal server error: ' + error });
    }
};




exports.getAllJobsByUserId = async(req, res) => {
    console.log("Fetching all jobs for dashboard");
    try{
        const userId = req.user.id;
        const jobs = await Job.findAll({
            include: [
                {
                    model: User,
                    as: 'recruiter',
                    where: { id: userId } // Gunakan userId dari req.user.id
                }
            ]
        });
        res.status(200).json({message: 'Success', data: jobs });
    }catch(error){
        res.status(500).json({ message: 'Internal server error: ' + error });
    }
}

exports.getDetailJob = async(req, res) => {
    try{
        const {jobId} = req.params;
        // console.log(jobId)
        const job = await Job.findByPk(jobId, {
            include: [
                { model: User, as: 'recruiter' },
            ]
        });
        if (!job) {
            return res.status(404).send('Job not found');
        }

        res.status(200).json({message: 'Success', data: job });
    }catch(error){
        res.status(500).json({ message: 'Internal server error: ' + error });
    }
}

exports.applyForJob = async (req, res) => {
    try {
        const {jobId} = req.params;
        const userId = req.user.id; 
        console.log(userId)

        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: 'Mohon sertakan file CV dalam permintaan Anda.' });
        }
        const cvUrl = req.file.path; 
        // console.log(cvUrl)

        const existingApplication = await Application.findOne({
            where: {
                userId: userId,
                jobId: jobId
            }
        });

        if (existingApplication) {
            return res.status(400).json({ message: 'Anda sudah melamar pekerjaan ini sebelumnya.' });
        }

        // Membuat record aplikasi lamaran baru di database
        const newApplication = await Application.create({
            userId,
            jobId,
            cvUrl
        });

        // Mengambil data tambahan untuk email
        const user = await User.findByPk(userId);
        const job = await Job.findByPk(jobId);

        const companyName = job.company ? job.Company : 'Nama Perusahaan';

        await sendEmail(
            user.email, 
            'Konfirmasi Lamaran Pekerjaan', 
            'application-confirmation', 
            { 
                name: user.name, // Nama pengguna
                jobTitle: job.title, // Judul pekerjaan
                companyName: companyName // Nama perusahaan
            }
        );

        res.status(201).json({ message: 'Lamaran berhasil dikirim', application: newApplication });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.checkUserApplication = async (req, res) => {
    try {
        const userId = req.user.id; // Ambil user ID dari JWT token
        const jobId = req.params.jobId; // Ambil job ID dari parameter URL

        // Cek apakah ada aplikasi dari user untuk job tertentu
        const application = await Application.findOne({
            where: { userId: userId, jobId: jobId }
        });

        const hasApplied = !!application; 
        res.status(200).json({ hasApplied });
    } catch (error) {
        console.error('Error checking application:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteApplication = async (req, res) => {
    try{
        const { applicationId } = req.params;
        const userId = req.user.id;


        // Cari aplikasi lamaran berdasarkan ID dan userID
        const application = await Application.findOne({
            where: {
                id: applicationId,
                userId: userId // Opsional, untuk memastikan hanya pengguna yang membuat yang bisa menghapus
            }
        });

        if (!application) {
            return res.status(404).json({ message: 'Aplikasi lamaran tidak ditemukan.' });
        }

         const cvPath = path.join(__dirname, '..', application.cvUrl);
         fs.unlink(cvPath, (err) => {
             if (err) {
                 console.error('Error menghapus file CV:', err);
             }
         });
 


        await application.destroy();

        res.status(200).json({ message: 'Aplikasi lamaran berhasil dihapus.' });
    }catch(error){
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}