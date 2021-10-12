const express = require("express");
const routes = express.Router();

const views = `${__dirname}/views`;

const Profile = {
  data: {
    name: "Luiz Guilherme Bandeira",
    avatar:
      "https://avatars.githubusercontent.com/u/9624274?s=400&u=22c70cd109062582487e70d2eb9eb785ee3ce032&v=4",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4,
    "value-hour": 75,
  },

  controllers:{
    index(req, res){
      return res.render(`${views}/profile`, { profile: Profile.data });
    },

    update(req, res){
      //definir quantas semanas tem no anos
      //remover as semanas de ferias de ano
      //quantas horas por semana estou trabalhando
      //total de horas trabalhada no mês

      //req.body para pegar os dados.
      const data = req.body;
      
      //definir quantas semanas tem um ano: 52
      const weeksPerYear = 52;

      //Remover as semanas de ferias de ano, para pegar quantas semanas tem em 1 mês
      const weeksPerMonth = 52 / 12

    }
  }
};

const Job = {
  data:  [
    {
      id: 1,
      name: "Pizzaria Pizza Boa",
      "daily-hours": 2,
      "total-hours": 1,
      created_at: Date.now(),
    },
    {
      id: 2,
      name: "OneTwo Project",
      "daily-hours": 3,
      "total-hours": 47,
      created_at: Date.now(),
    }
  ],

  contollers:{
    index(req, res){
        const updatedJobs = Job.data.map((job) => {
          const remaining = Job.services.remainingDays(job);
      
          const status = remaining <= 0 ? "done" : "progress";
      
          return {
            ...job,
            remaining,
            status,
            budget: Profile.data["value-hour"] * Job.data["total-hours"],
          };
        });
      
        return res.render(`${views}/index`, { jobs: updatedJobs });
    },

    create(req, res){
      return res.render(`${views}/job`)
    },

    save(req, res){
      const lastId = Job.data[Job.data.length - 1]?.id || 1;

      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now(), //atribuindo data atual.
      });

      return res.redirect("/");
    }
  },

  services: {
    remainingDays(job) {
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
    
      const createdDate = new Date(job.created_at);
      const dueDay = createdDate.getDate() + Number(remainingDays);
      const dueDateInMs = createdDate.setDate(dueDay);
    
      const timeDiffInMs = dueDateInMs - Date.now();
    
      //Transformando milisec em dias
      const dayInMs = 1000 * 60 * 60 * 24;
      const dayDiff = Math.floor(timeDiffInMs / dayInMs);
    
      //restam x dias
      return dayDiff;
    }
  }

}

//rota para abrir o index
routes.get("/", Job.contollers.index);

//rota para abrir o job
routes.get("/job", Job.contollers.create);

//rota para abrir o job-edit
routes.get("/job/edit", (req, res) => {
  return res.render(`{views}/job-edit`);
});

routes.post("/job", Job.contollers.save);

//rota para abrir o profile
routes.get("/profile", Profile.controllers.index);
routes.post("/profile", Profile.controllers.index);

module.exports = routes;
