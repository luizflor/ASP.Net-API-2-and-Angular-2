import { Component, OnInit } from '@angular/core';

import { Hero } from './Hero';
import { HeroService } from './hero.service';

@Component({
    moduleId: module.id,
    selector: 'hero-list',
    templateUrl: 'heroList.component.html',
    styleUrls: ['heroList.component.css'],
    providers: [HeroService]
})
export class HeroListComponent implements OnInit {
    heroes: Hero[] = [];
    selectedHero: Hero;
    errorMessage: string = '';
    isLoading: boolean = true;
    title: string = 'My Heroes Observables';
    heroDetail: Hero;

    constructor(
        private heroService: HeroService) { }

    ngOnInit() {
        this.getAllHeroes();
    }

    getAllHeroes(): void {
        this.heroService
            .getAll()
            .subscribe(
                /* happy path */ p => this.heroes = p,
                /* error path */ e => this.errorMessage = e,
                /* on Complete */() => this.isLoading = false
            );
    }
    onSelect(hero: Hero): void {
        this.heroDetail = null;
        this.selectedHero = hero;
    }

    add(name: string): void {
        this.selectedHero = null;
        name = name.trim();
        if (!name) { return; }
        let hero = this.heroes[this.heroes.length - 1];
        let id = hero.id;
        let newHero = new Hero();

        newHero.id = ++id;
        newHero.name = name;

        this.heroService
            .create(newHero)
            .subscribe(
            /* happy path */hero => {
                this.heroes.push(newHero);
                this.selectedHero = null;
            },
            /* error path */ e => this.errorMessage = e,
            /* on complete */() => this.isLoading = false
            );
    }

    delete(hero: Hero): void {
        this.selectedHero = null;
        this.heroService
            .delete(hero.id)
            .subscribe(
            /* happy path */() => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
            },
            /* error path */ e => this.errorMessage = e,
            /* on complete */() => this.isLoading = false
            );
    }

    gotoDetail(hero: Hero): void {
        this.heroService
            .get(hero.id)
            .subscribe(
            /* happy path */p => {
                this.heroDetail = p
                console.log(p.id + " : " + p.name);
            },
            /*error path */ e => this.errorMessage = e,
            /* on complete */() => this.isLoading = false
            );
    }
    save(): void {
        this.selectedHero = null;
        this.heroService
            .update(this.heroDetail)
            .subscribe(
            /* happy path */p => {
                let h = this.heroes.find(x => x.id === this.heroDetail.id);
                h.name = this.heroDetail.name;
                this.heroDetail = null;
            },
            /* error path */ e => this.errorMessage = e,
            /* on complete */() => this.isLoading = false
            );
    }
}