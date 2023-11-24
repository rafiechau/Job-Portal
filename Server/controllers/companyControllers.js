const {  Job } = require("../models");
const { jobSchema } = require("../helper/validateAtributes");
const client = require('../utils/redisClient');

exports.postJob = async (req, res) => {
    try{
        const { error } = jobSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { Company,  Judul, Deskripsi, Lokasi, TipePekerjaan, Gaji, TanggalPosting, TanggalPenutupan, Kategori } = req.body;
        const recruiterId = req.user.id; 
        console.log(Company)
        const newJob = await Job.create({
            Company,
            Judul,
            Deskripsi,
            Lokasi,
            TipePekerjaan,
            Gaji,
            TanggalPosting,
            TanggalPenutupan,
            Kategori,
            EmployerID: recruiterId
        });

        // console.log(newJob)
        const cacheExists = await client.exists(process.env.REDIS_KEY);
        if (cacheExists) {
            await client.del(process.env.REDIS_KEY);
            console.log('Cache cleared successfully');
        }


        res.status(201).json({ message: 'Lowongan pekerjaan berhasil dibuat', data: newJob });
    }catch(error){
        res.status(500).json({ message: 'Internal server error: ' + error });
    }
}

exports.updateJob = async (req, res) => {
    try{
        const jobId = req.params.id
        const { error } = jobSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { Company, Judul, Deskripsi, Lokasi, TipePekerjaan, Gaji,  Kategori } = req.body;
        const recruiterId = req.user.id; 


        const jobToUpdate = await Job.findByPk(jobId);

        
        if (jobToUpdate.EmployerID !== recruiterId) {
            return res.status(403).json({ message: 'Anda tidak memiliki izin untuk mengedit pekerjaan ini' });
        }
        if (!jobToUpdate) {
            return res.status(404).json({ message: 'Lowongan pekerjaan tidak ditemukan' });
        }

        await jobToUpdate.update({
            Company,
            Judul,
            Deskripsi,
            Lokasi,
            TipePekerjaan,
            Gaji,
            Kategori,
        });

        const cacheExists = await client.exists(process.env.REDIS_KEY);
        if (cacheExists) {
            await client.del(process.env.REDIS_KEY);
            console.log('Cache cleared successfully');
        }

        res.status(200).json({ message: 'Lowongan pekerjaan berhasil diperbarui', data: jobToUpdate });
    }catch(error){
        res.status(500).json({ message: 'Internal server error: ' + error });
    }
}

exports.deleteJob = async (req, res) => {
    try{
        const jobId = req.params.id;
        const jobToDelete = await Job.findByPk(jobId);

        if (!jobToDelete) {
            return res.status(404).json({ message: 'Lowongan pekerjaan tidak ditemukan' });
        }

        if (jobToDelete.EmployerID !== req.user.id) {
            return res.status(403).json({ message: 'Anda tidak memiliki izin untuk menghapus pekerjaan ini' });
        }

        await jobToDelete.destroy();

        const cacheExists = await client.exists(process.env.REDIS_KEY);
        if (cacheExists) {
            await client.del(process.env.REDIS_KEY);
            console.log('Cache cleared successfully');
        }

        res.status(200).json({ message: 'Lowongan pekerjaan berhasil dihapus' });
    }catch(error){
        res.status(500).json({ message: 'Internal server error: ' + error });
    }
}