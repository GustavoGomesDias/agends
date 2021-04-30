const Appointment = require("../models/Appointment");
const mongoose = require("mongoose");
const AppointmentFactory = require('../factories/AppointmentFactory');

// Model
const Appo = mongoose.model("Appointment", Appointment);

class AppointmentService {
    async Create(name, email, description, cpf, date, time){


        const newAppo = new Appo({ name, email, description, cpf, date, time, finished: false, notified: false });

        try{
            await newAppo.save();
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async GetAll(showFinished){
        if(showFinished){
            return await Appo.find();
        }else{
            const appos = await Appo.find({ 'finished': false });
            const appointments = [];

            appos.forEach(appointment => {
                if(appointment.date != undefined){
                    appointments.push(AppointmentFactory.Build(appointment));
                }
            });

            return appointments;
        }
    }

    async GetById(id){
        try{
            const event = await Appo.findOne({ '_id': id })
            return event;
        }catch(err){
            console.log(err)
        }
    }

    async Finish(id){
        try{
            await Appo.findByIdAndUpdate(id, { finished: true });
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async Search(query){
        try{

            const appos = await Appo.find().or([{ email: query }, { cpf: query }]);
            return appos;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async SendNotification(){
        const appos =  await this.GetAll(false);

        appos.forEach(appo => {
            // Pega a data no formato de ms
            const date = appo.start.getTime();
            const hour = 1000 * 60 * 60;
            /* Date.now() => Data atual */
            const gap = date - Date.now();

            if(gap <= hour){
                console.log(appo.title);
                console.log("Mande a notificação")
            }
        })
    }
}

module.exports = new AppointmentService();