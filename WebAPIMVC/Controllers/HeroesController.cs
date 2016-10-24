using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebAPIMVC.Controllers
{
    [RoutePrefix("api/heroes")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class HeroesController : ApiController
    {
        //http://stackoverflow.com/questions/3503102/what-are-top-level-json-arrays-and-why-are-they-a-security-risk
        class HeroesList
        {
            public List<Hero> data { get; set; }
        }
        static List<Hero> heroes = new List<Hero>()
        {
            new Hero {Id=11, Name="Mr. Nice" },
            new Hero {Id=12, Name="Narco" },
            new Hero {Id=13, Name="Bombasto" },
            new Hero {Id=14, Name="Celeritas" },
            new Hero {Id=15, Name="Magneta" },
            new Hero {Id=16, Name="RubberMan" },
            new Hero {Id=17, Name="Dynama" },
            new Hero {Id=18, Name="Dr IQ" },
            new Hero {Id=19, Name="Magma" },
            new Hero {Id=20, Name="Tornado" },
        };
        // GET api/heroes
        [Route("")]
        public IHttpActionResult GetAll()
        {
            var heroesList = new HeroesList();
            heroesList.data = heroes;
            return Ok(heroesList);
        }

        // GET api/heroes/11
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var hero = heroes.Find(x => x.Id == id);
            if (hero == null)
                return NotFound();
            return Ok(hero);
        }

        // POST api/heroes
        [Route("")]
        public IHttpActionResult Post([FromBody]Hero hero)
        {
            var newHero = heroes.Find(x => x.Id == hero.Id);
            if (newHero != null)
                return BadRequest("Already in");
            heroes.Add(hero);
            return Ok();
               
        }

        // PUT api/heroes/11
        [Route("{id:int}")]
        public IHttpActionResult Put(int id, [FromBody]Hero hero)
        {
            var heroId = heroes.FindIndex(x => x.Id == id);
            if (heroId < 0)
                return NotFound();
            heroes[heroId] = hero;
            return Ok(hero);
        }

        // DELETE api/heroes/11
        [Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            var newHero = heroes.Find(x => x.Id == id);
            if (newHero == null)
                return NotFound();
            heroes.Remove(newHero);
            return Ok();
        }
    }
    public class Hero
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }  
}
